require('dotenv').config();
const express = require("express")
const Meeting = require("../models/meetings.model")
const User = require("../models/users.model")
const router = express.Router()
const authMiddleware = require('./authMiddleware');
const jwt = require("jsonwebtoken")
var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.app_Email,
    pass: process.env.app_Password
  },
  tls: {
    rejectUnauthorized: false
  }
});

function generateRandomString(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
  
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charactersLength);
      result += characters.charAt(randomIndex);
    }
  
    return result;
  }

const MakeNormalDate = (utcTimestamp) => {
    const date = new Date(utcTimestamp);
    const localDateString = date.toLocaleString();
    return localDateString
}


router.post("/meeting/create", authMiddleware("user") , async (req, res) => {
    const { scheduledDate, roomCode} = req.body
    if (!scheduledDate)
        return res.json({ status: "error", message: "Required field is empty" })
    try {
        const token = req.headers['x-access-token']
        const decodedToken = jwt.verify(token, "ajadfjk242");
        const userID = decodedToken.userID;

        const already = await Meeting.find({ user: userID})
        if(already.length > 0)
            return res.json({ error: "input_exists", message: "You have a pending request" })

        const counselor = await User.find({ role: 'counselor' })
        const randomIndex = Math.floor(Math.random() * counselor.length);
        const randomCounselor = counselor[randomIndex];
        await Meeting.create({ 
            scheduledDate: req.body.scheduledDate,
            counselor: randomCounselor,
            user: userID,
            roomCode: req.body.roomCode,
            
        })
        const userDetails = await User.findOne({ _id: userID }).select("firstName lastName")
        const counselorDetails = await User.findOne({ _id: randomCounselor }).select("firstName lastName")
        const userEmail = await User.findById(randomCounselor);
        const requestEmail = await User.findById(userID);
        let mailOptions = {
            from: process.env.app_Email,
            to: userEmail.email,
            subject:`Meeting Set for ${MakeNormalDate(scheduledDate)}`,
            html: `<p>Dear ${userEmail.firstName},</p>
                
                 <p>A new meeting request has been created for you. Please visit the website to accept or reject the request. The meeting has been requested to be conducted on ${MakeNormalDate(scheduledDate)}</p>
                 
                 <ul>
                   <li>Date: ${MakeNormalDate(scheduledDate)}</li>
                   <li>Requested: ${requestEmail.firstName + " " + requestEmail.lastName}</li>
                   <li>Link: <a href="http://localhost:3000/meeting">http://localhost:3000/meeting</a></li>
                 </ul>
                 
                 <p>Regards,<br/>Paramarsha</p>`,
        };
        transporter.sendMail(mailOptions)
        return res.json({ 
            status: "success", 
            message: "The meeting has been set", 
            userFirstName: userDetails.firstName, 
            userLastName: userDetails.lastName,
            counselorFirstName: counselorDetails.firstName,
            counselorLastName: counselorDetails.lastName,
        })
    } catch (err) {
        return res.json({ status: "error", message: "There is an error" })

    }
})

router.post("/getmeetings", async (req, res) => {
    const token = req.headers['x-access-token']
    const decodedToken = jwt.verify(token, "ajadfjk242");
    const userID = decodedToken.userID;
    const userDetails = await User.findOne({ _id: userID }).select("firstName lastName role")
    let meetingDetails = []
    if(userDetails.role === "counselor"){
        meetingDetails = await Meeting.find({ counselor: userID }).populate("user", "firstName lastName role")
    }
    else if (userDetails.role === "user"){
        meetingDetails = await Meeting.find({ user: userID }).populate("user", "firstName lastName role").populate("counselor", "firstName lastName role")
    }

    // return reviews and averages
    return res.json({ status: "success", message: "data_returned", data: meetingDetails, user: userDetails});
})

router.delete("/meeting/delete/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const meetingCurrent = await Meeting.findById(id).populate("user", "firstName lastName role email").populate("counselor", "firstName lastName role email")
        let mailOptions = {
            from: process.env.app_Email,
            to: [meetingCurrent.user.email, meetingCurrent.counselor.email],
            subject:`Meeting Set for ${MakeNormalDate(meetingCurrent.scheduledDate)}`,
            html: `<p>Dear User/Counselor,</p>
                
                 <p>The meeting requested at ${MakeNormalDate(meetingCurrent.scheduledDate)} has been cancelled. Please visit the website to view more details</p>
                 
                 <ul>
                   <li>Date: ${MakeNormalDate(meetingCurrent.scheduledDate)}</li>
                   <li>Link: <a href="http://localhost:3000/meeting">http://localhost:3000/meeting</a></li>
                   <li>Requested By: ${meetingCurrent.user.firstName + " " + meetingCurrent.user.lastName}</li>
                   <li>Counselor: ${meetingCurrent.counselor.firstName + " " + meetingCurrent.counselor.lastName}</li>
                 </ul>
                 
                 <p>Regards,<br/>Paramarsha</p>`,
        };
        transporter.sendMail(mailOptions)
        const college = await Meeting.findByIdAndDelete(id)
        return res.json({ status: "success", message: "The meeting has been cancelled" })
        
    } catch (err) {
        return res.json({ status: "error", message: "There is an error" })
    }
})

router.get("/acceptmeeting/:id", async (req, res) => {
    const id = req.params.id;
    try{
        const token = req.headers['x-access-token']
        const decodedToken = jwt.verify(token, "ajadfjk242");
        const userID = decodedToken.userID;
        const dMeeting = await Meeting.findById(id)

        if(dMeeting.counselor != userID) return res.json({ status: "error", message: "Validation Error" })
        
        await Meeting.findByIdAndUpdate(id, {roomCode: generateRandomString(6)})
        const meetingCurrent = await Meeting.findById(id).populate("user", "firstName lastName role email").populate("counselor", "firstName lastName role email")
        let mailOptions = {
            from: process.env.app_Email,
            to: [meetingCurrent.user.email],
            subject:`Meeting Set for ${MakeNormalDate(meetingCurrent.scheduledDate)}`,
            html: `<p>Dear User,</p>
                
                 <p>The meeting requested at ${MakeNormalDate(meetingCurrent.scheduledDate)} has been accepted by the counselor. Please visit the website to view more details</p>
                 
                 <ul>
                   <li>Date: ${MakeNormalDate(meetingCurrent.scheduledDate)}</li>
                   <li>Link: <a href="http://localhost:3000/meeting">http://localhost:3000/meeting</a></li>
                   <li>Requested By: ${meetingCurrent.user.firstName + " " + meetingCurrent.user.lastName}</li>
                   <li>Counselor: ${meetingCurrent.counselor.firstName + " " + meetingCurrent.counselor.lastName}</li>
                 </ul>
                 
                 <p>Regards,<br/>Paramarsha</p>`,
        };
        transporter.sendMail(mailOptions)
        // return reviews and averages
        return res.json({ status: "success", message: "The meeting has been accepted"});
    } catch (err) {
        return res.json({ status: "error", message: "There is an error" })
    }
    
})

router.get("/meetingdetails/:id", async (req, res) => {
    const id = req.params.id;
    // try {
        const token = req.headers['x-access-token']
        const decodedToken = jwt.verify(token, "ajadfjk242");
        const userID = decodedToken.userID;
        const meetingCurrent = await Meeting.findById(id).populate("user", "firstName lastName role email").populate("counselor", "firstName lastName role email")
        const currentUser = await User.findById(userID);
        return res.json({ status: "status", data: meetingCurrent, user: currentUser })
    // } catch (err) {
    //     return res.json({ status: "error", message: "There is an error" })
    // }
})

module.exports = router
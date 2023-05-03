const express = require("express")
const Meeting = require("../models/meetings.model")
const User = require("../models/users.model")
const router = express.Router()
const authMiddleware = require('./authMiddleware');
const jwt = require("jsonwebtoken")


router.post("/meeting/create", authMiddleware("user") , async (req, res) => {
    const { scheduledDate, roomCode} = req.body
    if (!scheduledDate || !roomCode)
        return res.json({ error: "input_empty", message: "Required field is empty" })
    try {
        const token = req.headers['x-access-token']
        const decodedToken = jwt.verify(token, "ajadfjk242");
        const userID = decodedToken.userID;

        const already = await Meeting.find({ user: userID})
        if(already.length > 0)
            return res.json({ error: "input_exists", message: "The user has already reviewed" })

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
        return res.json({ 
            status: "success", 
            message: "data_added", 
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
        meetingDetails = await Meeting.findOne({ user: userID }).populate("user", "firstName lastName role")
    }
    console.log(meetingDetails)

    // return reviews and averages
    return res.json({ status: "success", message: "data_returned", data: meetingDetails, user: userDetails});
})

module.exports = router
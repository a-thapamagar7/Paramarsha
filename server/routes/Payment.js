const express = require("express")
const router = express.Router()
const authMiddleware = require('./authMiddleware');
const jwt = require("jsonwebtoken")
const mongoose = require("mongoose")
const request = require('request');
const Payment = require("../models/payments.model")
const User = require("../models/users.model")


router.post("/epay", authMiddleware("user"), async (req, res) => {
    // try {
    const token = req.headers['x-access-token']
    const decodedToken = jwt.verify(token, "ajadfjk242");
    const userID = decodedToken.userID;
    const newID = mongoose.Types.ObjectId();
    const user = await User.findById(userID);
    const alreadyPaid = await Payment.findOne({
      user: userID
    })
    if(alreadyPaid){
      return res.json({ status: "error", message: "user_paid"})
    }
    const data = {
        return_url: "http://localhost:3000/epay",
        website_url: "http://localhost:3000/",
        amount: 20000,
        purchase_order_id: newID,
        purchase_order_name: "premium",
        customer_info: {
          name: user.firstName,
          email: user.email
        }
      };
      const headers = {
        Authorization: "Key d6dd52c5bd0842c99e38a9475bd243e4",
        "Access-Control-Allow-Origin": "http://localhost:3000/",
        "Access-Control-Allow-Origin": "http://localhost:1447/",
      };
      request.post(
        {
          url: "https://a.khalti.com/api/v2/epayment/initiate/",
          json: data,
          headers: headers,
        },
        (error, response, body) => {
          if (error) {
            return res.json({status: "error", message: "request_failed"});
          } else {
            console.log(body)
            return res.json({status: "success", message: "request_successful", data: body});
          }
        }
      );
    });

router.post("/transaction", authMiddleware("user"), async (req, res) => {
  try{
    data = req.body.params
    const token = req.headers['x-access-token']
    const decodedToken = jwt.verify(token, "ajadfjk242");
    const userID = decodedToken.userID;
    const alreadyPaid1 = await Payment.findOne({
      pidx: data.pidx
    })
    const alreadyPaid2 = await Payment.findOne({
      user: userID
    })
    if(alreadyPaid1 || alreadyPaid2){
      return res.json({ status: "error", message: "This transaction or user already exists"})
    }
    await Payment.create({ 
      user: userID,
      transactionId: data.purchase_order_id,
      pidx: data.pidx,   
    })
    await User.findByIdAndUpdate(userID, {isPaidMember: true})
    return res.json({ status: "success", message: "premium_updated"})
    
  }
  catch {
    return res.json({ status: "error", message: "There is an error" })
  }

});


module.exports = router
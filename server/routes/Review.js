const express = require("express")
const Review = require("../models/reviews.model")
const User = require("../models/users.model")
const router = express.Router()
const authMiddleware = require('./authMiddleware');
const jwt = require("jsonwebtoken")


router.post("/review/create", authMiddleware("user") , async (req, res) => {
    const { facilities, education, overallRating, college } = req.body
    if (!facilities || !education || !overallRating|| !college)
        return res.json({ error: "input_empty", message: "Required field is empty" })

    try {
        const token = req.headers['x-access-token']
        const decodedToken = jwt.verify(token, "ajadfjk242");
        const userID = decodedToken.userID;
        await Review.create({ 
            facilities: req.body.facilities,
            education: req.body.education,
            overallRating: req.body.overallRating,
            college: req.body.college,
            user: userID,
            comment: req.body.comment
            
        })
        return res.json({ status: "success", message: "data_added"})
    } catch (err) {
        return res.json({ status: "error", message: "There is an error" })

    }
})

router.get("/getcolleges/:collegeID", async (req, res) => {

    const collegeID = req.params.collegeID;

    Review.find({ college: collegeID })
    .populate('college', 'name')
    .populate('user', 'firstName lastName')
    .exec((err, reviews) => {
        if (err) {
            return res.json({ status: "error", message: 'Error getting reviews.' });
        }

        // calculate average of ratings
        const numReviews = reviews.length;
        const facilitiesAvg = Math.trunc(reviews.reduce((acc, cur) => acc + cur.facilities, 0) / numReviews) ;
        const educationAvg = Math.trunc(reviews.reduce((acc, cur) => acc + cur.education, 0) / numReviews);
        const overallRatingAvg = Math.trunc(reviews.reduce((acc, cur) => acc + cur.overallRating, 0) / numReviews);

        // return reviews and averages
        return res.json({ status: "success", message: "data_returned", data: reviews, allReviews: { facilitiesAvg, educationAvg, overallRatingAvg}});
    });
})

module.exports = router
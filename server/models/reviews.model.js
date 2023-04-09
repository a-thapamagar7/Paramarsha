const mongoose = require("mongoose");
const College = require("../models/colleges.model")
const User = require("../models/users.model")

const Reviews = new mongoose.Schema({
  facilities: { type: Number, required: true },
  education: { type: Number, required: true },
  overallRating: { type: Number, required: true },
  college: { type: mongoose.Schema.Types.ObjectId, ref: College, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: User, required: true },
  comment: { type: String }
}, {collection: "review-data"});

const Review = mongoose.model("ReviewData", Reviews);

module.exports = Review;
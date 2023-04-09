const mongoose = require("mongoose")

const Colleges = new mongoose.Schema({
    name: { type: String, required: true },
    location: { type: String, required: true },
    website: { type: String, required: true },
    university: { type: String, required: true },
    description: { type: String, required: true },
    approximateFee: {
        type: Number,
        required: true,
        min: 1
      },
    courses: { type: [String], required: true },
    subjects: { type: [String], required: true },
    logoURL: {type: String},
    imgURL: {type: String}
}, {collection: "college-data"})

const collegeModel = mongoose.model("CollegeData", Colleges)

module.exports = collegeModel
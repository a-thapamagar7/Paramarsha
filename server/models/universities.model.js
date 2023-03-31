const mongoose = require("mongoose")

const Universities = new mongoose.Schema({
    name: { type: String, required: true },
    location: { type: String, required: true },
    website: { type: String, required: true },
    description: { type: String, required: true },
    average_fee: { type: String, required: true },
    colleges: { type: [String], required: true },
    courses: { type: [String], required: true },
    subjects: { type: [String], required: true },
}, {collection: "college-data"})

const universityModel = mongoose.model("CollegeData", Universities)

module.exports = universityModel
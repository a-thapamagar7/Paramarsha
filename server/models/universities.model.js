const mongoose = require("mongoose")

const Universities = new mongoose.Schema({
    name: { type: String, required: true },
    location: { type: String, required: true },
    website: { type: String, required: true },
    description: { type: String, required: true },
    colleges: { type: [String] },
    courses: { type: [String], required: true },
    subjects: { type: [String], required: true },
    logoURL: {type: String},
    imgURL: {type: String}
}, {collection: "university-data"})

const universityModel = mongoose.model("UniversityData", Universities)

module.exports = universityModel
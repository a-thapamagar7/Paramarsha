const mongoose = require("mongoose")

const Courses = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    subjects: { type: [String], required: true },
}, {collection: "course-data"})

const courseModel = mongoose.model("CourseData", Courses)

module.exports = courseModel
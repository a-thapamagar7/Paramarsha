const mongoose = require("mongoose")

const Subjects = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
}, {collection: "subject-data"})

const subjectModel = mongoose.model("SubjectData", Subjects)

module.exports = subjectModel
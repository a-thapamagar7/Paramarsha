const mongoose = require("mongoose")

const Questions = new mongoose.Schema({
    question: { type: String, required: true },
    subject: { type: String, required: true },
    answer: { type: String, required: true },
    options: { type: [String], required: true },
}, {collection: "question-data"})

const questionModel = mongoose.model("QuestionData", Questions)

module.exports = questionModel
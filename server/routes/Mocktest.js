const express = require("express")
const Question = require("../models/questions.model")
const router = express.Router()

const checkNull = (arr) => {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === "") return true
    }
}

router.post("/createquestion", async (req, res) => {
    let type = req.body.type
    if (type == "one") {
        const { type, question, subject, answer, option } = req.body
        //checking if the email and password is
        if (!question || !subject || !answer || checkNull(option))
            return res.json({ error: "input_empty", msg: "Required field is empty" })

        try {
            await Question.create({
                question: req.body.question,
                subject: req.body.subject,
                answer: req.body.answer,
                option: req.body.option,
            })
            return res.json({ status: "success", message: "data_added" })
        } catch (err) {
            console.log("error")
            return res.json({ status: "error", message: "There is an error" })

        }
    }
    else if (type == "multi") {

        const { type, multiQuestionArray } = req.body
        // try {
        for (let i = 0; i < multiQuestionArray.length; i++) {
            await Question.create({
                question: multiQuestionArray[i].question,
                subject: multiQuestionArray[i].subject,
                answer: multiQuestionArray[i].answer,
                option: multiQuestionArray[i].options,
            })
        }

        return res.json({ status: "success", message: "data_added" })
        // } catch (err) {
        //     console.log("error")
        //     return res.json({ status: "error", message: "There is an error" })

        // }
    }
})

router.post("/getquestions", async (req, res) => {
    let requesting = req.body.requesting
    if (requesting == "subject") {
        //checking if the email and password is
        if (!requesting)
            return res.json({ error: "input_empty", msg: "Required field is empty" })

        try {
            const subject = await Question.distinct("subject")
            return res.json({ status: "success", message: "data_added", data: subject })
        } catch (err) {
            console.log("error")
            return res.json({ status: "error", message: "There is an error" })

        }
    }

})

module.exports = router
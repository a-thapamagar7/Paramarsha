const express = require("express")
const Question = require("../models/questions.model")
const router = express.Router()

const checkNull = (arr) => {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === "") return true
    }
}

router.post("/createquestion/one", async (req, res) => {
    const { question, subject, answer, options } = req.body
    //checking if the email and password is
    if (!question || !subject || !answer || checkNull(options))
        return res.json({ error: "input_empty", msg: "Required field is empty" })

    try {
        await Question.create({
            question: req.body.question,
            subject: req.body.subject,
            answer: req.body.answer,
            options: req.body.options,
        })
        return res.json({ status: "success", message: "data_added" })
    } catch (err) {
        return res.json({ status: "error", message: "There is an error" })

    }
})


router.post("/createquestion/many", async (req, res) => {
    const { multiArray } = req.body
    console.log(multiArray)
    try {
    for (let i = 0; i < multiArray.length; i++) {
        await Question.create({
            question: multiArray[i].question,
            subject: multiArray[i].subject,
            answer: multiArray[i].answer,
            options: multiArray[i].options,
        })
    }

        return res.json({ status: "success", message: "data_added" })
    }
    catch (err) {
        return res.json({ status: "error", message: "There is an error" })

    }
})

router.get("/getquestions", async (req, res) => {
    try {
        const subject = await Question.distinct("subject")
        return res.json({ status: "success", message: "data_added", data: subject })
    } catch (err) {
        return res.json({ status: "error", message: "There is an error" })

    }

})


router.post("/getquestions", async (req, res) => {
    const { selectedSubject, questionNos } = req.body
    if (!selectedSubject || questionNos == 0)
        return res.json({ error: "input_empty", msg: "Required field is empty" })
    try {
        const count = await Question.countDocuments({ myField: selectedSubject });
        if (count < questionNos) var totalQuestion = count
        else var totalQuestion = +questionNos

        const condition = { subject: selectedSubject };
        const pipeline = [
            { $match: condition },
            { $sample: { size: totalQuestion } }
        ];

        // execute the aggregation pipeline on the MyModel collection
        const cursor = Question.aggregate(pipeline);
        const questions = await cursor.exec();
        return res.json({ status: "success", message: "data_added", data: questions })
    }
    catch {
        return res.json({ status: "error", message: "There is an error" })
    }




})

module.exports = router
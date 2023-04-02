const express = require("express")
const Course = require("../models/courses.model")
const router = express.Router()


router.post("/course/create", async (req, res) => {
    const { name, description, subjects } = req.body
    if (!name || !description || subjects.length === 0)
        return res.json({ error: "input_empty", msg: "Required field is empty" })
    try {
        await Course.create({ name: req.body.name, description: req.body.description, subjects: req.body.subjects})
        const answer = await Course.find({})
        return res.json({ status: "success", message: "data_added", data: answer})
    } catch (err) {
        return res.json({ status: "error", message: "There is an error" })

    }
})

router.get("/getcourses", async (req, res) => {
    try {
        const course = await Course.distinct("name")
        return res.json({ status: "success", message: "data_added", data: course })
    } catch (err) {
        return res.json({ status: "error", message: "There is an error" })
    }

})

router.get("/getrequiredcourse/:id", async (req, res) => {
    const id = req.params.id;
    console.log(id)
    try {
        const course = await Course.findById(id)
        return res.json({ status: "success", message: "data_found", data: course })
    } catch (err) {
        return res.json({ status: "error", message: "There is an error" })
    }

})

router.get("/getcourseinfo", async (req, res) => {
    try {
        const course = await Course.find({})
        return res.json({ status: "success", message: "data_added", data: course })
    } catch (err) {
        return res.json({ status: "error", message: "There is an error" })

    }
})

router.delete("/course/delete/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const course = await Course.findByIdAndDelete(id)
        return res.json({ status: "success", message: "data_deleted" })
    } catch (err) {
        return res.json({ status: "error", message: "There is an error" })
    }
})

router.patch("/course/update/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const course = await Course.findByIdAndUpdate(id, req.body)
        return res.json({ status: "success", message: "data_updated" })
    } catch (err) {
        return res.json({ status: "error", message: "There is an error" })
    }
})


module.exports = router
const express = require("express")
const University = require("../models/universities.model")
const router = express.Router()


router.post("/university/create", async (req, res) => {
    const { name, location, website, courses, subjects, colleges, description } = req.body
    console.log(name, location, website, courses, subjects, colleges, description )
    if (!name || !description || !location|| !website || subjects.length === 0 || courses.length === 0)
        return res.json({ error: "input_empty", msg: "Required field is empty" })
    try {
        await University.create({ name: req.body.name, description: req.body.description, location: req.body.location, website: req.body.website, subjects: req.body.subjects, colleges: req.body.colleges, courses: req.body.courses})
        const answer = await University.find({})
        return res.json({ status: "success", message: "data_added", data: answer})
    } catch (err) {
        return res.json({ status: "error", message: "There is an error" })

    }
})

router.get("/getuniversities", async (req, res) => {
    try {
        const university = await University.distinct("name")
        return res.json({ status: "success", message: "data_added", data: university })
    } catch (err) {
        return res.json({ status: "error", message: "There is an error" })
    }

})

router.get("/getrequiredcourse/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const university = await University.findById(id)
        return res.json({ status: "success", message: "data_found", data: university })
    } catch (err) {
        return res.json({ status: "error", message: "There is an error" })
    }

})

router.get("/getcourseinfo", async (req, res) => {
    try {
        const university = await University.find({})
        return res.json({ status: "success", message: "data_added", data: university })
    } catch (err) {
        return res.json({ status: "error", message: "There is an error" })

    }
})

router.delete("/university/delete/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const university = await University.findByIdAndDelete(id)
        return res.json({ status: "success", message: "data_deleted" })
    } catch (err) {
        return res.json({ status: "error", message: "There is an error" })
    }
})

router.patch("/university/update/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const university = await University.findByIdAndUpdate(id, req.body)
        return res.json({ status: "success", message: "data_updated" })
    } catch (err) {
        return res.json({ status: "error", message: "There is an error" })
    }
})


module.exports = router
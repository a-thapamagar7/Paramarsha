const express = require("express")
const College = require("../models/colleges.model")
const University = require("../models/universities.model")
const Subject = require("../models/subjects.model")
const Course = require("../models/courses.model")
const router = express.Router()


router.get("/info/:name", async (req, res) => {

    const id = req.params.name;
    try {
        const college = await College.findOne({ name: { $regex: new RegExp(id, "i") } })
        if (college) return res.json({ status: "success", message: "data_found", data: college, dataType: "college" })
        const university = await University.findOne({ name: { $regex: new RegExp(id, "i") } })
        if (university) return res.json({ status: "success", message: "data_found", data: university, dataType: "university" })
        const course = await Course.findOne({ name: { $regex: new RegExp(id, "i") } })
        if (course) return res.json({ status: "success", message: "data_found", data: course, dataType: "course" })
        const subject = await Subject.findOne({ name: { $regex: new RegExp(id, "i") } })
        if (subject) return res.json({ status: "success", message: "data_found", data: subject, dataType: "subject" })
    } catch (err) {
        return res.json({ status: "error", message: "There is an error" })
    }

})



module.exports = router
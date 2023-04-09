const express = require("express")
const College = require("../models/colleges.model")
const router = express.Router()


router.post("/college/create", async (req, res) => {
    const { name, location, website, courses, subjects, university, description, approximateFee } = req.body
    if (!name || !description || !location|| !website || subjects.length === 0 || !university || courses.length === 0 || approximateFee < 0)
        return res.json({ error: "input_empty", msg: "Required field is empty" })
    try {
        await College.create({ 
            name: req.body.name, 
            description: req.body.description, 
            location: req.body.location, 
            website: req.body.website, 
            approximateFee: req.body.approximateFee, 
            subjects: req.body.subjects, 
            university: req.body.university, 
            courses: req.body.courses,
            imgURL: req.body.imgURL,
            logoURL: req.body.logoURL,
            
        })
        const answer = await College.find({})
        return res.json({ status: "success", message: "data_added", data: answer})
    } catch (err) {
        return res.json({ status: "error", message: "There is an error" })

    }
})

router.get("/getcolleges", async (req, res) => {
    try {
        const college = await College.distinct("name")
        return res.json({ status: "success", message: "data_added", data: college })
    } catch (err) {
        return res.json({ status: "error", message: "There is an error" })
    }

})

router.get("/getrequiredcollege/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const college = await College.findById(id)
        return res.json({ status: "success", message: "data_found", data: college })
    } catch (err) {
        return res.json({ status: "error", message: "There is an error" })
    }

})

router.get("/getcollegeinfo", async (req, res) => {
    try {
        const college = await College.find({})
        return res.json({ status: "success", message: "data_added", data: college })
    } catch (err) {
        return res.json({ status: "error", message: "There is an error" })

    }
})

router.delete("/college/delete/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const college = await College.findByIdAndDelete(id)
        return res.json({ status: "success", message: "data_deleted" })
    } catch (err) {
        return res.json({ status: "error", message: "There is an error" })
    }
})

router.patch("/college/update/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const college = await College.findByIdAndUpdate(id, req.body)
        return res.json({ status: "success", message: "data_updated" })
    } catch (err) {
        return res.json({ status: "error", message: "There is an error" })
    }
})


module.exports = router
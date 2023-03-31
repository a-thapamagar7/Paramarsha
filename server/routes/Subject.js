const express = require("express")
const Subject = require("../models/subjects.model")
const router = express.Router()


router.post("/subject/create", async (req, res) => {
    const { name, description } = req.body
    if (!name || !description)
        return res.json({ error: "input_empty", msg: "Required field is empty" })

    try {
        await Subject.create({ name: req.body.name, description: req.body.description})
        const answer = await Subject.find({})
        return res.json({ status: "success", message: "data_added", data: answer})
    } catch (err) {
        return res.json({ status: "error", message: "There is an error" })

    }
})

router.get("/getsubjects", async (req, res) => {
    try {
        const subject = await Subject.distinct("name")
        return res.json({ status: "success", message: "data_added", data: subject })
    } catch (err) {
        return res.json({ status: "error", message: "There is an error" })
    }

})

router.get("/getsubjectinfo", async (req, res) => {
    try {
        const subject = await Subject.find({})
        return res.json({ status: "success", message: "data_added", data: subject })
    } catch (err) {
        return res.json({ status: "error", message: "There is an error" })

    }
})

router.delete("/subject/delete/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const subject = await Subject.findByIdAndDelete(id)
        return res.json({ status: "success", message: "data_deleted" })
    } catch (err) {
        return res.json({ status: "error", message: "There is an error" })
    }
})

router.patch("/subject/update/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const subject = await Subject.findByIdAndUpdate(id, req.body)
        return res.json({ status: "success", message: "data_updated" })
    } catch (err) {
        return res.json({ status: "error", message: "There is an error" })
    }
})


module.exports = router
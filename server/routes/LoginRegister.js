const express = require("express")
const User = require("../models/users.model")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const router = express.Router()

router.post("/register", async (req, res) => {
    const { fName, lName, email, password } = req.body
    //checking if the email and password is
    if (!fName || !lName || !email || !password)
        return res.status(400).json({ msg: "Email and Password are required" })

    if (password < 8)
        return res.status(400).json({ msg: "Password must be atleast 8 characters long" })
    const newPassword = await bcrypt.hash(req.body.password, 10)
    try {
        await User.create({
            firstName: req.body.fName,
            lastName: req.body.lName,
            email: req.body.email,
            password: newPassword,
        })
        return res.json({ status: "success", message: "data_added" })
    } catch (err) {
        return res.json({ status: "error", error: "Duplicate email" })
    }
})

router.post("/login", async (req, res) => {
    const { email, password } = req.body
    //checking if the email and password is
    if (!email || !password)
        return res.json({ status: "error", error: "Email and Password are required" })
    const user = await User.findOne({
        email: req.body.email
    })
    if (!user) res.json({ status: "error", error: "User not found" })

    const isPasswordValid = await bcrypt.compare(req.body.password, user.password)
    if (isPasswordValid) {
        const token = jwt.sign({
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
        }, "secret123")
        return res.json({ status: "ok", user: token })
    } else {
        return res.json({ status: "error", user: false })
    }
})

router.get('/quote', async (req, res) => {
    const token = req.headers['x-access-token']

    try {
        const decoded = jwt.verify(token, 'secret123')
        const email = decoded.email
        const user = await User.findOne({ email: email })

        return res.json({ status: 'ok', quote: user.quote })
    } catch (error) {
        res.json({ status: 'error', error: 'invalid token' })
    }
})

router.post('/quote', async (req, res) => {
    const token = req.headers['x-access-token']

    try {
        const decoded = jwt.verify(token, 'secret123')
        const email = decoded.email
        await User.updateOne(
            { email: email },
            { $set: { quote: req.body.quote } }
        )

        return res.json({ status: 'ok' })
    } catch (error) {
        res.json({ status: 'error', error: 'invalid token' })
    }
})

router.post("/createmock", async (req, res) => {
    const { subject, question, answer, option } = req.body
    //checking if the email and password is
    if (!subject || !question || !answer || !option )
        return res.json({ status: "error", error: "All the fields are required" })
    const user = await User.findOne({
        email: req.body.email
    })
    if (!user) res.json({ status: "error", error: "User not found" })

    const isPasswordValid = await bcrypt.compare(req.body.password, user.password)
    if (isPasswordValid) {
        const token = jwt.sign({
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
        }, "secret123")
        return res.json({ status: "ok", user: token })
    } else {
        return res.json({ status: "error", user: false })
    }
})

module.exports = router
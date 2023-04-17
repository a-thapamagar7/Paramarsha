const express = require("express")
const User = require("../models/users.model")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const router = express.Router()

router.post("/register", async (req, res) => {
    const { fName, lName, email, password } = req.body
    //checking if the email and password is
    if (!fName || !lName || !email || !password)
        return res.json({ status: "error", message: "Email and Password are required" })
    
    const user = await User.findOne({
        email: req.body.email
    })

    if (user) return res.json({ status: "error", message: "User already exists" })
    
    if (password.length < 8)
        return res.json({ status: "error", message: "Password must be atleast 8 characters long" })

   
    const newPassword = await bcrypt.hash(req.body.password, 10)
    try {
        await User.create({
            firstName: req.body.fName,
            lastName: req.body.lName,
            email: req.body.email,
            password: newPassword,
            role: "user",
            isPaidMember: false
        })
        return res.json({ status: "success", message: "data_added" })
    } catch (err) {
        return res.json({ status: "error", message: "Duplicate email" })
    }
})

router.post("/login", async (req, res) => {
    const { email, password } = req.body
    //checking if the email and password is
    if (!email || !password)
        return res.json({ status: "error", message: "Email and Password are required" })
    const user = await User.findOne({
        email: req.body.email
    })
    if (!user) res.json({ status: "error", message: "User not found" })

    const isPasswordValid = await bcrypt.compare(req.body.password, user.password)
    if (isPasswordValid) {
        const token = jwt.sign({
            userID: user._id,
        }, "ajadfjk242")
        return res.json({ status: "success", user: token })
    } else {
        return res.json({ status: "error", user: false })
    }
})

router.get('/quote', async (req, res) => {
    const token = req.headers['x-access-token']

    try {
        const decoded = jwt.verify(token, 'ajadfjk242')
        const email = decoded.email
        const user = await User.findOne({ email: email })

        return res.json({ status: 'ok', quote: user.quote })
    } catch (error) {
        res.json({ status: 'error', message: 'invalid token' })
    }
})

router.post('/quote', async (req, res) => {
    const token = req.headers['x-access-token']

    try {
        const decoded = jwt.verify(token, 'ajadfjk242')
        const email = decoded.email
        await User.updateOne(
            { email: email },
            { $set: { quote: req.body.quote } }
        )

        return res.json({ status: 'ok' })
    } catch (error) {
        res.json({ status: 'error', message: 'invalid token' })
    }
})

router.post('/quote', async (req, res) => {
    const token = req.headers['x-access-token']

    try {
        const decoded = jwt.verify(token, 'ajadfjk242')
        const email = decoded.email
        await User.updateOne(
            { email: email },
            { $set: { quote: req.body.quote } }
        )

        return res.json({ status: 'ok' })
    } catch (error) {
        res.json({ status: 'error', message: 'invalid token' })
    }
})



router.get("/getuserinfo", async (req, res) => {
    try {
        const user = await User.find({})
        return res.json({ status: "success", message: "data_added", data: user })
    } catch (err) {
        return res.json({ status: "error", message: "There is an error" })

    }
})


router.patch("/user/update/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const user = await User.findByIdAndUpdate(id, req.body)
        return res.json({ status: "success", message: "data_updated" })
    } catch (err) {
        return res.json({ status: "error", message: "There is an error" })
    }
})

router.delete("/user/delete/:id", async (req, res) => {
    const id = req.params.id;
    try {
        await User.findByIdAndDelete(id)
        return res.json({ status: "success", message: "data_deleted" })
    } catch (err) {
        return res.json({ status: "error", message: "There is an error" })
    }
})

router.post("/user/create", async (req, res) => {
    const { firstName, lastName, email, password, role, isPaidMember} = req.body
    //checking if the email and password is
    if (!firstName || !lastName || !email || !password || !role)
        return res.json({ status: "error", message: "Email and Password are required" })
    
    const user = await User.findOne({
        email: req.body.email
    })

    if (user) return res.json({ status: "error", message: "User already exists" })
    
    if (password.length < 8)
        return res.json({ status: "error", message: "Password must be atleast 8 characters long" })

   
    const newPassword = await bcrypt.hash(req.body.password, 10)
    try {
        await User.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: newPassword,
            role: req.body.role,
            isPaidMember: req.body.isPaidMember
        })
        const answer = await User.find({})
        return res.json({ status: "success", message: "data_added", data: answer})
    } catch (err) {
        return res.json({ status: "error", message: "There was an error" })
    }
})



module.exports = router
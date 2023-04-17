const express = require("express")
const College = require("../models/colleges.model")
const University = require("../models/universities.model")
const Subject = require("../models/subjects.model")
const Course = require("../models/courses.model")
const Review = require("../models/reviews.model")
const User = require("../models/users.model")
const Payment = require("../models/payments.model")
const Question = require("../models/questions.model")
const router = express.Router()


router.get("/info/:name", async (req, res) => {

    const id = req.params.name;
    try {
        const college = await College.findOne({ name: { $regex: new RegExp(`^${id}$`, "i") } })
        if (college) return res.json({ status: "success", message: "data_found", data: college, dataType: "college" })
        const university = await University.findOne({ name: { $regex: new RegExp(`^${id}$`, "i") } })
        if (university) return res.json({ status: "success", message: "data_found", data: university, dataType: "university" })
        const course = await Course.findOne({ name: { $regex: new RegExp(`^${id}$`, "i") } })
        if (course) return res.json({ status: "success", message: "data_found", data: course, dataType: "course" })
        const subject = await Subject.findOne({ name: { $regex: new RegExp(`^${id}$`, "i") } })
        if (subject) return res.json({ status: "success", message: "data_found", data: subject, dataType: "subject" })
    } catch (err) {
        return res.json({ status: "error", message: "There is an error" })
    }

})

router.get("/search/:name", async (req, res) => {
    const id = req.params.name;
    try {
        let content = []
        const college = await College.find({ name: { $regex: new RegExp(`^${id}`, "i") } })
        if (college) content = [...content, ...college]
        const university = await University.find({ name: { $regex: new RegExp(`^${id}`, "i") } })
        if (university) content = [...content, ...university]
        const course = await Course.find({ name: { $regex: new RegExp(`^${id}`, "i") } })
        if (course) content = [...content, ...course]
        const subject = await Subject.find({ name: { $regex: new RegExp(`^${id}`, "i") } })
        if (subject) content = [...content, ...subject]
        if (content) return res.json({ status: "success", message: "data_found", data: content })
    } catch (err) {
        return res.json({ status: "error", message: "There is an error" })
    }

})

router.get("/getnumbers", async (req, res) => {
    try {
        const usersCount = await User.countDocuments({})
        const courseCount = await Course.countDocuments({})
        const collegeCount = await College.countDocuments({})
        const universityCount = await University.countDocuments({})
        const subjectCount = await Subject.countDocuments({})
        const reviewCount = await Review.countDocuments({})
        const paymentCount = await Payment.countDocuments({})
        const questionCount = await Question.countDocuments({})
        const answer = {
            Users: usersCount,
            Universities: universityCount,
            Colleges: collegeCount,
            Courses: courseCount,
            Reviews: reviewCount,
            Subjects: subjectCount,
            Payments: paymentCount,
            Questions: questionCount
        }
        return res.json({ status: "success", message: "data_found", data: answer })
    } catch (err) {
        return res.json({ status: "error", message: "There is an error" })
    }

})


router.get("/getquizsubjects", async (req, res) => {
    try {
          const distinctSubjectsArray = await College.distinct('subjects');
        return res.json({ status: "success", message: "data_found", data: distinctSubjectsArray })
    } catch (err) {
        return res.json({ status: "error", message: "There is an error" })
    }

})

router.get("/getquizsubjects", async (req, res) => {
    try {
          const distinctSubjectsArray = await College.distinct('subjects');
        return res.json({ status: "success", message: "data_found", data: distinctSubjectsArray })
    } catch (err) {
        return res.json({ status: "error", message: "There is an error" })
    }

})

router.get("/getquizcourses/:name", async (req, res) => {
    
    const name = req.params.name;
    try {
        const colleges = await College.find({ subjects: { $in: name } })
        if(colleges.length == 1)
        {
            return res.json({ status: "success", message: "data_found", college: colleges, only: true })
        }
        const courses = await College.find({ subjects: { $in: name } }).distinct("courses")
        return res.json({ status: "success", message: "data_found", data: courses, colleges, college: colleges, only: false })
    } catch (err) {
        return res.json({ status: "error", message: "There is an error" })
    }

})







module.exports = router
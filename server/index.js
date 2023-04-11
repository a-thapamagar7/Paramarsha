require('dotenv').config();
const express = require("express")
const app = express()
const cors = require("cors")
const mongoose = require("mongoose")
const loginRegister = require("./routes/LoginRegister")
const createQuestion = require("./routes/Mocktest")
const subject = require("./routes/Subject")
const course = require("./routes/Course")
const university = require("./routes/University")
const college = require("./routes/College")
const review = require("./routes/Review")
const others = require("./routes/Others")
const payment = require("./routes/Payment")

//allows communication between ports
app.use(cors())
//convert body to json
app.use(express.json())

mongoose.connect(process.env.mongo_URI, {
    useNewUrlParser: true,
})

//for the login and register api
app.use("/api", loginRegister)

// for the mock test
app.use("/api", createQuestion)

// for the subject
app.use("/api", subject)

// for the course
app.use("/api", course)

// for the university
app.use("/api", university)

// for the college
app.use("/api", college)

// for others
app.use("/api", others)

// for review
app.use("/api", review)

// for review
app.use("/api", payment)


app.listen(1447, () => {
    console.log('Server started on 1447')
})
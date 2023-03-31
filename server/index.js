require('dotenv').config();
const express = require("express")
const app = express()
const cors = require("cors")
const mongoose = require("mongoose")
const loginRegister = require("./routes/LoginRegister")
const createQuestion = require("./routes/Mocktest")
const subject = require("./routes/Subject")

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


app.listen(1447, () => {
    console.log('Server started on 1447')
})
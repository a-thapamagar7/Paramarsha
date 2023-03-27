require('dotenv').config();
const express = require("express")
const app = express()
const cors = require("cors")
const mongoose = require("mongoose")
const loginRegister = require("./routes/LoginRegister")
const createQuestion = require("./routes/Mocktest")

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


app.listen(1447, () => {
    console.log('Server started on 1447')
})
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

mongoose.connect("mongodb+srv://ayush:ayush@cluster0.kkcnx41.mongodb.net/test", {
    useNewUrlParser: true,
})

//for the login and register api
app.use("/api", loginRegister)

// for the mock test
app.use("/api", createQuestion)


app.listen(1447, () => {
    console.log('Server started on 1447')
})
const express = require("express")
const router = express.Router()
const {Server} = require("socket.io")

const io = new Server(8000)




module.exports = router
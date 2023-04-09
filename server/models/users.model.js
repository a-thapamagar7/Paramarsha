const mongoose = require("mongoose")

const User = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['admin', 'counselor', 'user'], required: true },
    isPaidMember: { type: Boolean, default: false },
}, { collection: "user-data" })

const userModel = mongoose.model("UserData", User)

module.exports = userModel
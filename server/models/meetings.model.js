const mongoose = require("mongoose")
const User = require("../models/users.model")

const Meetings = new mongoose.Schema({
    scheduledDate: { type: Date, required: true },
    counselor: { type: mongoose.Schema.Types.ObjectId, ref: User},
    user: { type: mongoose.Schema.Types.ObjectId, ref: User},
    roomCode: { type: String, required: true },
}, {collection: "meeting-data"})

const meetingModel = mongoose.model("MeetingData", Meetings)

module.exports = meetingModel
const mongoose = require('mongoose');
const User = require("../models/users.model")

const Payments = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: User, required: true },
  paymentMethod: {type: String, default: 'khalti', required: true},
  transactionId: {type: String,required: true},
  pidix: {type: String, required: true},
  payment_url: {type: String, required: true},
  amount: { type: Number, required: true },
  paymentDate: { type: Date, required: true },
  // other fields related to payment data
}, { timestamps: true }, {collection: "payment-data"});

const paymentModel = mongoose.model("PaymentData", Payments)

module.exports = paymentModel
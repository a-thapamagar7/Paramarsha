const express = require("express");
const User = require("../models/users.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const router = express.Router();

router.post("/register", async (req, res) => {
  const { fName, lName, email, password } = req.body;
  //checking if the email and password is
  if (!fName || !lName || !email || !password)
    return res.json({
      status: "error",
      message: "All the required fields must be filled.",
    });

  const user = await User.findOne({
    email: req.body.email,
  });

  if (user)
    return res.json({ status: "error", message: "User already exists" });

  if (password.length < 8)
    return res.json({
      status: "error",
      message: "Password must be atleast 8 characters long",
    });

  const newPassword = await bcrypt.hash(req.body.password, 10);
  try {
    await User.create({
      firstName: req.body.fName,
      lastName: req.body.lName,
      email: req.body.email,
      password: newPassword,
      role: "user",
      isPaidMember: false,
    });

    return res.json({
      status: "success",
      message: "The user has been logged in",
    });
  } catch (err) {
    return res.json({ status: "error", message: "Duplicate email" });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  //checking if the email and password is
  if (!email || !password)
    return res.json({
      status: "error",
      message: "Email and Password are required",
    });
  const user = await User.findOne({
    email: req.body.email,
  });
  if (!user) return res.json({ status: "error", message: "User not found" });

  const isPasswordValid = await bcrypt.compare(
    req.body.password,
    user.password
  );
  if (isPasswordValid) {
    const token = jwt.sign(
      {
        userID: user._id,
      },
      process.env.jwt_secret_key
    );
    return res.json({ status: "success", user: token, role: user.role });
  } else {
    return res.json({
      status: "error",
      user: false,
      message: "The password is incorrect.",
    });
  }
});

router.get("/getuserinfo", async (req, res) => {
  try {
    const user = await User.find({});
    return res.json({ status: "success", message: "data_added", data: user });
  } catch (err) {
    return res.json({ status: "error", message: "There is an error" });
  }
});

router.get("/user/details", async (req, res) => {
  const token = req.headers["x-access-token"];

  if (!token) {
    return res
      .status(401)
      .json({ status: "error", message: "No token provided" });
  }

  try {
    // Verify and decode the token
    const decoded = jwt.verify(token, process.env.jwt_secret_key);
    const userId = decoded.userID; // Adjust according to your token payload

    // Fetch user details from the database
    const user = await User.findById(userId);

    if (!user) {
      return res
        .status(404)
        .json({ status: "error", message: "User not found" });
    }

    return res.json({
      status: "success",
      message: "User data retrieved",
      data: user,
    });
  } catch (err) {
    return res
      .status(500)
      .json({ status: "error", message: "Failed to authenticate token" });
  }
});

router.patch("/user/update/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findByIdAndUpdate(id, req.body);
    return res.json({
      status: "success",
      message: "The user has been updated",
    });
  } catch (err) {
    return res.json({ status: "error", message: "There is an error" });
  }
});

router.delete("/user/delete/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await User.findByIdAndDelete(id);
    return res.json({
      status: "success",
      message: "The user has been deleted",
    });
  } catch (err) {
    return res.json({ status: "error", message: "There is an error" });
  }
});

router.get("/user/getdetails", async (req, res) => {
  try {
    const token = req.headers["x-access-token"];
    const decodedToken = jwt.verify(token, process.env.jwt_secret_key);
    const userID = decodedToken.userID;
    const currentUser = await User.findById(userID).select(
      "firstName lastName role isPaidMember"
    );
    return res.json({
      status: "success",
      message: "The user has been found",
      data: currentUser,
    });
  } catch (err) {
    return res.json({ status: "error", message: "There is an error" });
  }
});

router.post("/user/create", async (req, res) => {
  const { firstName, lastName, email, password, role, isPaidMember } = req.body;
  //checking if the email and password is
  if (!firstName || !lastName || !email || !password || !role)
    return res.json({
      status: "error",
      message: "Email and Password are required",
    });

  const user = await User.findOne({
    email: req.body.email,
  });

  if (user)
    return res.json({ status: "error", message: "User already exists" });

  if (password.length < 8)
    return res.json({
      status: "error",
      message: "Password must be atleast 8 characters long",
    });

  const newPassword = await bcrypt.hash(req.body.password, 10);
  try {
    await User.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: newPassword,
      role: req.body.role,
      isPaidMember: req.body.isPaidMember,
    });
    const answer = await User.find({});
    return res.json({
      status: "success",
      message: "The user has been created",
      data: answer,
    });
  } catch (err) {
    return res.json({ status: "error", message: "There was an error" });
  }
});

module.exports = router;

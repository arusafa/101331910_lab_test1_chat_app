const express = require("express");
const router = express.Router();
const User = require("../models/user_models");

router.get("/getAll", async (req, res) => {
  const users = await User.find();
  res.send(users);
});

// Sign up
router.post("/signup", async (req, res) => {
  const { username, firstname, lastname, password, creaton } = req.body;

  const user = new User({ username, password, firstname, lastname, creaton });
  try {
    await user.save();
    res.send("Account created successfully");
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

// Login
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }
  if (user.password !== password) {
    return res.status(400).json({ message: "Incorrect password" });
  }
  res.json({ message: "Login successful" });
});

// Get user by id
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete user by id
router.delete("/:id", async (req, res) => {
  try {
    const removedUser = await User.deleteOne({ _id: req.params.id });
    res.json(removedUser);
  } catch (err) {
    res.json({ message: err });
  }
});

// Update user by id
router.put("/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate({ _id: req.params.id }, req.body);
    if (req.body.firstname != null) {
      user.firstname = req.body.firstname;
    }
    if (req.body.lastname != null) {
      user.lastname = req.body.lastname;
    }
    if (req.body.username != null) {
      user.username = req.body.username;
    }
    if (req.body.password != null) {
      user.password = req.body.password;
    }
    const updatedUser = await user.save();
    res.json(updatedUser);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;

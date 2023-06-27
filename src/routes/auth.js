const { Router } = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = Router();
const userAuth = require("../auth/auth");
const User = require("../models/User");
const Todo = require("../models/Todo");
const { AppDataSource } = require("../models");

const userRepository = AppDataSource.getRepository(User);

router.post("/register", async (req, res) => {
  const { username, fullName, password } = req.body;

  const existingUser = await userRepository.findOne({
    where: {
      username,
    },
  });

  if (existingUser) {
    return res.status(400).json({ message: "Username already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = userRepository.create({
    username,
    fullName,
    password: hashedPassword,
  });
  await userRepository.save(user);

  jwt.sign({ id: user.id }, "SECRET_KEY", (err, token) => {
    if (err) {
      return res.status(500).json({ message: "Failed to sign token" });
    }

    res.status(201).json({ message: "User registered successfully", token });
  });
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await userRepository.findOne({
    where: {
      username,
    },
  });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(401).json({ message: "Invalid password" });
  }

  jwt.sign({ id: user.id }, "SECRET_KEY", (err, token) => {
    if (err) {
      return res.status(500).json({ message: "Failed to sign token" });
    }
    res.json({ message: "Login successful", token });
  });
});

router.get("/user", userAuth, async (req, res) => {
  const user = await userRepository.findOne({
    where: {
      id: req.user.id,
    },
  });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  res.json(user);
});
module.exports = router;

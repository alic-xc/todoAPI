const { Router } = require("express");
const router = Router();

const userAuth = require("../auth/auth");

const User = require("../models/User");
const Todo = require("../models/Todo");
const { AppDataSource } = require("../models");

const todoRepository = AppDataSource.getRepository(Todo);

router.get("/user", userAuth, async (req, res) => {
  const todos = await todoRepository.find({
    where: {
      userId: req.user.id,
    },
  });

  res.json(todos);
});

router.post("/", userAuth, async (req, res) => {
  const { title, description } = req.body;
  const userId = req.user.id;

  const todo = todoRepository.create({ title, description, userId });
  await todoRepository.save(todo);

  res.status(201).json({ message: "Todo created successfully" });
});

router.patch("/:id", userAuth, async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;

  const todo = await todoRepository.findOne({
    where: {
      id,
    },
  });

  if (!todo) {
    return res.status(404).json({ message: "Todo not found" });
  }

  if (req.user.id !== todo.userId) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  todo.title = title;
  todo.description = description;

  await todoRepository.save(todo);

  res.json({ message: "Todo updated successfully" });
});

router.delete("/:id", userAuth, async (req, res) => {
  const { id } = req.params;

  const todo = await todoRepository.findOne({
    where: {
      id,
    },
  });

  if (!todo) {
    return res.status(404).json({ message: "Todo not found" });
  }

  if (req.user.id !== todo.userId) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  await todoRepository.remove(todo);

  res.json({ message: "Todo deleted successfully" });
});

module.exports = router;

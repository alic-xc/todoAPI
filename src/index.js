const express = require("express");
const { AppDataSource } = require("./models");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const todoRoutes = require("./routes/todos");

const app = express();

// Connect to the database

AppDataSource.initialize().then(async () => {
  app.use(express.json());
  app.use(
    cors({
      origin: "*",
    })
  );
  app.use("/auth", authRoutes);
  app.use("/todos", todoRoutes);

  app.listen(3000, () => {
    console.log("Server running on port 3000");
  });
});

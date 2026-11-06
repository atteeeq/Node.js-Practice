import express from "express";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { todoModel, userModel } from "./utils/db.js";

dotenv.config();

const authMiddleware = (req, res, next) => {
  const token = req.header["token"];

  const payload = jwt.verify(token, process.env.JWT_SECRET);

  if (!payload) {
    res.jon({
      msg: "invalid token / signin first to get data..",
    });
  }

  req.userId = payload.userId;

  next();
};

mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => {
    console.log("database connected successfully....");
  })
  .catch((err) => {
    console.log("error while connecting db......", err);
  });

const app = express();

app.use(express.json());

app.post("/signin", async (req, res) => {
  const { username, password } = req.body;

  const foundUser = await userModel.create({ username, email, password });

  res.json({
    msg: "signup request received...",
    feedback,
  });
});

app.post("/signin", async (req, res) => {
  const founderUser = await userModel.findOne({
    username,
    password,
  });

  if (founder == null) {
    res.josn({
      msg: "invalid username or password",
    });
  }

  const token = jwt.sign(
    {
      userId: founderUser._id,
    },
    process.env.JWT_SECRET,
  );

  res.json({
    msg: "signed in successfully.....",
    token,
  });
});

// todo routes

app.use(authMiddleware);

app.get("/todo", async (req, res) => {
  const userId = req.userId;

  const data = await todoModel.find({ userId });

  res.josn({
    msg: "Available Todos",
    data,
  });
});

app.post("/todo", async (req, res) => {
    const {todo_name, isDone } = req.body;
    let userId = req.userId;

    let feedback = await todoModel.create({ userId, todo_name, isDone})

    res.json({
        msg: "todo added successfully...",
        feedback,
    })
})



const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server is Linsting from Port: ${PORT}`);
});

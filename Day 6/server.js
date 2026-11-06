import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";

const app = express();

const JWT_Secret = "I Love Biryani";
app.use(cors());
app.use(express.json());

let usee
app.listen("8080", () => {
  console.log("PORT listning on : 8080");
});

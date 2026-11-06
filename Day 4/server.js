import express from "express";
import rateLimitterMiddleware from "./src/middlewares/rateLimitterMiddleware.js";
import reqCounterMiddleware from "./src/middlewares/reqCounterMiddleware.js";
import { div, mul, sum, sub } from "./src/controllers/callculatorController.js";
import requestLoggerMiddleware from "./src/middlewares/loggerMiddleware.js";
import authenticatMiddleware from "./src/middlewares/protectedDataMiddleware.js";

import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

app.use(requestLoggerMiddleware);
app.use(reqCounterMiddleware);
app.use(rateLimitterMiddleware);

app.get("/sum/:a/:b", sum);

app.get("/mul/:a/:b", mul);

app.get("/div/:a/:b", div);

app.get("/sub/:a/:b", sub);

app.use(authenticatMiddleware);

app.get("/protected-data", (req, res) => {
  res.json({
    secretData: "I Love Biryani",
  });
});

// app.post("/");

app.listen("8080", () => {
  console.log("Server is Listing on Port : 8080");
});

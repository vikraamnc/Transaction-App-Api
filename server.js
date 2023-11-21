import "dotenv/config";
import express from "express";
const app = express();
const PORT = process.env.PORT || 8000;

import cors from "cors";

// middlewares
app.use(express.json());
app.use(cors());

// db connection

import { connectMongoDb } from "./src/config/dbConfig.js";
connectMongoDb();

// routers
import userRouter from "./src/router/userRoter.js";
import transRouter from "./src/router/transRouter.js";

app.use("/api/v1/user", userRouter);
app.use("/api/v1/transaction", transRouter);

app.get("/", (req, res) => {
  res.json({
    message: "served is live",
  });
});

app.use("*", (req, res, next) => {
  const obj = {
    message: "404 Page not found",
    errorCode: 404,
  };
  next(obj);
});

// error handling at one place
app.use((error, req, res, next) => {
  const errorCode = error.errorCode || 500;

  res.status(errorCode).json({
    status: "error",
    message: error.message,
  });
});

app.listen(PORT, (error) => {
  error
    ? console.log(error)
    : console.log(`Server is running at http://localhost:${PORT}`);
});

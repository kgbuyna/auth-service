import express from "express";
import http from "http";
import dotenv from "dotenv"
import cors from "cors";

import authRouter from "./routes/authRouter";
import userRouter from "./routes/userRouter";

import ErrorHandler from "./middleware/errorHandler";

import { assertDatabaseConnectionOk } from "./db/connect";

dotenv.config({
  path: `${__dirname}/../.env`
});

const app = express();
const server = http.createServer(app);
const port = 4000

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routers
app.use("/users", userRouter)
app.use("/", authRouter)

// Error Handler
app.use(ErrorHandler)

assertDatabaseConnectionOk();

server.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

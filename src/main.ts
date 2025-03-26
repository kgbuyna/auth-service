import express from "express";
import http from "http";
import { assertDatabaseConnectionOk } from "./db/connect";

import authRouter from "./routes/authRouter";
import userRouter from "./routes/userRouter";

import { authenticateToken } from "./middleware/authenticate";

const app = express();
const server = http.createServer(app);
const port = 4000

app.use("/", authRouter)
app.use(authenticateToken).use("/users", userRouter)

assertDatabaseConnectionOk();

server.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

import express from "express";
import cors from "cors";
import userRouter from "./routers/user-router.js";
import consultRouter from "./routers/consult-router.js";

import dotenv from "dotenv";
dotenv.config();

const server = express();
server
  .use(cors())
  .use(express.json())
  .use("/users", userRouter)
  .use("/consults", consultRouter);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Listening on port ${PORT}`));

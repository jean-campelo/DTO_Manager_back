import express from "express";
import cors from "cors";
//import doctorRouter from "./routers/doctor-router.js";
import userRouter from "./routers/user-router.js";
import dotenv from "dotenv";
dotenv.config();

const server = express();
server
    .use(cors())
    .use(express.json())
    .use("/users", userRouter)


const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Listening on port ${PORT}`));
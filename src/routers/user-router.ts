import { Router } from "express";
import doctorController from "../controllers/user-controller.js";
import { validateUser } from "../middlewares/userMiddleware.js";

const DoctorRouter = Router();

DoctorRouter.post("/sign-up", validateUser, doctorController.signUp);
DoctorRouter.post("/sign-in", validateUser,doctorController.signIn);

export default DoctorRouter;

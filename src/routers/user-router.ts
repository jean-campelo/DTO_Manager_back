import { Router } from "express";
import userController from "../controllers/user-controller.js";
import { validateUser, validateNewUser } from "../middlewares/userMiddleware.js";

const userRouter = Router();

userRouter.post("/sign-up", validateNewUser, userController.signUp);
userRouter.post("/sign-in", validateUser, userController.signIn);

export default userRouter;

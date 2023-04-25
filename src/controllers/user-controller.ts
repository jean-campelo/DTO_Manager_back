import { Request, Response } from "express";
import userService from "../services/user-service.js";
import { dataUserEntity } from "../protocols/dataUser.js";
import httpStatus from "http-status";

async function signUp(req: Request, res: Response) {
  const { email, password } = req.body as dataUserEntity;

  try {
    const newUser = await userService.registerUser({ email, password });

    return res.status(httpStatus.CREATED).send({ email: newUser.email });
  } catch (error) {
    if (error.name === "DuplicatedRegisterError") {
      return res.status(httpStatus.CONFLICT).send(error);
    }
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}

async function signIn(req: Request, res: Response) {
  const { email, password } = req.body as SignInUserParams;

  try {
    const user = await userService.login({ email, password });
    return res.status(httpStatus.OK).send({ email: user.email });
  } catch (error) {
    if (error.name === "UnregisteredUser" || "invalidCredentialsError") {
      return res.status(httpStatus.CONFLICT).send(error);
    }
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}

export type SignInUserParams = Pick<dataUserEntity, "email" | "password">;

const doctorController = {
  signUp,
  signIn,
};

export default doctorController;

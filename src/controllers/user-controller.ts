import { Request, Response } from "express";
import userService from "../services/user-service.js";
import { dataUserEntity } from "../protocols/dataUser.js";
import httpStatus from "http-status";

async function signUp(req: Request, res: Response) {
  const { email, password, name } = req.body as dataUserEntity;

  try {
    await userService.registerUser({ email, password, name });

    return res.status(httpStatus.CREATED).send({ email, name });
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
    return res
      .status(httpStatus.OK)
      .send({ email: user.email, name: user.name });
  } catch (error) {
    if (error.name === "UnregisteredUser" || "invalidCredentialsError") {
      return res.status(httpStatus.CONFLICT).send(error);
    }
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}

export type SignInUserParams = Pick<dataUserEntity, "email" | "password">;

const userController = {
  signUp,
  signIn,
};

export default userController;

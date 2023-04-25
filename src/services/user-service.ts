import bcrypt from "bcrypt";
import userRepository from "../repositories/user-repository.js";
import {
  userAlreadyRegistered,
  unregisteredUser,
  invalidCredentialsError,
} from "./errors.js";
import { User } from "@prisma/client";

async function registerUser({
  email,
  password,
}: CreateUserParams): Promise<User> {
  const alreadyRegisteredUser = await userRepository.getUserByEmail(email);

  if (alreadyRegisteredUser) throw userAlreadyRegistered();

  const passwordHash = await bcrypt.hash(password, 12);
  const registerNewUser = await userRepository.create(email, passwordHash);

  return registerNewUser;
}

async function login({ email, password }: CreateUserParams): Promise<User> {
  const userExists = await userRepository.getUserByEmail(email);
  if (!userExists) throw unregisteredUser();

  const isPasswordValid = await bcrypt.compare(password, userExists.password);
  if (!isPasswordValid) throw invalidCredentialsError();

  return userExists;
}

export type CreateUserParams = Omit<User, "id" | "createdAt" | "updatedAt">;

const doctorService = {
  registerUser,
  login,
};

export default doctorService;

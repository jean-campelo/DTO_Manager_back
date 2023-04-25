import { ApplicationError } from "@/protocols/protocols";

export function userAlreadyRegistered(): ApplicationError {
  return {
    name: "DuplicatedRegisterError",
    message: "There is already an user with this Email",
  };
}

export function unregisteredUser(): ApplicationError {
  return {
    name: "UnregisteredUser",
    message: "There is no user registered with that email",
  }
}

export function invalidCredentialsError(): ApplicationError {
  return {
    name: "invalidCredentialsError",
    message: "Password or email is not valid",
  }
}

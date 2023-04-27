import { ApplicationError } from "@/protocols/protocols";

export function userAlreadyRegistered(): ApplicationError {
  return {
    name: "DuplicatedRegisterError",
    message: "E-mail informado já está em uso",
  };
}

export function unregisteredUser(): ApplicationError {
  return {
    name: "UnregisteredUser",
    message: "E-mail não pertence a um usuário válido",
  }
}

export function invalidCredentialsError(): ApplicationError {
  return {
    name: "invalidCredentialsError",
    message: "E-mail ou senha inválidos",
  }
}

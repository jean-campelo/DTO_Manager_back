import { Request, Response, NextFunction } from "express";
import httpStatus from "http-status";
import { userSchema } from "../schemas/user-schema.js";
import { dataUserEntity } from "../protocols/dataUser.js";

function validateUser(req: Request, res: Response, next: NextFunction) {
  const validationUser = userSchema.validate(req.body as dataUserEntity, {
    abortEarly: false,
  });

  if (validationUser.error) {
    const errors: string[] = validationUser.error.details.map(
      (detail: { message: string }) => detail.message
    );
    return res.status(httpStatus.UNPROCESSABLE_ENTITY).send(errors);
  }
  next();
}

export { validateUser };

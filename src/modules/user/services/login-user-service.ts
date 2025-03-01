import User from "../models/user-model";
import { Request, Response } from "express";
import BaseResponse from "../../../utils/responses";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_SECRET: jwt.Secret = process.env.JWT_SECRET || "your_jwt_secret_key";
const JWT_EXPIRY = parseInt(process.env.JWT_EXPIRY || "3600");

export const loginUserService = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { phoneNumber, password } = req.body;

    console.log("req.body", req.body);

    if (!phoneNumber)
      return BaseResponse.validationError(res, "Phone Number is required");
    if (!password)
      return BaseResponse.validationError(res, "Password is required");

    const existingUser = await User.findOne({
      where: { phoneNumber: phoneNumber },
    });
    if (!existingUser)
      return BaseResponse.validationError(res, "Phone Number is Invalid!");

    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordValid)
      return BaseResponse.validationError(
        res,
        "Mobile number or password is invalid!"
      );

    const token = jwt.sign({ userId: existingUser.id }, JWT_SECRET, {
      expiresIn: JWT_EXPIRY,
    });

    return BaseResponse.success(
      res,
      "User login successful",
      { token, user: existingUser }
    );
  } catch (err: any) {
    return BaseResponse.internalServerError(res, err, err.message);
  }
};

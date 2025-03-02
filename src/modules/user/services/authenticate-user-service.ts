import BaseResponse from "../../../utils/responses";
import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { JwtPayload } from "jsonwebtoken";

const JWT_SECRET: jwt.Secret = process.env.JWT_SECRET || "your_jwt_secret_key";

interface AuthenticatedRequest extends Request {
  token?: string | JwtPayload;
}

const authenticateToken = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return BaseResponse.unauthorized(res, "Access token is missing");
  }

  jwt.verify(token, JWT_SECRET, (err: any, decoded: any) => {
    if (err) {
      return BaseResponse.unauthorized(res, "Invalid or expired token");
    }
    req.token = decoded;

    next();
  });
};

export default authenticateToken;

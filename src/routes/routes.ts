import { Router } from "express";
import userRouter from "./user-routes";
import authenticateToken from "../modules/user/services/authenticate-user-service";
import asyncHandler from "../utils/helpers/async-handler";
import { registerUserService } from "../modules/user/services/register-user-service";
import { loginUserService } from "../modules/user/services/login-user-service";

const router = Router();

router.post("/api/v1/registerUser", asyncHandler(registerUserService));
router.post("/api/v1/login", asyncHandler(loginUserService));

router.use(asyncHandler(authenticateToken));

router.use("/api/v1/user", userRouter);

export default router;

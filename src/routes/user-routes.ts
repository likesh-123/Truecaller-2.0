import { Router } from "express";
import asyncHandler from "../utils/helpers/asyncHandler";

const userRouter = Router();

userRouter.get(
  "/get-vaccination/:userId",
  asyncHandler(async (req, res) => {
    // getVaccineByUserService(req, res);
  })
);

export default userRouter;

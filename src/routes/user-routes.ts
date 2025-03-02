import { Router } from "express";
import asyncHandler from "../utils/helpers/async-handler";
import { createContactService } from "../modules/contact/services/create-contact-service";

const userRouter = Router();

userRouter.post("/create-contact", asyncHandler(createContactService));

export default userRouter;

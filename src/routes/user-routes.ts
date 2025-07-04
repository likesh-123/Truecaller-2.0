import { Router } from "express";
import asyncHandler from "../utils/helpers/async-handler";
import { createContactService } from "../modules/contact/services/create-contact-service";
import { getAllContactService } from "../modules/contact/services/get-contacts-service";
import { getContactService } from "../modules/contact/services/get-contact-service";
import { autocompleteService } from "../modules/contact/services/autocomplete-service";

const userRouter = Router();

userRouter.post("/create-contact", asyncHandler(createContactService));
userRouter.get("/get-contacts", asyncHandler(getAllContactService));
userRouter.get("/get-contact", asyncHandler(getContactService));
userRouter.get("/get-autocomplete", asyncHandler(autocompleteService));

export default userRouter;

import { Response } from "express";
import BaseResponse from "../../../utils/responses";
import Contact from "../models/contact-models";
import AuthenticatedRequest from "../../../utils/helpers/authenticated-request";

export const createContactService = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<Response> => {
  try {
    const { firstName, lastName, phoneNumber, email } = req.body;

    if (!firstName)
      return BaseResponse.validationError(res, "First Name is required");
    if (!lastName)
      return BaseResponse.validationError(res, "Last Name is required");
    if (!phoneNumber)
      return BaseResponse.validationError(res, "Phone Number is required");
    if (!email) return BaseResponse.validationError(res, "Email is required");

    const contactData = {
      phoneNumber: phoneNumber,
      firstName: firstName,
      lastName: lastName,
      email: email,
      userId: req.token.userId,
    };

    contactManager.addContact(req.token.userId, phoneNumber);

    const newContact = await Contact.create(contactData);
    return BaseResponse.created(
      res,
      "Contact created successfully",
      newContact
    );
  } catch (err: any) {
    return BaseResponse.internalServerError(res, err, err.message);
  }
};

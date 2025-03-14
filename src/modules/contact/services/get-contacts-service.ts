import Contact from "../models/contact-models";
import { Response } from "express";
import BaseResponse from "../../../utils/responses";
import AuthenticatedRequest from "../../../utils/helpers/authenticated-request";

export const getAllContactService = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<Response> => {
  try {

    const contacts = await Contact.findAll({
      where: { userId: req.token.userId },
    });
    if (contacts.length === 0)
      return BaseResponse.notFound(res, "No contacts found!");

    return BaseResponse.success(res, "Success", contacts);
  } catch (err: any) {
    return BaseResponse.internalServerError(res, err, err.message);
  }
};

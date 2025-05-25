import { Response } from "express";
import BaseResponse from "../../../utils/responses";
import AuthenticatedRequest from "../../../utils/helpers/authenticated-request";
import ContactManager from "../../contactManager/contact-manager";

export const autocompleteService = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<Response> => {
  try {
    if (!req.body.prefix)
      return BaseResponse.validationError(res, "prefix is required");

    const userId = req.token.userId;

    const contacts = await ContactManager.getInstance().getAutocomplete(
      userId,
      req.body.prefix
    );

    return BaseResponse.success(res, "Success", contacts);
  } catch (err: any) {
    return BaseResponse.internalServerError(res, err, err.message);
  }
};

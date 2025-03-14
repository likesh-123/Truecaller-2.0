import Contact from "../models/contact-models";
import { Response } from "express";
import BaseResponse from "../../../utils/responses";
import AuthenticatedRequest from "../../../utils/helpers/authenticated-request";
import BloomFilterManager from "../../../config/bloom-filter/bloom-filter-mapper";

export const getContactService = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<Response> => {
  try {
    const phoneNumber = req.query.phoneNumber as string;

    if (!phoneNumber)
      return BaseResponse.validationError(res, "Phone number is required!");

    const bloomFilter = BloomFilterManager.getOrCreateBloomFilter("CONTACT");
    if (!bloomFilter.contains(phoneNumber))
      return BaseResponse.notFound(res, "No contacts found!");

    const contact = await Contact.findOne({
      where: { phoneNumber: phoneNumber },
    });

    if (!contact) return BaseResponse.notFound(res, "No contacts found!");
    return BaseResponse.success(res, "Success", contact);
  } catch (err: any) {
    return BaseResponse.internalServerError(res, err, err.message);
  }
};

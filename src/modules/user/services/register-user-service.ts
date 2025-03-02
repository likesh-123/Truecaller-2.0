import User from "../models/user-model";
import { Request, Response } from "express";
import BaseResponse from "../../../utils/responses";
import bcrypt from "bcrypt";
import { Tag, UserCategory } from "../../../utils/enums/user-enums";
import Address from "../models/address-model";

export const registerUserService = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const {
      userName,
      firstName,
      lastName,
      phoneNumber,
      password,
      email,
      dob,
      gender,
      addressLine1,
      addressLine2,
      addressLine3,
      city,
      state,
      country,
      pinCode,
    } = req.body;

    if (!userName)
      return BaseResponse.validationError(res, "userName is required");
    if (!firstName)
      return BaseResponse.validationError(res, "First Name is required");
    if (!lastName)
      return BaseResponse.validationError(res, "Last Name is required");
    if (!phoneNumber)
      return BaseResponse.validationError(res, "Phone Number is required");
    if (!password)
      return BaseResponse.validationError(res, "Password is required");
    if (!email) return BaseResponse.validationError(res, "Email is required");
    if (!dob) return BaseResponse.validationError(res, "DOB is required");
    if (!gender) return BaseResponse.validationError(res, "Gender is required");
    if (!addressLine1)
      return BaseResponse.validationError(res, "Address Line 1 is required");
    if (!addressLine2)
      return BaseResponse.validationError(res, "Address Line 2 is required");
    if (!city) return BaseResponse.validationError(res, "City is required");
    if (!state) return BaseResponse.validationError(res, "State is required");
    if (!country)
      return BaseResponse.validationError(res, "Country is required");
    if (!pinCode)
      return BaseResponse.validationError(res, "Pincode is required");

    const existingUser = await User.findOne({
      where: { phoneNumber: phoneNumber },
    });

    if (existingUser)
      return BaseResponse.validationError(
        res,
        "User with this phone number already exists"
      );

    const hashedPassword = await bcrypt.hash(password, 10);

    const addressData = {
      addressLine1: addressLine1,
      addressLine2: addressLine2,
      addressLine3: addressLine3 || "",
      city: city,
      state: state,
      country: country,
      pinCode: pinCode,
    };

    const newAddress = await Address.create(addressData);

    const userData = {
      phoneNumber: phoneNumber,
      userName: userName,
      password: hashedPassword,
      firstName: firstName,
      lastName: lastName,
      email: email,
      dob: dob,
      gender: gender,
      tag: Tag.EDUCATION,
      userCategory: UserCategory.FREE,
      addressId: newAddress.id,
    };

    const newUser = await User.create(userData);
    return BaseResponse.created(res, "User registered successfully", newUser);
  } catch (err: any) {
    return BaseResponse.internalServerError(res, err, err.message);
  }
};

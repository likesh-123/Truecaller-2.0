import { Response } from "express";

class BaseResponse {
  public static success(
    res: Response,
    message: string = "Success",
    data: any = {},
    statusCode: number = 200
  ): Response {
    return res.status(statusCode).json({
      success: true,
      message,
      data,
    });
  }

  public static created(
    res: Response,
    message: string = "Created Successfully",
    data: any = {},
    statusCode: number = 201
  ): Response {
    return res.status(statusCode).json({
      success: true,
      message,
      data,
    });
  }

  public static updated(
    res: Response,
    message: string = "Updated Successfully",
    data: any = {},
    statusCode: number = 200
  ): Response {
    return res.status(statusCode).json({
      success: true,
      message,
      data,
    });
  }

  public static error(
    res: Response,
    message: string = "Internal Server Error",
    statusCode: number = 500,
    error: any = null
  ): Response {
    return res.status(statusCode).json({
      success: false,
      message,
      error,
    });
  }

  public static validationError(
    res: Response,
    message: string = "Validation Error",
    errors: any = {},
    statusCode: number = 400
  ): Response {
    return res.status(statusCode).json({
      success: false,
      message,
      errors,
    });
  }

  public static unauthorized(
    res: Response,
    message: string = "Unauthorized",
    statusCode: number = 401
  ): Response {
    return res.status(statusCode).json({
      success: false,
      message,
    });
  }

  public static forbidden(
    res: Response,
    message: string = "Forbidden",
    statusCode: number = 403
  ): Response {
    return res.status(statusCode).json({
      success: false,
      message,
    });
  }

  public static notFound(
    res: Response,
    message: string = "Not Found",
    statusCode: number = 404
  ): Response {
    return res.status(statusCode).json({
      success: false,
      message,
    });
  }

  public static internalServerError(
    res: Response,
    error: any = null,
    message: string = "Internal Server Error",
    statusCode: number = 500
  ): Response {
    return res.status(statusCode).json({
      success: false,
      message,
      error,
    });
  }
}

export default BaseResponse;

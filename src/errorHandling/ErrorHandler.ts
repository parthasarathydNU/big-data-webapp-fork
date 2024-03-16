import { ErrorRequestHandler } from "express";
import { ValidateError } from "tsoa";
import { HTTPStatusCode } from "../utils/httpStatusCode.util.js";
import {
  AuthError,
  BadInputError,
  BadRequestError,
  DataNotModified,
  NotFoundError,
  PreConditionRequiredError,
} from "./Errors.js";

// noinspection JSUnusedLocalSymbols
export const errorHandler: ErrorRequestHandler = (error, req, res, next) => {
  if (error instanceof ValidateError) {
    console.log(error);
    res.status(HTTPStatusCode.BAD_REQUEST).end();
  } else if (error instanceof PreConditionRequiredError){
    res.status(HTTPStatusCode.PRECONDITION_REQUIRED).end();
  } else if (error instanceof DataNotModified) {
    res.status(HTTPStatusCode.DATA_NOT_MODIFIED).end();
  } else if (error instanceof NotFoundError) {
    res.status(HTTPStatusCode.OK).end();
  } else if (error instanceof BadInputError) {
    res.status(HTTPStatusCode.BAD_REQUEST).end();
  } else if (error instanceof BadRequestError) {
    res.status(HTTPStatusCode.BAD_REQUEST).end();
  } else if (error instanceof AuthError) {
    res.status(HTTPStatusCode.UNAUTHORIZED).end();
  } else {
    console.log(error);
    res.status(HTTPStatusCode.INTERNAL_SERVER_ERROR).end();
  }
};

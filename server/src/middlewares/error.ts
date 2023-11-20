import { ErrorRequestHandler } from "express";

export const errorMiddleware: ErrorRequestHandler = (err, _, res, next) => {
  if (err) {
    res.status(res.statusCode).json({
      error: {
        message: err.message,
        status: res.statusCode,
        stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
      },
    });
  }
  next();
};

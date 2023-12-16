import { RequestHandler } from "express";

export const requestInterceptor: RequestHandler = (req, res, next) => {
  const body = JSON.stringify(req.body);
  console.log(`- ${res.statusCode} ${req.method} ${req.originalUrl} ${body}`);
  next();
};

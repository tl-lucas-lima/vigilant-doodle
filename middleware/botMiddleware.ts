import {  Response, NextFunction } from "express";
import { commands, RequestBody } from "../commands";
import { TelegramMessageResponse } from "../models/TelegramMessageResponse";



export const botMiddleware = async (
  req: RequestBody<TelegramMessageResponse>,
  _res: Response,
  _next: NextFunction
) => {
  _next();
  commands(req);
};

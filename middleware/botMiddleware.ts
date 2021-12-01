import { Request, Response, NextFunction } from "express";
import { commands } from "../commands";
import { TelegramMessageResponse } from "../models/TelegramMessageResponse";

interface RequestBody<T> extends Request {
  body: T;
}

export const botMiddleware = async (
  req: RequestBody<TelegramMessageResponse>,
  _res: Response,
  _next: NextFunction
) => {
  _next();
  const chatId = req.body.message.chat.id;
  const message = req.body.message.text.toLocaleLowerCase();

  commands(chatId, message);
};

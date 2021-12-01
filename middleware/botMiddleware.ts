import { Request, Response, NextFunction } from "express";
import { text } from "stream/consumers";
import { Constants } from "../common/constants";
import { TelegramMessageResponse } from "../models/TelegramMessageResponse";
import { apiClient } from "../services/client";

interface RequestBody<T> extends Request {
  body: T;
}

const hppMockUrl =
  "https://checkout.t7r.dev/payments-mock#payment_id=123&resource_token=123456&return_uri=https://penny.t7r.dev/redirect";

const sendMessage = async (chatId: number, message: string) => {
  await apiClient.post(`${Constants.TelegramAPI}/sendMessage`, {
    chat_id: chatId,
    parse_mode: "HTML",
    text: message,
  });
};

export const botMiddleware = async (
  req: RequestBody<TelegramMessageResponse>,
  _res: Response,
  _next: NextFunction
) => {
  _next();
};

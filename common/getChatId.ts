import { RequestBody } from "../commands";
import { TelegramMessageResponse } from "../models/TelegramMessageResponse";

export function getChatId(req: RequestBody<TelegramMessageResponse>) {
  return req.body.message.chat.id
}

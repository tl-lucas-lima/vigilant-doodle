import { RequestBody } from ".";
import { getChatId } from "../common/getChatId";
import { sendMessage } from "../common/sendMessage";
import { TelegramMessageResponse } from "../models/TelegramMessageResponse";

export async function start(req: RequestBody<TelegramMessageResponse>) {
  return await sendMessage(
    getChatId(req),
    `Hey👋🏼 \nWelcome to the TrueLayer Bot!\nUse /help for more information.`
  );
}

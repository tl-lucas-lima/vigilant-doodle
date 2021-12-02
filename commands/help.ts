import { RequestBody } from ".";
import { getChatId } from "../common/getChatId";
import { sendMessage } from "../common/sendMessage";
import { TelegramMessageResponse } from "../models/TelegramMessageResponse";

export async function help(req: RequestBody<TelegramMessageResponse>) {
  return await sendMessage(
    getChatId(req),
    `Hey 👋🏼\nDo you need some help? Don't worry.\n\nHere are some commands you can use:\n /pay £(amount) to @(person)`
  );
}

import { RequestBody } from ".";
import { getChatId } from "../common/getChatId";
import { sendMessage } from "../common/sendMessage";
import { TelegramMessageResponse } from "../models/TelegramMessageResponse";

export async function help(chatId: RequestBody<TelegramMessageResponse>) {
  return await sendMessage(
    getChatId(chatId),
    `Hey 👋🏼\nDo you need some help? Don't worry.\n\nHere are some commands you can use:\n /topup`
  );
}

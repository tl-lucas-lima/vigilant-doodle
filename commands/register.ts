import { RequestBody } from ".";
import { getChatId } from "../common/getChatId";
import { sendMessage } from "../common/sendMessage";
import { client } from "../main";
import { TelegramMessageResponse } from "../models/TelegramMessageResponse";

export async function register(req: RequestBody<TelegramMessageResponse>) {
  await client.set(`state:`, 'account_number');
  await sendMessage(getChatId(req), `Enter your account number:`);
}

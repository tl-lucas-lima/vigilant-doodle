import { RequestBody } from "../commands";
import { client } from "../main";
import { TelegramMessageResponse } from "../models/TelegramMessageResponse";

export async function setAccountNumber(
  req: RequestBody<TelegramMessageResponse>
) {
  return await client.set(
    `account_number:${req.body.message.chat.id}`,
    JSON.stringify(req.body.message.text)
  );
}

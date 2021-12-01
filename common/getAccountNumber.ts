import { RequestBody } from "../commands";
import { client } from "../main";
import { TelegramMessageResponse } from "../models/TelegramMessageResponse";

export async function getAccountNumber(
  req: RequestBody<TelegramMessageResponse>
) {
  const accountNumber = await client.get(
    `account_number:${req.body.message.chat.id}`
  );
  return JSON.parse(accountNumber ?? "");
}

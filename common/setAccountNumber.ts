import { RequestBody } from "../commands";
import { client } from "../main";
import { TelegramMessageResponse } from "../models/TelegramMessageResponse";

export async function setAccountNumber(
  req: RequestBody<TelegramMessageResponse>
) {
  try {
    return await client.set(
      `account_number:${req.body.message.from.username}`,
      JSON.stringify(req.body.message.text)
    );
  } catch (e) {
    return ""
  }
}

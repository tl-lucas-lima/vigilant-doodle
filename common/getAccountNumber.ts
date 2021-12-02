import { RequestBody } from "../commands";
import { client } from "../main";
import { TelegramMessageResponse } from "../models/TelegramMessageResponse";

export async function getAccountNumber(
  req: RequestBody<TelegramMessageResponse>
): Promise<string> {
  try {
    const accountNumber = await client.get(
      `account_number:${req.body.message.from.username}`
    );
    return JSON.parse(accountNumber ?? "");
  } catch (e) {
    return "";
  }
}

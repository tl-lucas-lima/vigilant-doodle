import { RequestBody } from "../commands";
import { client } from "../main";
import { TelegramMessageResponse } from "../models/TelegramMessageResponse";

export async function getSortCode(
  req: RequestBody<TelegramMessageResponse>,
  username?: string
): Promise<string> {
  try {
    const sortCode = await client.get(
      `sort_code:${username ?? req.body.message.from.username}`
    );
    return JSON.parse(sortCode ?? "");
  } catch (e) {
    return "";
  }
}

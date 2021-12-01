import { RequestBody } from "../commands";
import { client } from "../main";
import { TelegramMessageResponse } from "../models/TelegramMessageResponse";

export async function getSortCode(
  req: RequestBody<TelegramMessageResponse>
): Promise<string> {
  try {
    const sortCode = await client.get(`sort_code:${req.body.message.from.id}`);
    return JSON.parse(sortCode ?? "");
  } catch (e) {
    return "";
  }
}

import { RequestBody } from "../commands";
import { client } from "../main";
import { TelegramMessageResponse } from "../models/TelegramMessageResponse";

export async function setSortCode(
  req: RequestBody<TelegramMessageResponse>
) {
  return await client.set(
    `sort_code:${req.body.message.from.username}`,
    JSON.stringify(req.body.message.text)
  );
}

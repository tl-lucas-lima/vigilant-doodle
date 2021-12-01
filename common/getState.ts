import { RequestBody } from "../commands";
import { client } from "../main";
import { TelegramMessageResponse } from "../models/TelegramMessageResponse";

export async function getState(req: RequestBody<TelegramMessageResponse>) {
  const x = await client.get(`state:${req.body.message.chat.id}`);
  return JSON.parse(x ?? "");
}

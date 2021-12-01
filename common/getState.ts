import { RequestBody } from "../commands";
import { client } from "../main";
import { TelegramMessageResponse } from "../models/TelegramMessageResponse";

export async function getState(req: RequestBody<TelegramMessageResponse>) {
  try {
    const x = await client.get(`state:${req.body.message.from.id}`);
    return JSON.parse(x ?? "");
  } catch (e) {
    return ""
  }
}

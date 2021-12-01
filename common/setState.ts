import { RequestBody } from "../commands";
import { client } from "../main";
import { Flows } from "../models/Flows";
import { TelegramMessageResponse } from "../models/TelegramMessageResponse";

export async function setState(
  req: RequestBody<TelegramMessageResponse>,
  state: Flows
) {
  return await client.set(
    `state:${req.body.message.chat.id}`,
    JSON.stringify(state)
  );
}

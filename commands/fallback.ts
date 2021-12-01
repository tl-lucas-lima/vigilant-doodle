import { RequestBody } from ".";
import { getChatId } from "../common/getChatId";
import { sendMessage } from "../common/sendMessage";
import { client } from "../main";
import { Flows } from "../models/Flows";
import { TelegramMessageResponse } from "../models/TelegramMessageResponse";

export async function fallback(req: RequestBody<TelegramMessageResponse>) {
  const state = (await client.get("state:")) as Flows;

  switch (state) {
    case "account_number":
      await client.set("state:", "sort_code");
      return await sendMessage(
        getChatId(req),
        `Please enter your sort-code in the format xx-xx-xx`
      );
    case "sort_code":
      return await sendMessage(
        getChatId(req),
        "All done, now enjoy some cardless payments!"
      );
    default:
      return await sendMessage(
        getChatId(req),
        `Sorry I didn't get that. I'm still learning... 😞\n\nHere are some commands you can use:\n/help\n/pay £200`
      );
  }
}

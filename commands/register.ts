import { RequestBody } from ".";
import { getChatId } from "../common/getChatId";
import { sendMessage } from "../common/sendMessage";
import { setState } from "../common/setState";
import { TelegramMessageResponse } from "../models/TelegramMessageResponse";

export async function register(req: RequestBody<TelegramMessageResponse>) {
  if (req.body.message.chat.type !== "private") {
    await sendMessage(
      getChatId(req),
      `Register your details privately with the app, best not to do this in a group...`
    );
  } else {
    await setState(req, "account_number");
    await sendMessage(getChatId(req), `Enter your account number:`);
  }
}

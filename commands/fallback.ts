import { RequestBody } from ".";
import { getAccountNumber } from "../common/getAccountNumber";
import { getChatId } from "../common/getChatId";
import { getState } from "../common/getState";
import { sendMessage } from "../common/sendMessage";
import { setAccountNumber } from "../common/setAccountNumber";
import { setSortCode } from "../common/setSortCode";
import { setState } from "../common/setState";
import { client } from "../main";
import { Flows } from "../models/Flows";
import { TelegramMessageResponse } from "../models/TelegramMessageResponse";

export async function fallback(req: RequestBody<TelegramMessageResponse>) {
  const state = await getState(req);

  switch (state) {
    case "account_number":
      await setAccountNumber(req);
      const ac = getAccountNumber(req);
      await setState(req, "sort_code");
      const y = await getState(req);
      return await sendMessage(
        getChatId(req),
        `Please enter your sort-code in the format xx-xx-xx`
      );
    case "sort_code":
      await setSortCode(req);
      await setState(req, null);
      return await sendMessage(
        getChatId(req),
        "All done, now enjoy some cardless payments! ( Secured by your boi TrueLayer )"
      );
    default:
      return await sendMessage(
        getChatId(req),
        `Sorry I didn't get that. I'm still learning... 😞\n\nHere are some commands you can use:\n/help\n/pay £200`
      );
  }
}

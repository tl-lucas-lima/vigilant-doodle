import * as Yup from "yup";
import { RequestBody } from ".";

import { getChatId } from "../common/getChatId";
import { getState } from "../common/getState";
import { sendMessage } from "../common/sendMessage";
import { setAccountNumber } from "../common/setAccountNumber";
import { setSortCode } from "../common/setSortCode";
import { setState } from "../common/setState";
import { TelegramMessageResponse } from "../models/TelegramMessageResponse";

const accountNumberValidation = Yup.string()
  .min(8)
  .max(8)
  .matches(/^[0-9]+$/);
const sortCodeValidation = Yup.string()
  .min(6)
  .max(6)
  .matches(/^[0-9]+$/);

export async function fallback(req: RequestBody<TelegramMessageResponse>) {
  const state = await getState(req);

  switch (state) {
    case "account_number":
      return accountNumberValidation
        .validate(req.body.message.text)
        .then(async () => {
          await setAccountNumber(req);
          await setState(req, "sort_code");
          return await sendMessage(
            getChatId(req),
            `Please enter your 6 digit sort-code`
          );
        })
        .catch(async () => {
          return await sendMessage(
            getChatId(req),
            `Looks like that isn't a valid 8 digit account number, please enter again`
          );
        });
    case "sort_code":
      return sortCodeValidation
        .validate(req.body.message.text)
        .then(async () => {
          await setSortCode(req);
          await setState(req, null);
          return await sendMessage(
            getChatId(req),
            "All done, now enjoy some cardless payments! ( Secured by your boi TrueLayer )"
          );
        })
        .catch(async () => {
          return await sendMessage(
            getChatId(req),
            "Looks like that isn't  a valid 6 digit sort code, please enter again"
          );
        });
    default:
      return await sendMessage(
        getChatId(req),
        `Sorry I didn't get that. I'm still learning... 😞\n\nHere are some commands you can use:\n/help\n/pay £200`
      );
  }
}

import { RequestBody } from "../commands";
import { TelegramMessageResponse } from "../models/TelegramMessageResponse";
import { Constants } from "./constants";
import { getAccountNumber } from "./getAccountNumber";
import { getSortCode } from "./getSortCode";

export async function getDeets(
  req: RequestBody<TelegramMessageResponse>,
  username: string
) {
  try {
    const accountNumber = await getAccountNumber(req, username);
    const sortCode = await getSortCode(req, username);
    const user = Constants.demoUsers.find((user) => user.username === username);

    return {
      accountNumber: accountNumber || user?.account_number,
      sortCode: sortCode || user?.sort_code,
    };
  } catch (e) {
    return {
      accountNumber: "",
      sortCode: "",
    };
  }
}

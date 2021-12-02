import { RequestBody } from "../commands";
import { TelegramMessageResponse } from "../models/TelegramMessageResponse";
import { getAccountNumber } from "./getAccountNumber";
import { getSortCode } from "./getSortCode";

export async function getDeets(req: RequestBody<TelegramMessageResponse>, username: string) {
  try {
    const accountNumber = await getAccountNumber(req, username);
    const sortCode = await getSortCode(req, username);

    return {
      accountNumber,
      sortCode,
    };
  } catch (e) {
    return {
      accountNumber: "",
      sortCode: "",
    };
  }
}

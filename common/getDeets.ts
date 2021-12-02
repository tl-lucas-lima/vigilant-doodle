import { RequestBody } from "../commands";
import { TelegramMessageResponse } from "../models/TelegramMessageResponse";
import { getAccountNumber } from "./getAccountNumber";
import { getSortCode } from "./getSortCode";

export async function getDeets(req: RequestBody<TelegramMessageResponse>) {
  try {
    const accountNumber = await getAccountNumber(req);
    const sortCode = await getSortCode(req);

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

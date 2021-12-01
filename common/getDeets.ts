import { RequestBody } from "../commands";
import { TelegramMessageResponse } from "../models/TelegramMessageResponse";
import { getAccountNumber } from "./getAccountNumber";
import { getSortCode } from "./getSortCode";

export async function getDeets(req: RequestBody<TelegramMessageResponse>) {
  try {
    const accountNumber = await getAccountNumber(req);
    const sortCode = await getSortCode(req);

    const _accountNumber = JSON.parse(accountNumber ?? "");
    const _sortCode = JSON.parse(sortCode ?? "");
    return {
      accountNumber: _accountNumber,
      sortCode: _sortCode,
    };
  } catch (e) {
    return {
      accountNumber: "",
      sortCode: "",
    };
  }
}

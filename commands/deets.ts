import { RequestBody } from ".";
import { getAccountNumber } from "../common/getAccountNumber";
import { getChatId } from "../common/getChatId";
import { sendMessage } from "../common/sendMessage";
import { client } from "../main";
import { TelegramMessageResponse } from "../models/TelegramMessageResponse";

export async function deets(req: RequestBody<TelegramMessageResponse>) {
  const accountNumber = await getAccountNumber(req);
  const sortCode = await client.get("sort_code:");
  return await sendMessage(
    getChatId(req),
    `We got your deets:\n\naccount-number: ${JSON.parse(
      accountNumber ?? ""
    )}\nsort-code: ${JSON.parse(sortCode ?? "")}\n\nIf this is incorrect please run the /register command and you can re-register your bank details.`
  );
}

import { RequestBody } from ".";
import { getAccountNumber } from "../common/getAccountNumber";
import { getChatId } from "../common/getChatId";
import { getSortCode } from "../common/getSortCode";
import { sendMessage } from "../common/sendMessage";
import { TelegramMessageResponse } from "../models/TelegramMessageResponse";

export async function deets(req: RequestBody<TelegramMessageResponse>) {
  const accountNumber = await getAccountNumber(req);
  const sortCode = await getSortCode(req);
  if (req.body.message.chat.type !== "private") {
    return await sendMessage(
      getChatId(req),
      "Please call this from private chat with app..."
    );
  } else {
    if (!accountNumber || !sortCode) {
      return await sendMessage(
        getChatId(req),
        `Looks like we don't have all your details, please use /register to finsh your setup`
      ); 
    }
    return await sendMessage(
      getChatId(req),
      `We got your details:\n\naccount-number: ${accountNumber}\nsort-code: ${sortCode}\n\nIf this is incorrect please run the /register command and you can re-register your bank details.`
    );
  }
}

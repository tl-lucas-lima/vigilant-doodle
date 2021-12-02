import { RequestBody } from ".";
import { Constants } from "../common/constants";
import { getChatId } from "../common/getChatId";
import { getDeets } from "../common/getDeets";
import { sendMessage } from "../common/sendMessage";
import { TelegramMessageResponse } from "../models/TelegramMessageResponse";
import { createPayment } from "../services/paymentService";

const hppMockUrl =
  "https://checkout.t7r.dev/payments-mock#payment_id=123&resource_token=123456&return_uri=https://penny.t7r.dev/redirect";

export async function pay(req: RequestBody<TelegramMessageResponse>) {
  const chatId = getChatId(req);
  const message = req.body.message.text;

  const amount = message.match(/£\d+[\.]?\d{2}/);
  const beneficiary = message.match(/(?!@)\w+$/);

  if (beneficiary && amount) {
    // if details exist then we user is registed, otherwise ask them to register
    const deets = await getDeets(req, beneficiary[0]);

    const user = Constants.demoUsers.find((u) => u.username === beneficiary[0]);
    if (!deets.accountNumber || !deets.sortCode) {
      return await sendMessage(chatId, `uh oh. 👀 Looks like @${beneficiary[0]} is missing bank details.`)
    } else {

      await sendMessage(
        chatId,
        `Understood.🤑\nInitialising payment...\n- Amount: ${amount[0]}\n- To: @${beneficiary[0]}`
      );
  
      try {
        const res = await createPayment({
          beneficiaryName: beneficiary[0],
          sortCode: deets.sortCode,
          accountNumber: deets.accountNumber,
        });
  
        await sendMessage(
          chatId,
          `💸 Payment initialised, please click on the link bellow to authorize your payment.\n\n<a href="${res.hpp_url}">Authorize</a>`
        );
      } catch (error) {
        await sendMessage(
          chatId,
          `Oops, something went wrong .Please try again later.`
        );
      }
    }


    
  }
}

import { RequestBody } from ".";
import { Constants } from "../common/constants";
import { getChatId } from "../common/getChatId";
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
    const user = Constants.demoUsers.find((u) => u.username === beneficiary[0]);

    if (user) {
      await sendMessage(
        chatId,
        `Understood.🤑\nInitialising payment...\n- Amount: ${amount[0]}\n- To: @${beneficiary[0]}`
      );

      try {
        const res = await createPayment({
          beneficiaryName: user.username,
          sortCode: user.sort_code,
          accountNumber: user.account_number,
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
    } else {
      await sendMessage(
        chatId,
        `Sorry. User @${beneficiary} has no payment information associated to his account.\nPlease use the command "/register" on TrueLayer_bot chat.`
      );
    }
  }
}

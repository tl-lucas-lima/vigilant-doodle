import { RequestBody } from ".";
import { getChatId } from "../common/getChatId";
import { sendMessage } from "../common/sendMessage";
import { TelegramMessageResponse } from "../models/TelegramMessageResponse";

const hppMockUrl =
  "https://checkout.t7r.dev/payments-mock#payment_id=123&resource_token=123456&return_uri=https://penny.t7r.dev/redirect";

export async function pay(req: RequestBody<TelegramMessageResponse>) {
  const chatId = getChatId(req);
  const message = req.body.message.text;

  const amount = message.match(/£\d+[\.]?\d{2}/);
  const beneficiary = message.match(/(?!@)\w+$/);

  if (message.includes(" to ") && beneficiary) {
    console.log(beneficiary);
    await sendMessage(
      chatId,
      `Understood.🤑\nInitialising payment...\n- Amount: ${amount}\n To: ${beneficiary}`
    );

    setTimeout(async () => {
      await sendMessage(
        chatId,
        `💸 Payment initialised, please click on the link bellow to authorize your payment.\n\n<a href="${hppMockUrl}">Authorize</a>`
      );
    }, 2000);
  }
}

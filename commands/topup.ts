import { RequestBody } from ".";
import { getChatId } from "../common/getChatId";
import { sendMessage } from "../common/sendMessage";
import { TelegramMessageResponse } from "../models/TelegramMessageResponse";

const hppMockUrl =
  "https://checkout.t7r.dev/payments-mock#payment_id=123&resource_token=123456&return_uri=https://penny.t7r.dev/redirect";

export async function topup(req: RequestBody<TelegramMessageResponse>) {
  await sendMessage(
    getChatId(req),
    `Understood.🤑\nInitialising payment...\n- Amount: £200`
  );
  setTimeout(async () => {
    await sendMessage(
      getChatId(req),
      `💸 Payment initialised, please click on the link bellow to authorize your payment.\n\n<a href="${hppMockUrl}">Authorize</a>`
    );
  }, 2000);
}

import { Request, Response, NextFunction } from "express";
import { text } from "stream/consumers";
import { Constants } from "../common/constants";
import { TelegramMessageResponse } from "../models/TelegramMessageResponse";
import { apiClient } from "../services/client";

interface RequestBody<T> extends Request {
  body: T;
}

const hppMockUrl =
  "https://checkout.t7r.dev/payments-mock#payment_id=123&resource_token=123456&return_uri=https://penny.t7r.dev/redirect";

const sendMessage = async (chatId: number, message: string) => {
  await apiClient.post(`${Constants.TelegramAPI}/sendMessage`, {
    chat_id: chatId,
    parse_mode: "HTML",
    text: message,
  });
};

export const botMiddleware = async (
  req: RequestBody<TelegramMessageResponse>,
  _res: Response,
  _next: NextFunction
) => {
  _next();
  const chatId = req.body.message.chat.id;
  const message = req.body.message.text.toLocaleLowerCase();
  console.log(chatId, message);

  if (message === "/start") {
    await sendMessage(
      chatId,
      `Hey 👋🏼\nWelcome to the TrueLayer Bot!\n\nUse "help" for more information.`
    );
    return;
  }

  if (message === "help") {
    await sendMessage(
      chatId,
      `Hey 👋🏼\nDo you need some help? Don't worry.\n\nHere are some commands you can use:\n- pay £200`
    );
    return;
  }

  if (/pay\s?[$£]\d*[\.]?\d{2}/.test(message)) {
    const ammount = message.match(/[$£]\d*[\.]?\d{2}/);
    await sendMessage(
      chatId,
      `Understood.🤑\nInitialising payment...\n- Amount: ${ammount}`
    );
    setTimeout(async () => {
      await sendMessage(
        chatId,
        `💸 Payment initialised, please click on the link bellow to authorize your payment.\n\n<a href="${hppMockUrl}">Authorize</a>`
      );
    }, 2000);
    return;
  }

  await sendMessage(
    chatId,
    `Sorry I didn't get that. I'm still learning... 😞\n\nHere are some commands you can use:\n- help\n- pay £200`
  );
};

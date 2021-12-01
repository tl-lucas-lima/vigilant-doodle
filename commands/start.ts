import { sendMessage } from "../common/sendMessage";

export async function start(chatId: number) {
  await sendMessage(
    chatId,
    `Hey👋🏼 \nWelcome to the TrueLayer Bot!\nUse /help for more information.`
  );
}

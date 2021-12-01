import { sendMessage } from "../common/sendMessage";

export async function help(chatId: number) {
  await sendMessage(
    chatId,
    `Hey 👋🏼\nDo you need some help? Don't worry.\n\nHere are some commands you can use:\n /topup`
  );
}

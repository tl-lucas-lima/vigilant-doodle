import { sendMessage } from "../common/sendMessage";

export async function fallback(chatId: number) {
  await sendMessage(
    chatId,
    `Sorry I didn't get that. I'm still learning... 😞\n\nHere are some commands you can use:\n- help\n- pay £200`
  );
}
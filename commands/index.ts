import { fallback } from "./fallback";
import { help } from "./help";
import { start } from "./start";
import { topup } from "./topup";

export function commands(chatId: number, message: string) {
  switch (message) {
    case "/start":
      return start(chatId);
    case "/help":
      return help(chatId);
    case "/topup":
      return topup(chatId);
    default:
      return fallback(chatId);
  }
}

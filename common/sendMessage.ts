import { apiClient } from "../services/client";

export async function sendMessage(chatId: number, message: string) {
  return await apiClient.post(`/sendMessage`, {
    chat_id: chatId,
    parse_mode: "HTML",
    text: message,
  });
}

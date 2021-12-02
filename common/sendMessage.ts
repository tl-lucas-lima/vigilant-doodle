import { apiClient } from "../services/client";

export async function sendMessage(chatId: number, message: string) {
  return await apiClient.post(`/sendMessage`, {
    chat_id: chatId,
    parse_mode: "HTML",
    text: message,
  });
}

export async function sendWanker(chatId: number) {
  return await apiClient.post("/sendVideo", {
    chat_id: chatId,
    video: 'https://github.com/tl-lucas-lima/vigilant-doodle/blob/master/Image%20from%20iOS.mp4?raw=true'
  });
}

export async function sendFail(chatId: number) {
  return await apiClient.post("/sendVideo", {
    chat_id: chatId,
    video: 'https://github.com/tl-lucas-lima/vigilant-doodle/blob/master/failed.mp4?raw=true'
  });
}

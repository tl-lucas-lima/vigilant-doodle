import dotenv from "dotenv";

dotenv.config();

const { TELEGRAM_BOT_TOKEN, PORT } = process.env;

export class Constants {
  public static TelegramBotToken: string = TELEGRAM_BOT_TOKEN || "";
  public static TelegramAPI: string = `https://api.telegram.org/bot${this.TelegramBotToken}`;
  public static Port: number = Number(PORT) || 5000;
  public static WebhookURI: string = `/webhook/${this.TelegramBotToken}`;
}

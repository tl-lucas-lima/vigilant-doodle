import dotenv from "dotenv";

dotenv.config();

const { TELEGRAM_BOT_TOKEN, PORT } = process.env;

export class Constants {
  public static TelegramBotToken: string = TELEGRAM_BOT_TOKEN || "";
  public static TelegramAPI: string = `https://api.telegram.org/bot${this.TelegramBotToken}`;
  public static Port: number = Number(PORT) || 5000;
  public static WebhookURI: string = `/webhook/${this.TelegramBotToken}`;
  public static demoUsers = [
    {
      username: "csuryapandian",
      account_number: "64498298",
      sort_code: "040075",
    },
    {
      username: "lucastlima86",
      account_number: "10220690",
      sort_code: "040004",
    },
    {
      username: "aarti_p",
      account_number: "57230060",
      sort_code: "309664",
    },
    {
      username: "kieranallen",
      account_number: "49633293",
      sort_code: "040004",
    },
    {
      username: "carojohn24",
      account_number: "11616258",
      sort_code: "040004",
    },
  ];
}

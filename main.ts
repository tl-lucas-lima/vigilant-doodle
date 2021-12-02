import express from "express";
import { Constants } from "./common/constants";
import { botMiddleware } from "./middleware/botMiddleware";
import { apiClient } from "./services/client";
import { createClient } from "redis";

const app = express();

export const client = createClient();

const { Port, TelegramAPI, WebhookURI } = Constants;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const botConnect = async (serverUrl: string) => {
  try {
    const res = await apiClient.get(
      `${TelegramAPI}/setWebhook?url=${serverUrl + WebhookURI}`
    );
    console.log(res.data);
  } catch (error) {
    console.log(error);
  }
};

const init = async () => {
  try {
    
    let serverUrl = "https://truelayer-bot.herokuapp.com";
    console.log(`Webhook URI generated: ${serverUrl}`);

    app.get("/", (req, res) => {
      res.send("👋🏼 Hello from the TrueLayer_Bot");
    });

    await client.connect();
    app.post(WebhookURI, botMiddleware, async (_req, res) => {
      return res.send().status(200);
    });

    app.listen(Port, async () => {
      console.log(
        `⚡️[server]: Server is running at https://localhost:${Port}`
      );
      await botConnect(serverUrl);
    });
  } catch (error) {
    throw new Error("Failed to initialise ngrok.");
  }
};

init();

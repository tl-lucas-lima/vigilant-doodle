import { Request } from "express";
import {
  TelegramMessageResponse,
} from "../models/TelegramMessageResponse";
import { deets } from "./deets";
import { fallback } from "./fallback";
import { help } from "./help";
import { register } from "./register";
import { pay } from "./pay";
import { start } from "./start";
import { topup } from "./topup";

export interface RequestBody<T> extends Request {
  body: T;
}

export async function commands(req: RequestBody<TelegramMessageResponse>) {
  const message = req.body.message.text.toLocaleLowerCase();

  if (/^[\/]?pay\s£\d+[\.]?\d{2}\sto\s@\w+$/g.test(message)) {
    return pay(req);
  }

  switch (message) {
    case "/start":
      return start(req);
    case "/help":
      return help(req);
    case "/topup":
      return topup(req);
    case "/register":
      return register(req);
    case "/details":
      return deets(req)
    default:
      return fallback(req);
  }
}

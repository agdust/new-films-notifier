import dotenv from "dotenv";

import { sendMessage } from "../src/telegram.js";

dotenv.config();

export function sendErrorNotificationToMe(error) {
  sendMessage(
    { id: process.env.MY_TELEGRAM_ID },
    `С днём ошибки!\n\n${error.message || error}`
  )
}


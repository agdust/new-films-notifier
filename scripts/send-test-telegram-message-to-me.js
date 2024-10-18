import dotenv from "dotenv";

import { buildTelegramNotifyMessage, sendMessage } from "../src/telegram.js";

dotenv.config();

await sendMessage(
  { id: process.env.MY_TELEGRAM_ID },
  buildTelegramNotifyMessage({
    imageUrl: "https://zaotdih.ru/media/cms_settings/zastavka-zaotdih-fon.jpg",
    name: "Тестовое имя",
    url: "https://zaotdih.ru/voronezh/afisha/231306/"
  })
)

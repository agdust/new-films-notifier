import dotenv from "dotenv";

import { logger } from "./log.js";
import { storage } from "./storage.js";

dotenv.config();
const token = process.env.TELEGRAM_TOKEN;

if (!token) {
  console.error("[ERROR] missing telegram token, add it to .env file");
  throw new Error("[ERROR] missing telegram token, add it to .env file");
}

function buildApiUrl(comand, parameters = null) {
  const search = parameters ? `?${new URLSearchParams(parameters)}` : "";

  return `https://api.telegram.org/bot${token}/${comand}${search}`;
}

async function getUpdates(lastHandledTelegramUpdateId) {
  const response = await fetch(buildApiUrl("getUpdates", lastHandledTelegramUpdateId ? {
    offset: lastHandledTelegramUpdateId + 1,
  } : undefined));

  const json = await response.json();

  return json.ok ? json.result : null;
}

function addUsersFromUpdateBatch(lastUpdates) {
  lastUpdates
    .filter((update) => update.message)
    .map((update) => update.message.from)
    .forEach((newUser) => {
      if (newUser.id in storage.users) { return; }
      storage.users[newUser.id] = newUser;
      logger.info(`New User. ${newUser.id} @${newUser.username}`);
    })
}

export function sendMessage(user, text) {
  return fetch(buildApiUrl("sendMessage", {
    chat_id: user.id,
    text,
  }));
}

export async function handleAllNewUpdates() {
  let { lastHandledTelegramUpdateId } = storage;

  for (; ;) {
    // eslint-disable-next-line no-await-in-loop
    const lastUpdates = await getUpdates(lastHandledTelegramUpdateId);
    if (!lastUpdates) { break; }

    addUsersFromUpdateBatch(lastUpdates);

    if (lastUpdates.length > 0) {
      lastHandledTelegramUpdateId = lastUpdates.at(-1).update_id;
    } else {
      break;
    }
  }

  // eslint-disable-next-line require-atomic-updates
  storage.lastHandledTelegramUpdateId = lastHandledTelegramUpdateId;
}




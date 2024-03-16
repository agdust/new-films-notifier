import { crawlCurrentFilms } from "../src/crawl.js"
import { logger } from "../src/log.js";
import { getLastSavedFilms, saveFilmsToFile, storage } from "../src/storage.js";
import { sendMessage } from "../src/telegram.js"

logger.info("-- Start crawl-and-notify --")

const currentFilms = await crawlCurrentFilms();

const lastSavedFilms = getLastSavedFilms();

saveFilmsToFile(currentFilms);

if (!lastSavedFilms) {
  logger.info("No previous film save file found")

  throw new Error("No previous film save file found")
}

const newFilms = [];

for (const filmName in currentFilms) {
  if (!(filmName in lastSavedFilms)) {
    newFilms.push(currentFilms[filmName]);
  }
}

if (newFilms.length === 0) {
  logger.info("No new films today")

  throw new Error("No new films today")
}

function buildTelegramMessage(film) {
  return `${film.name}\n\n${film.imageUrl}\n\n${film.url}`
}

const messagePromises = [];

for (const user of Object.values(storage.users)) {
  for (const film of newFilms) {
    messagePromises.push(
      sendMessage(user, buildTelegramMessage(film))
    )
  }
}

await Promise.all(messagePromises);

// -----------------------

logger.info("-- Finish crawl-and-notify -- ᕦ( ͡° ͜ʖ ͡°)ᕤ")

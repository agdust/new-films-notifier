import { crawlCurrentFilms } from "../src/crawl.js"
import { logger } from "../src/log.js";
import { getLastSavedFilms, saveFilmsToFile, storage } from "../src/storage.js";
import { buildTelegramNotifyMessage, sendMessage } from "../src/telegram.js"

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

logger.info(`${Object.keys(currentFilms).length} films today in total`)
logger.info(`${newFilms.length} new films`)

const messagePromises = [];
const usersArray = Object.values(storage.users);

for (const film of newFilms) {
  logger.info(`send notification about new film: "${film}"`)
  for (const user of usersArray) {
    messagePromises.push(
      sendMessage(user, buildTelegramNotifyMessage(film))
    )
  }
}

await Promise.all(messagePromises);

logger.info(`sent notification to ${usersArray.length} users`)

// -----------------------

logger.info("-- Finish crawl-and-notify -- ᕦ( ͡° ͜ʖ ͡°)ᕤ")

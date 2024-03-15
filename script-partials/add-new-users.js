import { logger } from "../src/log.js";
import { storage, writeToStorage } from "../src/storage.js"
import { handleAllNewUpdates } from "../src/telegram.js";

logger.info("-- Start add-new-users --")

await handleAllNewUpdates()

writeToStorage(storage);

logger.info("-- Finish add-new-users --")

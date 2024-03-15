import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

import {
  filmsFolderPath,
  logFilePath,
  projectFolderPath,
  storageFilePath
} from "../src/path.js";

const storageDefaultState = {
  lastHandledTelegramUpdateId: null,
  users: {},
}

function mkdirIfNotExist(fodlerPath) {
  if (!existsSync(fodlerPath)) {
    mkdirSync(fodlerPath, { recursive: true });
  }
}


mkdirIfNotExist(projectFolderPath)
mkdirIfNotExist(filmsFolderPath)

if (!existsSync(storageFilePath)) {
  mkdirIfNotExist(dirname(storageFilePath))
  writeFileSync(storageFilePath, JSON.stringify(storageDefaultState, null, 2), "utf8");
}

if (!existsSync(logFilePath)) {
  writeFileSync(logFilePath, "", "utf8");
}

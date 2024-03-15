import { join } from "node:path";

import dotenv from "dotenv";

dotenv.config();

if (!process.env.PROJECT_FOLDER) {
  console.error("[ERROR] specify PROJECT_FOLDER key in .env file");
  throw new Error("[ERROR] specify PROJECT_FOLDER key in .env file");
}

export const projectFolderPath = process.env.PROJECT_FOLDER;
export const resultsFolderPath = join(projectFolderPath, "results")
export const storageFilePath = join(projectFolderPath, "storage.json")
export const logFilePath = join(projectFolderPath, "new-films-notifier.log")

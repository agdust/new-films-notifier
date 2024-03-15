import { readdirSync, readFileSync, writeFileSync } from "node:fs"
import * as path from "node:path"

import dotenv from "dotenv";

import { storageFilePath } from "./path.js";

dotenv.config()

function dateToIsoDate(date) {
  return date.toISOString().split("T")[0];
}
function buildResultFileName(isoDate) {
  return `${isoDate}_films_voronezh.json`;
}

const yesterday = new Date();
yesterday.setDate(yesterday.getDate() - 1);

const todayResultFileName = buildResultFileName(dateToIsoDate(new Date()));

function readStorage() {
  return JSON.parse(readFileSync(storageFilePath, "utf8"));
}

export function writeToStorage(data) {
  writeFileSync(storageFilePath, JSON.stringify(data, null, 2), "utf8");
}

export function saveFilmsToFile(films) {
  writeFileSync(
    path.join(process.env.PROJECT_FOLDER, "films", todayResultFileName),
    JSON.stringify(films, null, "\t"),
    "utf8",
  );
}

export function getLastSavedFilms() {
  const resultFiles = readdirSync(path.join(process.env.PROJECT_FOLDER, "films"), { withFileTypes: true });
  if (resultFiles.length === 0) { return null; }

  resultFiles.sort((fileA, fileB) => fileA.name.localeCompare(fileB.name));

  const lastFile = resultFiles.at(-1);
  const lastFilePath = path.join(lastFile.path, lastFile.name);

  return JSON.parse(readFileSync(lastFilePath, "utf8"));
}

export const storage = readStorage();

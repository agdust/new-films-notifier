import winston from "winston"

import { logFilePath } from "./path.js"

const myFormat = winston.format.printf(({ level, message, timestamp }) => {
  return `${timestamp} [${level}]: ${message}`
})

export const logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.timestamp(),
    myFormat
  ),

  transports: [
    new winston.transports.Console(),
    new winston.transports.File({
      filename: logFilePath,
    })
  ]
})

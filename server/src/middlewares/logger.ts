import morgan from "morgan";
import { createLogger, transports, format } from "winston";

export const loggerMiddleware = morgan(
  "Request Method: :method, Request URL: :url, Response Status :status,  Response Time: :response-time ms"
);

export const logger = createLogger({
  transports: [
    new transports.File({
      filename: "logs/error.log",
      level: "error",
      format: format.combine(format.timestamp(), format.json()),
    }),
    new transports.File({
      filename: "logs/info.log",
      level: "info",
      format: format.combine(format.timestamp(), format.json()),
    }),
  ],
});

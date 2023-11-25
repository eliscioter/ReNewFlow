import cors, { CorsOptions } from "cors";
import { config } from "dotenv";
import { logger } from "./logger";

config();

if(!process.env.CLIENT_ORIGIN) {
  logger.error("CLIENT_ORIGIN is not defined");
  throw new Error("CLIENT_ORIGIN is not defined");
}

const cors_options: CorsOptions = {
  credentials: true,
  optionsSuccessStatus: 200,
  origin: process.env.CLIENT_ORIGIN,
};

export const corsMiddleware = cors(cors_options);

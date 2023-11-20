import { config } from "dotenv";
import express, { Application, urlencoded } from "express";
import { corsMiddleware } from "./middlewares/cors";
import { loggerMiddleware } from "./middlewares/logger";
import { errorMiddleware } from "./middlewares/error";

config();

const { CLIENT_ORIGIN, PORT_NO } = process.env;

const app: Application = express();

if (!CLIENT_ORIGIN) {
  console.log("CLIENT_ORIGIN is not set");
}

app.use(loggerMiddleware);

app.use(express.json());

app.use(urlencoded({ extended: true }));

app.use(corsMiddleware);

app.use(errorMiddleware);

app.listen(PORT_NO || 5000, () =>
  console.log(`Server is running on port ${PORT_NO || 5000}`)
);

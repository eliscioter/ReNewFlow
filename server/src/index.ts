import { config } from "dotenv";
import express, { Application, urlencoded } from "express";
import { corsMiddleware } from "./middlewares/cors";
import { errorMiddleware } from "./middlewares/error";
import { logger, loggerMiddleware } from "./middlewares/logger";
import { registerRouter } from "./routers/register-router";
import { demographicsRouter } from "./routers/demographics-router";
import { userRouter } from "./routers/user-router";

config();

const { CLIENT_ORIGIN, NODE_ENV, PORT_NO } = process.env;

const app: Application = express();

if (!CLIENT_ORIGIN) {
  logger.log("error", "Client Origin is not defined");
  throw new Error("Client Origin is not defined");
}

if (NODE_ENV === "development") {
  app.use(loggerMiddleware);
}

app.use(express.json());

app.use(urlencoded({ extended: true }));

app.use(corsMiddleware);

app.use("/api/register", registerRouter);
app.use("/api/demographics", demographicsRouter);
app.use("/api/user", userRouter)

app.use(errorMiddleware);

app.listen(PORT_NO || 5000, () => console.log(`Connection Established`));

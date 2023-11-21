import { config } from "dotenv";
import express, { Application, urlencoded } from "express";
import { corsMiddleware } from "./middlewares/cors";
import { loggerMiddleware } from "./middlewares/logger";
import { errorMiddleware } from "./middlewares/error";
import { renewalRouter } from "./routers/renewal-router";
import { registerRouter } from "./routers/register-router";

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

app.use("/api/renew", renewalRouter);
app.use("/api/register", registerRouter);

app.use(errorMiddleware);

app.listen(PORT_NO || 5000, () => console.log(`Connection Established`));

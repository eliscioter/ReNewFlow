import cors, { CorsOptions } from "cors";

const cors_options: CorsOptions = {
    credentials: true,
    origin: process.env.CLIENT_ORIGIN
}

export const corsMiddleware = cors(cors_options);
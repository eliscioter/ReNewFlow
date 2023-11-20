import morgan from "morgan";

export const loggerMiddleware = morgan(
  "Request Method: :method, Request URL: :url, Response Status :status,  Response Time: :response-time ms"
);

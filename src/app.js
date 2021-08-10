import express from "express";
import config from "./config";
import morgan from "morgan";
import cors from "cors";
import router from "./router";
import * as bodyParser from "body-parser";
const app = express();

// App Settings
app.set("port", config.APP.PORT);

// Middlewares
if (process.env.NODE_ENV == "development") {
  app.use(morgan("dev"));
}
app.use(cors());

app.use(bodyParser.json({ limit: "50mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000,
  })
);

// Router
app.use(`/api/v${config.APP.API_VERSION}`, router);

export default app;

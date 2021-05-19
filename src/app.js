import express from "express";
import config from "./config";
import morgan from "morgan";
import cors from "cors";
import router from "./router";
const app = express();

// App Settings
app.set("port", config.APP.PORT);

// Middlewares
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

// Router
app.use(`/api/v${config.APP.API_VERSION}`, router);

export default app;

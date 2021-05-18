import express from "express";
import config from "./config";
const app = express();

// App Settings
app.set("port", config.PORT);

export default app;

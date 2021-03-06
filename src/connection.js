import mongoose from "mongoose";
import config from "./config";
import chalk from "chalk";

// URL TO CONECT WITH MONGODB
let connectionUrl;
if (process.env.NODE_ENV == "development") {
  connectionUrl = `${config.DB.PROTOCOL}://${config.DB.HOST}:${config.DB.PORT}/${config.DB.NAME}`;
} else {
  connectionUrl = config.DB.URL;
}
const conn = mongoose
  .connect(connectionUrl, {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((db) => console.log(chalk.greenBright("DB is conected")))
  .catch((err) => console.log(err));

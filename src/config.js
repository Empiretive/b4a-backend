import dotenv from "dotenv";
import path from "path";
import chalk from "chalk";
console.log(chalk.red(process.env.NODE_ENV));

// Enviroments Config
if (process.env.NODE_ENV == "development") {
  dotenv.config({
    path: path.resolve("", process.env.NODE_ENV + ".env"),
  });
}

const config = {
  APP: {
    HOST: process.env.HOST || "0.0.0.0",
    PORT: process.env.PORT || 5050,
    API_VERSION: process.env.API_VERSION || 1,
    LINK: process.env.APP_LINK || "http://localhost:4200",
  },
  DB: {
    URL: process.env.DB_URL ? process.env.DB_URL : null,
    PROTOCOL: process.env.DB_PROTOCOL,
    NAME: process.env.DB_NAME,
    USER: process.env.DB_USER,
    PASS: process.env.DB_PASSWORD,
    HOST: process.env.DB_HOST,
    PORT: process.env.DB_PORT,
  },
  CRYPT: {
    SALT_ROUND: parseInt(process.env.SALT_ROUND) || 10,
  },
  MAIL: {
    HOST: process.env.MAIL_HOST,
    PORT: process.env.MAIL_PORT,
    USER: process.env.MAIL_USER,
    PASS: process.env.MAIL_PASS,
    FROM: process.env.MAIL_FROM,
    SECURE: process.env.MAIL_SECURE,
  },
  JWT: {
    SECRET: process.env.JWT_SECRET,
    EXPIRE_IN: process.env.JWT_EXPIRE_IN,
  },
};

export default config;

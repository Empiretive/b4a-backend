import dotenv from "dotenv";
import path from "path";
console.log(path.resolve("", process.env.NODE_ENV + ".env"));
dotenv.config({
  path: path.resolve("", process.env.NODE_ENV + ".env"),
});

const config = {
  APP: { PORT: process.env.PORT || 5050 },
  DB: {
    URL: process.env.DB_URL ? process.env.DB_URL : null,
    PROTOCOL: process.env.DB_PROTOCOL,
    NAME: process.env.DB_NAME,
    USER: process.env.DB_USER,
    PASS: process.env.DB_PASSWORD,
    HOST: process.env.DB_HOST,
    PORT: process.env.DB_PORT,
  },
};

export default config;

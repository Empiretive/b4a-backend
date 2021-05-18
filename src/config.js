import dotenv from "dotenv";
import path from "path";
console.log(path.resolve("", process.env.NODE_ENV + ".env"));
dotenv.config({
  path: path.resolve("", process.env.NODE_ENV + ".env"),
});

const config = {
  PORT: process.env.PORT || 5050,
};

export default config;

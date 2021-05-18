import chalk from "chalk";
import "./connection";
import app from "./app";

app.listen(app.get("port"), () => {
  console.log(
    chalk.yellowBright(`Server listening on port ${app.get("port")}`)
  );
});

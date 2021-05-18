import app from "./app";
import chalk from "chalk";

app.listen(app.get("port"), () => {
  console.log(
    chalk.yellowBright(`Server listening on port ${app.get("port")}`)
  );
});

import chalk from "chalk";
import "./connection";
import app from "./app";

// Start Server
app.listen(app.get("port"), () => {
  console.log(chalk.blueBright(`Server listening on port ${app.get("port")}`));
});

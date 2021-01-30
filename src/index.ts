import express from "express";
import logger from "./logger";
import router from "./routes";
import { config } from "dotenv"

config()

const app = express();
const port = process.env.PORT || 9010;

app.use((_, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next()
})

app.use("/", router);

app.listen(port, () => {
  logger.info(`server listening on port ${port}`);
});

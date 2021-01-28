import express from "express";
import logger from "./logger";
import router from "./routes";

const app = express();
const port = process.env.PORT || 9010;

app.use("/", router);

app.listen(port, () => {
  logger.info(`server listening on port ${port}`);
});

import { Request, Response, Router } from "express";
import axios from "axios";
import logger from "../logger";
import S3 from "aws-sdk/clients/s3";

const router = Router();
const s3 = new S3({ region: "us-west-2" });

const getBucketData = async () => {
  const params = { Bucket: "smithsonian-open-access" };

  try {
    s3.listObjectsV2(params, (err, data) => {
      if (err) throw err;

      return data;
    });
  } catch (err) {
    logger.error(err);
  }
};

const getData = async (params: object | URLSearchParams) => {
  logger.info(process.env);
  try {
    const response = await axios.get(
      "https://api.si.edu/openaccess/api/v1.0/search",
      { params }
    );

    return response.data;
  } catch (err) {
    logger.error(err);
  }
};

router.get("/images", async (req: Request, res: Response) => {
  logger.info(process.env.API_KEY);
  logger.info(req.query);

  const data = await getData({
    api_key: process.env.API_KEY,
    q: req.query.q,
  });

  res.send(data);
});

router.get("/bucket", async (_, res) => {
  const data = await getBucketData();

  res.send(data);
});

router.get("/", (_: Request, res: Response) => {
  res.send("Service is healthy on /");
});

router.get("*", (_: Request, res: Response) => {
  res.send("Service is healthy");
});

export default router;

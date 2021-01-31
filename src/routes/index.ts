import { Request, Response, Router } from "express";
import axios from "axios";
import logger from "../logger";

const router = Router();

const getData = async (params: object | URLSearchParams) => {
  try {
    const response = await axios.get("https://api.si.edu/openaccess/api/v1.0/search", { params })

    return response.data
  } catch (err) {
    logger.error(err)
  }
}

router.get("/images", async (req: Request, res: Response) => {
  logger.info(process.env.API_KEY)
  logger.info(req.query)

  const data = await getData({
    api_key: process.env.API_KEY,
    q: req.query.q
  })

  res.send(data)
})

router.get("/", (_: Request, res: Response) => {
  res.send("Service is healthy on /");
});

router.get("*", (_: Request, res: Response) => {
  res.send("Service is healthy");
});

export default router;

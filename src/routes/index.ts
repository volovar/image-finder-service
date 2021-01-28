import { Request, Response, Router } from "express";

const router = Router();

router.get("/", (_: Request, res: Response) => {
  res.send("Service is healthy on /");
});

router.get("*", (_: Request, res: Response) => {
  res.send("Service is healthy");
});

export default router;

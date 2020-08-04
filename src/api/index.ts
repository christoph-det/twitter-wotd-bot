import { Request, Response, Router } from "express";
/**
 * Specifies the API Endpoints
 */

const postingEP = require("./postingEP");
const datacollectionEP = require("./datacollectionEP");

const router = Router();

router.get("/", (req: Request, res: Response) => {
  res.json({
    message: "API - Default",
  });
});

router.use("/postwotd", postingEP);
router.use("/collectdata", datacollectionEP);

module.exports = router;

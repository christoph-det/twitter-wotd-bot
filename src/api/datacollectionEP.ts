import { Request, Response, Router } from "express";
import TwitterHelper from "../TwitterHelper";
import DbHelper from "../DbHelper";
require("dotenv").config();
const rateLimit = require("express-rate-limit");

/**
 * Implements the twitter trends update endpoint.
 */

const router = Router();

const limiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 60 minutes
  max: 5, // limit each IP to 3 requests per windowMs
});

router.post("/", limiter, (req: Request, res: Response) => {
  console.log("updating data from twiiter trends...");
  if (req.body.auth !== process.env.BOTAPI_AUTH_TOKEN) {
    console.log("Unauthorised access to datacollection EP.");
    res.status(403);
    res.json({ message: "You are not authenticated!" });
  } else {
    const twitterHelper = new TwitterHelper();
    const dbhelper = new DbHelper();
    twitterHelper.getTrendingHashtags().then((data: any) => {
      dbhelper.saveHashtags(data);
      res.json({ message: "Trends updated successfully" });
    });
  }
});

module.exports = router;

import { Request, Response, Router } from "express";
import TwitterHelper from "../TwitterHelper";
import DbHelper from "../DbHelper";
require("dotenv").config();
const rateLimit = require("express-rate-limit");
/**
 * Implements the posting endpoint.
 */

const router = Router();
const limiter = rateLimit({
  windowMs: 10 * 60 * 60 * 1000, // 1 hours
  max: 3, // limit each IP to 3 requests per windowMs
});

router.post("/", limiter, (req: Request, res: Response) => {
  console.log("posting wotd to twitter...");
  if (req.body.auth !== process.env.BOTAPI_AUTH_TOKEN) {
    console.log("Unauthorised access to posting EP.");
    res.status(403);
    res.json({ message: "You are not authenticated!" });
  } else {
    const twitterHelper = new TwitterHelper();
    const dbhelper = new DbHelper();
    dbhelper.getWOTD().then((wotd: string) => {
      twitterHelper.postTweet(wotd);
    });
    res.json({ message: "Posted to Twitter!" });
  }
});

module.exports = router;

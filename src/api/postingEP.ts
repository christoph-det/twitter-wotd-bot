import { Request, Response, Router } from "express";
import TwitterHelper from "../TwitterHelper";
import DbHelper from "../DbHelper";
/**
 * Implements the 'cool' endpoint.
 */

const router = Router();

router.get("/", (req: Request, res: Response) => {
  //TODO: auth
  //TODO: get wotd from DB + clear DB
  const twitterHelper = new TwitterHelper();
  const dbhelper = new DbHelper();
  dbhelper.getWOTD().then((wotd: string) => {
    twitterHelper.postTweet(wotd);
  });
  res.json("Posted to Twitter!");
});

module.exports = router;

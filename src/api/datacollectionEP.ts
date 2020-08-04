import { Request, Response, Router } from "express";
import TwitterHelper from "../TwitterHelper";
import DbHelper from "../DbHelper";
/**
 * Implements the 'cool' endpoint.
 */

const router = Router();

router.get("/", (req: Request, res: Response) => {
  //TODO: auth
  const twitterHelper = new TwitterHelper();
  const dbhelper = new DbHelper();
  const trends = twitterHelper.getTrendingHashtags().then((data: any) => {
    dbhelper.saveHashtags(data);
  });
  res.json("OK");
});

module.exports = router;

const https = require("https");
const Twit = require("twit");
require("dotenv").config();
const config = {
  twitter: {
    consumer_key: process.env.CONSUMER_KEY,
    consumer_secret: process.env.CONSUMER_SECRET,
    access_token: process.env.ACCESS_TOKEN,
    access_token_secret: process.env.ACCESS_TOKEN_SECRET,
  },
};
const TwitterClient = new Twit(config.twitter);

export default class TwitterHelper {
  postTweet(daten: string) {
    TwitterClient.post(
      "statuses/update",
      { status: "🇦🇹 Das heutige Word des Tages ist: #" + daten + "." },
      function (err: any, data: any, response: any) {
        if (err) {
          console.log("An error occured during posting to Twitter: ", err);
        }
      }
    );
  }

  getTrendingHashtags() {
    return new Promise((resolve, reject) => {
      TwitterClient.get("trends/place", { id: "551801" }, function (
        err: any,
        data: any,
        response: any
      ) {
        if (err) {
          console.log(
            "An error occured during getting data from Twitter: ",
            err
          );
          return reject(err);
        } else {
          return resolve(data[0].trends);
        }
      });
    });
  }
}

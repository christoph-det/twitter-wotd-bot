const monk = require("monk");
require("dotenv").config();

export default class DbHelper {
  private database: any;
  private dbtable: any;

  constructor() {
    this.database = monk(process.env.MONGODB_URI);
    this.dbtable = this.database.get("twitter-wotd");
    this.dbtable.createIndex({ name: 1 }, { unique: true });
  }

  saveHashtags(trends: any) {
    trends.forEach(async (trend: any) => {
      const name = trend.name;
      let counter = 0;
      const isinDB: any = await this.dbtable.findOne({ name: name });
      if (isinDB) {
        counter = isinDB.counter + 1;
        this.dbtable.update({ name: name }, { $set: { counter: counter } });
      } else {
        console.log("Created new entry");
        const newEntry = {
          name,
          counter,
        };
        const created = await this.dbtable.insert(newEntry);
      }
    });
  }

  getWOTD(): Promise<string> {
    return new Promise((resolve) => {
      this.dbtable.find({}).then((docs: any) => {
        console.log(docs);
        let maxIdx = 0;
        for (let i = 0; i < docs.length; ++i) {
          if (docs[i].counter > docs[maxIdx].counter) {
            maxIdx = i;
          }
        }
        console.log(docs[maxIdx]);
        return resolve(docs[maxIdx].name);
      });
    });

    //check if it was WOTD already (find new one if nedded)
    //add to WOTD DB
    //clear stats DB
  }
}

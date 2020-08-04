const monk = require("monk");
require("dotenv").config();

export default class DbHelper {
  private database: any;
  private hashtagstatTable: any;
  private prevwotdTable: any;

  constructor() {
    this.database = monk(process.env.MONGODB_URI);

    this.hashtagstatTable = this.database.get("hashtags-today");
    this.hashtagstatTable.createIndex({ name: 1 }, { unique: true });
    this.prevwotdTable = this.database.get("prev-wotds");
    this.prevwotdTable.createIndex({ name: 1 }, { unique: true });
  }

  public saveHashtags(trends: any) {
    trends.forEach(async (trend: any) => {
      const original_name = trend.name.replace("#", "").replace(" ", "");
      const name = trend.name.replace("#", "").replace(" ", "").toLowerCase();
      let counter = 0;
      const isinDB: any = await this.hashtagstatTable.findOne({ name: name });
      if (isinDB) {
        counter = isinDB.counter + 1;
        this.hashtagstatTable.update(
          { name: name },
          { $set: { counter: counter } }
        );
      } else {
        const newEntry = {
          name,
          original_name,
          counter,
        };
        this.hashtagstatTable.insert(newEntry);
      }
    });
  }

  public getWOTD(): Promise<string> {
    return new Promise((resolve, reject) => {
      this.hashtagstatTable.find({}).then(async (docs: any) => {
        let maxIdx = -1;
        let wasalreadyWotd = false;
        if (docs.length == 0)
          return reject("Hashtags are empty. Collect data first!");
        do {
          maxIdx += 1;
          for (let i = maxIdx; i < docs.length; ++i) {
            if (docs[i].counter > docs[maxIdx].counter) {
              maxIdx = i;
            }
          }
          wasalreadyWotd = await this.prevwotdTable.findOne({
            name: docs[maxIdx].name,
          });
        } while (wasalreadyWotd);
        const date = new Date();
        const dateString = date.toISOString().slice(0, 10);
        const original_name = docs[maxIdx].original_name;
        const name = docs[maxIdx].name;
        const newWOTD = {
          name,
          original_name,
          dateString,
        };
        this.prevwotdTable.insert(newWOTD);
        this.hashtagstatTable.drop();
        return resolve(original_name);
      });
    });
  }
}

/**
 * Main file of th application.
 */
const pino = require("pino");

const log = pino({ level: "info" });
const app = require("./app");

const port = process.env.PORT || 5000;
const listener = app.listen(port, () => {
  console.log("Your bot is running on port " + listener.address().port);
});

import express from "express";
import DbHelper from "./DbHelper";

/**
 * Application setup.
 */
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");

require("dotenv").config();

const middlewares = require("./middlewares");
const api = require("./api");

const app = express();

app.use(morgan("dev"));
app.use(helmet());
app.use(cors());
app.use(express.json());
app.set("trust proxy", 1);
// static serve:
// app.use(express.static('./public'));

app.get("/", (req, res) => {
  res.json({
    message: "Default Endpoint",
  });
});

app.use("/api/v1", api);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = app;

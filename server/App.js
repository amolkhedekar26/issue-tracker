const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const createError = require("http-errors");
const cors = require("cors");

const IssueModel = require("./repo/issue.repo");
const { handleErrorResponse } = require("./utils/response");
const IssueRouter = require("./routes/issue.router");

class App {
  constructor() {
    this.app = express();

    this.configureEnv();
    this.setUpLogger();
    this.setupDB();
    this.setUpMiddlewares();
    this.setupRoutes();
    this.addErrorHandler();
  }

  configureEnv() {
    dotenv.config();
  }

  setUpLogger() {
    this.app.use(morgan("dev"));
  }

  setupDB() {}

  setUpMiddlewares() {
    this.app.use(express.json());
    this.app.use(
      express.urlencoded({
        extended: true,
      })
    );

    this.app.use(cors());
  }

  setupRoutes() {
    this.app.use("/api/v1/issues", require("./routes/issue.router"));
  }

  addErrorHandler() {
    this.app.use(async (req, res, next) => {
      next(new createError.NotFound("This endpoint does not exist"));
    });

    this.app.use((err, req, res, next) => {
      res.status(err.status || 500);
      handleErrorResponse(res, err);
    });
  }

  startServer() {
    this.PORT = process.env.PORT || 3000;
    if (process.env.NODE_ENV === "test") {
      this.PORT = process.env.TEST_PORT || 3001;
    }

    this.app.listen(this.PORT || 3000, () => {
      console.log("----------------------------------------------------------");
      console.log(`The Server started at http://localhost:${this.PORT}`);
      console.log("----------------------------------------------------------");
    });
  }
}

module.exports = App;

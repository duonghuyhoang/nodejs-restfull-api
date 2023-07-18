const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const path = require("path");
const dotenv = require("dotenv");
const rfs = require("rotating-file-stream");
const bodyParser = require("body-parser");

const apiRouter = require("./src/routes/router");

dotenv.config();

const port = process.env.PORT || 3001;
const isProduction = process.env.NODE_ENV === "production";
const app = express();

app.use(helmet());

const accessLogStream = rfs.createStream("access.log", {
  interval: "1d",
  path: path.join(__dirname, "logs"),
});
app.use(
  isProduction
    ? morgan("combined", { stream: accessLogStream })
    : morgan("tiny")
);
app.use(cors());
app.use(express.json());

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use("/api", apiRouter);
app.get("/", (req, res) => {
  res.json({
    message: "Hello, world!!",
  });
});

app.listen(port, () => {
  console.log("listening on port: " + port);
});

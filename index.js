const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const path = require("path");
const dotenv = require("dotenv");
const rfs = require("rotating-file-stream");
const bodyParser = require("body-parser");
const db = require("./src/configs/db.config");
const NodeCache = require("node-cache");

const apiRouter = require("./src/routes/router");

db.connection();

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

const corsOptions = {
  origin: "*",
};
app.use(cors(corsOptions));
app.use(express.json());

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

const cache = new NodeCache();

// app.use((req, res, next) => {
//   const key = "__express__" + req.originalUrl || req.url;
//   const cachedData = cache.get(key);
//   if (cachedData) {
//     return res.json(cachedData); // Gửi dữ liệu từ cache nếu tồn tại
//   } else {
//     res.sendResponse = res.json;
//     res.json = (body) => {
//       cache.set(key, body, 6000); // Lưu trữ dữ liệu vào cache trong 60 giây
//       res.sendResponse(body);
//     };
//     next();
//   }
// });

app.use("/api", apiRouter);
app.get("/", (req, res) => {
  res.json({
    message: "Hello, world!!",
  });
});

app.listen(port, () => {
  console.log("listening on port: " + port);
});

const express = require("express");
const path = require("path");
const logger = require("morgan");
const helmet = require("helmet");

const app = express();

/* // logger, without path, then for all
app.use(logger("dev")); */
// security stack against several things
app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);

// Set to serve 'client/build' folder using built-in express.static middleware
app.use(express.static(path.join(__dirname, "build")));

/* GET home page. */
app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

/* Listening to SERVER */
app.listen(process.env.PORT || 3001);

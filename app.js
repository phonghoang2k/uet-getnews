const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const xhub = require("express-x-hub");

//part
const route = require("./src/routes/route");
const facebook = require("./src/controllers/platform/facebook");
const utils = require("./src/controllers/utils");

//custom
const config = require("./custom/config");
const language = require("./custom/language");

var app = express();

mongoose.connect(config.MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
});

var conn = mongoose.connection;

conn.once("open", function () {
    console.log("connected mongodb");
});

facebook.setupFacebookAPI(config.FB_PAGE_ACCESS_TOKEN);

if (config.FB_APP_SECRET != "") {
    app.use(xhub({ algorithm: "sha1", secret: config.FB_APP_SECRET }));
}
app.use(logger("dev"));
app.use(express.json());
app.use(bodyParser.urlencoded({ limit: "5mb", extended: false }));
app.use(bodyParser.json({ limit: "5mb" }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());

app.use("/webhook", route);

// auto update after 5 min
utils.autoUpdateNews();

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render("error");
});

module.exports = app;

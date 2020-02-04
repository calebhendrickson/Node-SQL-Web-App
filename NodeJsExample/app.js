var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var session = require("express-session");

var PostsService = require("./services/PostsService");
var SignupService = require("./services/SignupService");
var LoginService = require("./services/LoginService");

var postsService = new PostsService();
var signupService = new SignupService();
var loginService = new LoginService();

var routes = require("./routes");

var app = express();
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true
  })
);

// view engine setup

// this expects the template to live in a folder called views
app.set("views", path.join(__dirname, "views"));

// respond with html view template with dynamic content inside
// jade files are regular html files that we can embed values inside
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// this will instruct express to look into the static folder for each
// request it receives and if it finds a matching file it will send
// it to the browser
app.use(express.static(path.join(__dirname, "public")));

// app.use('/', indexRouter);
// app.use('/users', usersRouter);
app.use(
  "/",
  routes({
    postsService,
    signupService,
    loginService
  })
);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;

var createError = require('http-errors');
var express = require('express');
const ejsMate = require('ejs-mate');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const connectToDatabase = require('./models/dbconnect');
const { exec } = require('child_process');

var indexRouter = require('./routes/index');
var dashboardRouter = require('./routes/dashboard');
var usersRouter = require('./routes/users');
var loginRouter = require('./routes/login');
var signupRouter = require('./routes/signup');
let productsRouter = require('./routes/products');
let salesRouter = require('./routes/sales/sales');
let purchaseRouter = require("./routes/purchase/purchase");
const session = require("express-session");
const { attachUser, errorTypeHandler, errorHandler } = require('./routes/middlewares/middleware');

var app = express();
app.engine("ejs", ejsMate);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//app.use(logger('development'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({secret: 'topSecret', resave: false, saveUninitialized: false, cookie: {maxAge: 1000 * 60 * 60 * 24 * 7 /* 7 days */}}));
app.use(attachUser);
app.use('/', indexRouter);
app.use('/dashboard', dashboardRouter);
app.use('/users', usersRouter);
app.use('/login', loginRouter);
app.use('/signup', signupRouter);
app.use('/products', productsRouter);
app.use('/sales', salesRouter);
app.use('/purchase', purchaseRouter);

app.post("/logout", errorHandler(function (req, res) { 
  req.session.destroy();
  return res.redirect('/');
}));

// app.use(function(req, res, next) {
//   //console.log(res)
//   //next(createError(res));
//   //res.render("error/404", {title: "Error!"});
//   next(res.status, res.message);
// });

// app.use(function(err, req, res, next) {
//   console.log("here")
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   res.status(err.status || 500);
//   res.render('error/404', {title: `Error - ${err.status}`, message: res.locals.message});
// });

app.use((err, req, res, next) => {
  err = errorTypeHandler(err);
  next(err);
});

app.use((err, req, res, next)=>{
  const {status = 500, message = "Something went wrong!!"} = err;
  res.status(status).render('error/error', {title: `Error - ${status}`, error: err});
});

app.get("*", (req, res)=>{
  const error = {message: "Page not found!", status: 404, name: "Page Not Found!"}
  res.render("error/error", {title: "Error - Page not found", error: error});
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  if (!res.headersSent) {
      res.status(err.status || 500);
      res.render('error', { error: err });
  }
});

app.listen(80, ()=>{
  console.log("App Started on - http://localhost:80");

  const url = `http://localhost:80`;
    if (process.platform === 'win32') {
        exec(`start ${url}`);
    } else if (process.platform === 'darwin') {
        exec(`open ${url}`);
    } else if (process.platform === 'linux') {
        exec(`xdg-open ${url}`);
    }
});

module.exports = app;

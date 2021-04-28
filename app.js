var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const jwt = require('jsonwebtoken');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var productosRouter = require('./routes/productos');
var categoriasRouter = require('./routes/categories');

var app = express();
app.set("ClaveSecreta","miclave2021")

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//primer nivel de ruteo
app.use('/', indexRouter);
app.use('/users', usersRouter);
//Lo hace en todo productos
//app.use('/productos',validateUser, productosRouter);
app.use('/productos', productosRouter);
app.use('/categorias', categoriasRouter);

//validar usuario
function validateUser(req,res,next){
  jwt.verify(req.headers['my-token'],req.app.get("ClaveSecreta"),function(err,decoded){
    if(err){
      res.json({message:err.message})
    }else{
      console.log(decoded)
      req.body.tokenData = decoded;
      next();
    }
  })
}
app.validateUser = validateUser;



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

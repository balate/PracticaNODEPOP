var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req,res,next){

  console.log ('Llama: ',req.headers.host);

  //pedir a express un dato de una cabecera (headers);
  //indica el tipo de dispositivo,navegador,
  console.log(req.get('User-Agent'));

  /*
  var isAndroid = req.get ('User-Agent').match(/Android/i);
  req.Android =isAndroid;

  var isIphone = req.get ('User-Agent').match(/Iphone/i);
  req.Iphone =isIphone;
*/
  next();

});



//require de db
var db= require('./lib/db');


//require models
var Anuncio = require('./models/Anuncio');
var Usuario = require('./models/Usuario');
var Token = require('./models/Token');


app.use('/', routes);
app.use('/users', users);
app.use('/anuncios',require('./routes/anuncios'));
app.use('/users',require('./routes/users'));


//APIv1
app.use('/apiv1/anuncios',require('./routes/apiv1/anuncios'));
app.use('/apiv1/usuarios',require('./routes/apiv1/usuarios'));
app.use('/apiv1/token',require('./routes/apiv1/token'));



//Imagenes
app.use ('/images/anuncios/iphone.png', express.static (__dirname + '/public/images/bici.jpg'));


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;

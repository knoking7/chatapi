const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');

var post = require('./routes/post');
var app = express();

const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
//mongodb://localhost/apichat
mongoose.connect('mongodb://Mikele11:face112358@ds147566.mlab.com:47566/apichat', { promiseLibrary: require('bluebird') })
  .then(() =>  console.log('connection succesful'))
  .catch((err) => console.error(err));

app.use(logger('dev')); //logger
//middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());
//greeting in API
app.get('/', (req, res) => {
  res.status(200).send('<h4>Hello, you in API<h4>');
});

app.use('/api/messages', post);

//begin swagger
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
//end swagger

app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(function(err, req, res, next) {

  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.json ({error: err})
});

module.exports = app;

'use strict';

// load modules
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const users = require('../models/user.js');
const courses = require('../models/course.js');
const reviews = require('../models/review.js');
const courseRoute = require('../routes/courses.js');
const userRoute = require('../routes/usersRoutes.js');
const parser = require('body-parser');
const authenticate = require('../authentication/authenticate.js');
const session = require('express-session');
const app = express();

// connect mongoose to mongodb
  mongoose.connect('mongodb://localhost:27017/course-api');

  let db = mongoose.connection;

  db.on('error', (err) => {
    console.error('connection error:', err);
  })

  db.once('open', () => {
    console.log('db connection was successful');
  })

app.use(parser())
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: false
}))

// set our port
app.set('port', process.env.PORT || 5000);

// morgan gives us http request logging
app.use(morgan('dev'));

// TODO add additional routes here

app.use('/', userRoute);
app.use('/', courseRoute);

app.use((req, res) => {
  res.status(404).json({
    message: 'Route Not Found'
  })
})

// global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    message: err.message,
    error: {}
  });
});

// start listening on our port
const server = app.listen(app.get('port'), () => {
  console.log(`Express server is listening on port ${server.address().port}`);
});

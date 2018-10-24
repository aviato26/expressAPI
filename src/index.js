'use strict';

// load modules
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const users = require('../models/model.js');
const courses = require('../models/course.js');
const reviews = require('../models/review.js');
const router = require('../routes/routes');
const app = express();

// connect mongoose to mongodb
  mongoose.connect('mongodb://localhost:27017/course-api');

  let db = mongoose.connection;

  db.on('error', (err) => {
    console.error('connection error:', err);
  })

  db.once('open', () => {
    console.log('db connection was successful');
    users.find({}, (err, data) => {
      console.log(data)
    })
  })

  app.use('/', (req, res) => {
    let dude = new users({
      fullName: 'sam',
      emailAddress: 'blah@blah.com',
      password: 'guest'
    })
    dude.save((err) => {
      if(err){
        console.log(err)
      }
    })
  });

// set our port
app.set('port', process.env.PORT || 5000);

// morgan gives us http request logging
app.use(morgan('dev'));

// TODO add additional routes here

// send a friendly greeting for the root route
/*
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the Course Review API'
  });
});
*/
// uncomment this route in order to test the global error handler
// app.get('/error', function (req, res) {
//   throw new Error('Test error');
// });

// send 404 if no other route matched
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

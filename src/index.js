'use strict';

// load modules
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const users = require('../models/model.js');
const courses = require('../models/course.js');
const reviews = require('../models/review.js');
const courseRoute = require('../routes/courses.js');
const parser = require('body-parser');
const auth = require('basic-auth');
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
app.post('/api/users', (req, res) => {
    users.create({
      fullName: req.body.fullName,
      emailAddress: req.body.emailAddress,
      password: req.body.password
    }, (err) => {
        if(err){
          throw err
        } else {
          return res.location('/').status(201).json()
        };
    })
})

app.get('/api/users', (req, res, next) => {
  if(auth(req).name && auth(req).pass){
    users.authenticate(auth(req).name, auth(req).pass, (err, user) => {
      if(err || !user){
        let err = new Error('wrong email or password');
        err.status = 401;
        return next(err)
      }
      else {
        res.send(user)
      }
    })
  } else {
    let err = new Error('Email and password are required');
    err.status = 401;
    return next(err)
  }
})

app.use('/', courseRoute);

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

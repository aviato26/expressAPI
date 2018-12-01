
'use strict';

const express = require('express');
const mongoose = require('mongoose');
const users = require('../models/model.js');
const courses = require('../models/course.js');
const parser = require('body-parser');
const middleware = require('../authentication/authenticate.js');
const router = express.Router();

router.use(parser())

// returns user if validation and authentication are true

router.get('/api/users', middleware, (req, res, next) => {
  res.send(req.user)
})

// will post a new user if all required fields are filled out

router.post('/api/users', (req, res, next) => {
    users.create({
      fullName: req.body.fullName,
      emailAddress: req.body.emailAddress,
      password: req.body.password
    }, (err) => {
        if(err){
          next(err)
        } else {
          return res.location('/').status(201).json()
        };
    })
})

module.exports = router;

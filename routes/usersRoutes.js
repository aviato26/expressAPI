
'use strict';

const express = require('express');
const mongoose = require('mongoose');
const users = require('../models/model.js');
const courses = require('../models/course.js');
const parser = require('body-parser');
const b_auth = require('basic-auth');
const middleware = require('../authentication/authenticate.js');
const router = express.Router();

router.get('/api/users', (req, res, next) => {
  if(b_auth(req).name && b_auth(req).pass){
    users.authenticate(b_auth(req).name, b_auth(req).pass, (err, user) => {
      if(err || !user){
        let err = new Error('wrong email or password');
        err.status = 401;
        return next(err)
      }
      else {
        res.send('from the mid');
        return next(user);
      }
    })
  } else {
    let err = new Error('Email and password are required');
    err.status = 401;
    return next(err)
  }
})

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

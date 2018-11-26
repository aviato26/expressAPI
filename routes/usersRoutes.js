
'use strict';

const express = require('express');
const mongoose = require('mongoose');
const users = require('../models/model.js');
const courses = require('../models/course.js');
const parser = require('body-parser');
const auth = require('basic-auth');
const middleware = require('../authentication/authenticate.js');
const router = express.Router();

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

router.get('/api/users', (req, res, next) => {
  if(auth(req)){
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

module.exports = router;

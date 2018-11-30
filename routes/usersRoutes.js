
'use strict';

const express = require('express');
const mongoose = require('mongoose');
const users = require('../models/model.js');
const courses = require('../models/course.js');
const parser = require('body-parser');
const b_auth = require('basic-auth');
const middleware = require('../authentication/authenticate.js');
const bcrypt = require('bcrypt');
const router = express.Router();

router.use(parser())

router.get('/api/users', (req, res, next) => {
  res.send(req.body)
})

router.post('/api/users', middleware, (req, res, next) => {
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


'use strict';

const users = require('../models/model.js');
const b_auth = require('basic-auth');
const sessions = require('express-session');

let auth = (req, res, next) => {
  if(req.body.emailAddress && req.body.password){
    users.authenticate(req.body.emailAddress, req.body.password, (err, user) => {
      if(err || !user){
        let err = new Error('wrong email or password');
        err.status = 401;
        return next(err)
      }
      else {
        res.send('asdf')
        return next();
      }
    })
  } else {
    let err = new Error('Email and password are required');
    err.status = 401;
    return next(err)
  }
}


module.exports = auth;

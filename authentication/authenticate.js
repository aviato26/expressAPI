
'use strict';

const users = require('../models/user.js');
const b_auth = require('basic-auth');

// function to check if the req header has valid authorization credientials

let auth = (req, res, next) => {
  if(b_auth(req) && b_auth(req).name && b_auth(req).pass){
    users.authenticate(b_auth(req).name, b_auth(req).pass, (err, user) => {
      if(err || !user){
        let err = new Error('wrong email or password');
        err.status = 401;
        return next(err)
      }
      else {
        req.user = user;
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

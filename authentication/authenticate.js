
'use strict';
const auth = require('basic-auth');
const users = require('../models/model.js')

if(auth(req).name && auth(req).pass){
  users.authenticate(auth(req).name, auth(req).pass, (err, user) => {
    if(err || !user){
      let err = new Error('wrong email or password');
      err.status = 401;
      return next(err)
    }
    else {
      req.session.userId = users._id;
      return next()
    }
  })
} else {
  let err = new Error('Email and password are required');
  err.status = 401;
  return next(err)
}

module.exports = auth;

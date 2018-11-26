
'use strict';

const auth = require('basic-auth');
const users = require('../models/model.js');

let authenticate = (req, res, next) => {
  if(auth(req)){
    users.authenticate(auth(req).name, auth(req).pass, (err, user) => {
      if(err || !user){
        let err = new Error('wrong email or password');
        err.status = 401;
        return next(err)
      }
      else {
        req.session.userId = users._id;
        return next(user)
      }
    })
  } else {
    let err = new Error('Email and password are required');
    err.status = 401;
    return next(err)
  }
}

module.exports = authenticate;

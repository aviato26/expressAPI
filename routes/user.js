
'use strict';

const authenticate = require('../authentication/authenticate.js');
const express = require('express');
const parser = require('body-parser');
const auth = require('basic-auth');
const session = require('express-session');
const router = express.Router();
const user = require('../models/model.js');
router.use(parser());

router.get('/api/users', authenticate, (req, res) => {
  user.find({emailAddress: auth(req).name}, (err, data) => {
    if(err){
      throw err
    } else {
      res.send(data)
    }
  })
})

module.exports = router;

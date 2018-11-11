
'use strict';

//const user = require('../models/model.js');
const courses = require('../models/course');
const mongoose = require('mongoose');
const express = require('express');
const parser = require('body-parser');
const router = express.Router();

router.use(parser.json())

router.get('/api/courses', (req, res) => {
  courses.find({}, (err, data) => {
    if(err){
      throw err
    } else {
        res.send(data.map(c => {
          return {
            title: c.title,
            id: c._id
          }
        })
      )
    }
  })
})

router.get('/api/courses/:id', (req, res, next) => {
  courses.findById(req.params.id)
    //.populate('User')
    .populate('Reviews')
    .exec((err, data) => {
      if(err){
        return next(err)
      } else {
        res.send(data.toJSON({virtuals: true}))
      }
    })
  })


module.exports = router;


'use strict';

const express = require('express');
const mongoose = require('mongoose');
const courses = require('../models/course');
//const user = require('../models/model.js')
const router = express.Router();

router.get('/', (req, res) => {
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

router.get('/api/courses/:id', (req, res) => {
  courses.findById(req.params.id)
    .populate('ser')
    .exec((err, data) => {
      if(err){
        throw err
      } else {
        res.send(data)
      }
    })
  })


module.exports = router;

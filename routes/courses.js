
'use strict';

const courses = require('../models/course');
const mongoose = require('mongoose');
const express = require('express');
const parser = require('body-parser');
const mid = require('../authentication/authenticate.js');
const router = express.Router();

router.get('/', (req, res, next) => {
  courses.find({}, (err, data) => {
    if(err){
      return next(err)
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
    .populate('Reviews')
    .populate('User')
    .exec((err, data) => {
      if(err){
        return next(err)
      } else {
        res.send(data.toJSON({virtuals: true}))
      }
    })
  })

router.post('/api/courses', mid, (req, res, next) => {
  /*courses.create({
    title: req.body.title,
    description: req.body.description,
    steps: req.body.steps.map(c => c)
  }, (err) => {
      if(err){
        let err = new Error('please make sure the required fields are filled out')
        return next(err)
      } else {
        return res.location('/api/courses').status(201).json()
      };
  })*/
})

router.put('/api/courses/:id', function(req, res){
  courses.findOneAndUpdate({_id:req.params.id},{$set: req.body},
    (err) => {
      if(err){
        throw err
      }
      res.send().status(204).json()
    }
  )
})


module.exports = router;

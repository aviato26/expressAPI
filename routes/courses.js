
'use strict';

const courses = require('../models/course');
const mongoose = require('mongoose');
const express = require('express');
const parser = require('body-parser');
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

router.get('/api/courses/:id', (req, res, next) => {
  courses.findById(req.params.id)
    .populate('Reviews')
    .exec((err, data) => {
      if(err){
        return next(err)
      } else {
        res.send(data.toJSON({virtuals: true}))
      }
    })
  })

router.post('/api/courses', (req, res) => {
  courses.create({
    title: req.body.title,
    description: req.body.description,
    steps: req.body.steps.map(c => c)
  }, (err) => {
      if(err){
        throw err
      } else {
        return res.location('/api/courses').status(201).json()
      };
  })
})

router.put('/api/courses/:id', function(req, res){
  courses.findByIdAndUpdate(req.params.id,{$set: req.body},{new: true},
    (err) => {
      if(err){
        return err
      }
      res.send().status(204)
    }
  )
})


module.exports = router;

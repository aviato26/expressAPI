
'use strict';

const courses = require('../models/course');
const users = require('../models/user');
const review = require('../models/review');
const mongoose = require('mongoose');
const express = require('express');
const parser = require('body-parser');
const mid = require('../authentication/authenticate.js');
const router = express.Router();

//route for returning all courses

router.get('/api/courses', (req, res, next) => {
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

// route for returning specific course retrieved by the course id

router.get('/api/courses/:id', (req, res, next) => {
  courses.findById(req.params.id)
    .populate({
      path: 'user',
      model: 'User'
    })
    .populate({
      path: 'reviews',
      model: 'Review',
      populate: {
        path: 'user',
        model: 'User'
      }
    })
    .exec((err, data) => {
      if(err){
        return next(err)
      } else {
        res.send(data.toJSON({virtuals: true}))
      }
    })
  })

// route for posting a new course

router.post('/api/courses', mid, (req, res, next) => {
  courses.create(req.body, (err) => {
      if(err){
        let err = new Error('please make sure all the required fields are filled out')
        return next(err)
      } else {
        return res.location('/api/courses').status(201).json()
      };
  })
})

//route for updating a current course

router.put('/api/courses/:id', mid, (req, res, next) =>{
  courses.updateOne({_id:req.params.id}, req.body,
    (err) => {
      if(err){
        next(err)
      } else {
      res.status(204).json()
      }
    }
  )
})

// route for posting a new review

router.post('/api/courses/:id/reviews', mid, (req, res, next) => {
  review.create({
    rating: req.body.rating
  }, (err, new_review) => {
      if(err){
        next(err)
      } else {
        courses.findById({_id: req.params.id}, (err, foundCourse) => {
          if(err){
            next(err)
          } else {
            foundCourse.reviews.push(new_review);
            foundCourse.save((err, data) => {
              if(err){
                next(err)
              } else {
                res.location('/api/courses/:id/reviews').status(201).json()
              }
            })
          }
        })
      }
    })
  })


module.exports = router;

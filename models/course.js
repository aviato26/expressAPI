
'use strict';

let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let User = require('./model.js')
let Review = require('./review.js');

let Course = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: User
  },

  title: {
    type: String,
    required: [true, 'not a valid input']
  },

  description: {
    type: String,
    required: true
  },

  estimatedTime: String,

  materialsNeeded: String,

  steps: [{
    stepNumber: Number,
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    }
  }],

  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: Review
    }
  ]
})

let Courses = mongoose.model('Course', Course);

module.exports = Courses;

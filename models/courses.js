'use strict';

let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let User = require('./model.js');
let Review = require('./reviews.js');

let Course = new Schema({
  _id: Schema.Types.ObjectId,
  user: User._id,
  title: {
    type: String,
    required: true
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
      ObjectId: Review._id
    }
  ]
})

let Courses = mongoose.model('Course', Course);

module.exports = Courses;

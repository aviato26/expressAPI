
'use strict';

let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let User = require('./model.js');


let Review = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: User
  },
  postedOn: {
    type: Date,
    default: Date.now
  },
  rating: {
    type: Number,
    required: true,
    validate: {
      validator: (num) => {
        return (num >= 1 && num <= 5);
      },
      msg: 'num must be between 1 and 5'
    }
  },
  review: String
})

let Reviews = mongoose.model('Review', Review);

module.exports = Reviews;

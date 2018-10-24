
'use strict';

let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let User = require('./model.js')

let Review = new Schema({
  _id: Schema.Types.ObjectId,
  user: User._id,
  postedOn: {
    type: Date,
    default: Date.now
  },
  rating: {
    type: Number,
    required: true
  },
  review: {
    type: String,
    required: () => {
      return this.rating >= 1 && this.rating <= 5
    }
  }
})

let Reviews = mongoose.model('Review', Review);

module.exports = Reviews

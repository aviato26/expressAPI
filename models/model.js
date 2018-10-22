
let mongoose = require('mongoose');
  let Schema = mongoose.Schema;

  let User = new Schema({
    fullName: {
      type: String,
      required: true
    },

    emailAddress: {
      type: String,
      required: true
    },

    password: {
      type: String,
      required: true
    }
  })
/*
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
    review: String
  })*/

  let Users = mongoose.model('User', User);

module.exports = Users

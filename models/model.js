
let mongoose = require('mongoose');
let Schema = mongoose.Schema;

  let User = new Schema({
    fullName: {
      type: String,
      required: true
    },

    emailAddress: {
      type: String,
      required: true,
      match: /\S+@\S+\.\S+/
    },

    password: {
      type: String,
      required: true
    }
  })

  let Users = mongoose.model('User', User);

module.exports = Users

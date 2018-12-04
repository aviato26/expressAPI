
let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let bcrypt = require('bcrypt');

  let User = new Schema({
    fullName: {
      type: String,
      required: true
    },

    emailAddress: {
      type: String,
      required: true,
      match: /\S+@\S+\.\S+/,
      index: {
        unique: true,
        dropDups: true
      }
    },

    password: {
      type: String,
      required: true
    }
  })

  User.statics.authenticate = function(email, password, cb){
    Users.findOne({emailAddress: email})
      .exec((err, user) => {
        if(err){
          return cb(err);
        } else if(!user){
          let error = new Error('There seems to be no record for this user');
            error.status = 401;
            return cb(error);
        }
        bcrypt.compare(password, user.password, (err, data) => {
          if(data === true) {
            return cb(null, user);
          } else {
            return cb()
          }
        })
      })
  }

  User.pre('save', function(next){
    let user = this;

    bcrypt.hash(user.password, 10, function(err, hash){
      if(err){
        return next(err)
      }
      user.password = hash;
      next();
    })
  })

  let Users = mongoose.model('User', User);

module.exports = Users

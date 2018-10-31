let mongoose= require('mongoose');
let validator = require('validator');/*look in to this section*/
const bcrypt = require('bcrypt');


let accountSchema = new mongoose.Schema({
  email:{
    type:String,
    required:true,
    unique:true
    },

  username:{
    type:String,
    required: true,
    unique: true,
    trim:true
    },

  password:{

    type:String,
    required: true
  },

    passwordConfirmation:{
      type:String,
      required:true
    }

});

//this part authenticate input against database

accountSchema.statics.authenticate = function(Email,password, callback){
  /*
    1. Authenticate the user

      1. check if the user exists
      2.check if password is correct
  */
  account.findOne({})
    .exec(function(err, user){
      if(err){
        return callback(err)
      }else if (!acount){
         var err = new Error('User not found.');
         err.status = 401;
         return callback(err);
      }

      bcrypt.compare(password, account.password, function(err, result){
        if(result==true){
          return callback(null, user);
        }else{
          return callback();
        }
      })
    });
}

//hashing a password before saving it to the database

accountSchema.pre('save', function(next){
  var user =this;
  bcrypt.hash(account.password, 10,function(err,hash){
    if(err){
      return next(err);
    }
    account.password= hash;
    next();
  })
});

var account = mongoose.modal('accounts', accountSchema);
module.exports = account;

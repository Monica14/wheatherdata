var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var userdata = mongoose.Schema({
    username : {
        type : String,
        unique : true,
        trim : true
    },
    firstname : {
        type : String
    },
    middlename : {
        type : String
    },
    lastname : {
        type : String
    },
    mobilenumber : {
        type : Number
    },
    course : {
        type : String
    },
    category : {
        type : String
    },
    emailid : {
        type : String
    },
    password : {
        type : String
    }
});

userdata.statics.authenticate = function(username,password,callback){
    user.findOne({username:username},function(err,user){
        if(err) {
            return callback(err);
        }
        else if(!user) {
            var err = new Error('User not found');
            err.status = 401;
            return callback(err);
        }
        bcrypt.compare(password,user.password,function(err,result){
            console.log("////////// Details ///////////");
            if (result === true) {
                return callback(null, user);
            } else {
                return callback();
            }
        })
    })
}

userdata.pre('save',function(next){
    var user = this;
    bcrypt.hash(user.password,10,function(err,hash){
        if(!err)
        {
            user.password = hash;
            next();
        }
        else{
            return next(err);
        }     
        
    })    
});

var user = mongoose.model('user',userdata);
module.exports = user;
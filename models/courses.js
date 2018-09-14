var mongoose = require('mongoose');

var coursedata = mongoose.Schema({
    name : {
        type : String,
        trim : true
    },
    category : {
        type : String
    },
    created_date : {
        type : Date
    },
    last_date : {
        type : Date
    },
    status : {
        type : String
    },
    instructor_name : {
        type : String
    },
    fees : {
        type : String
    },
    discount : {
        type : String
    }
});

var courses = mongoose.model('courses',coursedata);
module.exports = courses;
var express = require('express');
var user = require('../models/user');
var expressvalidator = require('express-validator');
var router = express.Router();
router.use(expressvalidator());


/* GET users listing. */
router.post('/signup', function (req, res, next) {
  if (req.body.username) {
    var data = new user({
      username: req.body.username,
      firstname: req.body.firstname,
      middlename: req.body.middlename,
      lastname: req.body.lastname,
      mobilenumber: req.body.mobilenumber,
      course: req.body.course,
      category: req.body.category,
      emailid: req.body.emailid,
      password: req.body.password
    });

    req.checkBody('username', 'Please enter only alphabates in username').notEmpty().matches(/^[0-9]/);
    req.checkBody('emailid', 'Please enter valid email address').notEmpty().isEmail();

    errors = req.validationErrors();
    if (errors) {
      for (var i = 0; i < errors.length; i++) {
        res.json({ status: 'OK', msg: errors[i]['msg'] });
        break;
      }
    } else {
      data.save(function (err, result) {
        if (!err) {
          res.json({ status: 'OK', msg: 'User registered successfully' });
        }
        else {
          res.json({ status: 'Error', msg: 'Error occured during registration', data: err });
        }
      })
    }


  }
  else {
    res.json({ status: 'Error', msg: 'please enter all the details' });
  }
});


module.exports = router;

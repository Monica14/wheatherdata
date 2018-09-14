var express = require('express');
var router = express.Router();
var common_library = require('./common_library');
var user = require('../models/user');
//var promise = require('promise');

/* GET home page. */
router.get('/', function (req, res, next) {
	res.json({ title: 'SignIn ' });
});

router.post('/register', function (req, res, next) {
	common_library.insert('employee', req.body, function (err, result) {
		if (!err) {
			res.json({ status: 'ok', msg: 'Employee registered successfully.' });
		}
		else {
			res.json({ status: '404 ', msg: 'Error Occured' });
		}

	});
});

router.get('/employee_list', function (req, res, next) {
	common_library.select('employee', 'where 1', function (err, content) {
		if (!err) {
			res.json({ status: 'ok', msg: content });
		}
		else {
			res.json({ status: '404', msg: err });
		}
	});
});

router.post('/', function (req, res, next) {
	if(req.body.username && req.body.password)
	{
		user.authenticate(req.body.username,req.body.password, function (err, result) {
			if (!err) {
				res.json({ status: 'ok', msg: 'Login successful' });
			}
			else {
				res.json({ status: 'Error ', msg: 'Error Occured' });
			}
	
		});
	}
	else{
		res.json({ status: 'Error ', msg: 'Please enter all the details' });
	}	
});

router.get('/fetchdata', function (req, res, next) {
	user.find({}).then(function(data){
		console.log(data);
		return data;
	}).then(function(data1){
		console.log("data1");
		return "5555";
	}).then(function(data2){
		console.log("data2");
		console.log(data2);
	})
});

module.exports = router;

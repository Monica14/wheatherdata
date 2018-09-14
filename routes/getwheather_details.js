var express = require('express');
var router = express.Router();
var common_library = require('./common_library');
var user = require('../models/user');
var request = require('request');
var moment = require('moment');
var async = require('async');
//var promise = require('promise');



//////////// API for current 5 days wheather forecast //////////////////////////
router.post('/currentwheather_deatils', function (req, res, next) {
    if (req.body.cityname) {
        var current_datetime = moment(new Date()).format('YYYY-MM-DD-HH:mm:ss');
        var current_date = moment(new Date()).format('DD/MM/YYYY');
        var current_data = []; var current_whether_data = [];
        var date_array = [];

        for (var i = 0; i < 6; i++) {
            var date = new Date();
            date_array.push(moment(date.setDate(date.getDate() + i)).format('YYYY-MM-DD-HH:mm:ss'));
        }
        request('https://api.openweathermap.org/data/2.5/forecast?q=' + req.body.cityname + '&units=metric&appid=f0a6adbcb0bdc87901ce8f082461168a', function (wheather_data, response, body) {
            data = JSON.parse(body);
            if (response.statusCode == 200) {
                async.each(date_array, function (date_array1, callback) {
                    async.each(data.list, function (wheather_data, callback1) {
                        if (date_array1 <= moment(wheather_data.dt_txt).format('YYYY-MM-DD-HH:mm:ss')) {
                            return callback1(wheather_data);
                        }
                    }, function (msg) {
                        if (msg) {
                            current_whether_data.push(msg);
                            callback();
                        }
                        else
                            callback(msg);
                    });


                },
                    function (err) { res.json(err) });

                res.json({ status: "OK", msg: 'Data fetched successfully', data: current_whether_data })
            }
            else {
                res.json({ status: "Error", msg: 'Please enter valid city name' })
            }

        });
    }
    else {
        res.json({ status: "Error", msg: 'Please enter city name' })
    }

});

//////////// API for current wheather forecast //////////////////////////
router.post('/wheather_deatils', function (req, res, next) {
    if (req.body.cityname) {
        request('https://api.openweathermap.org/data/2.5/weather?q=' + req.body.cityname + '&units=metric&appid=f0a6adbcb0bdc87901ce8f082461168a', function (wheather_data, response, body) {

            if (response.statusCode == 200) {
                res.json({ status: "OK", msg: 'Data fetched', data: JSON.parse(body) })
            }
            else {
                res.json({ status: "Error", msg: 'Please enter valid city name' })
            }

        });
    }
    else {
        res.json({ status: "Error", msg: 'Please enter city name' })
    }

});

module.exports = router;

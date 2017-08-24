var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Request = require('../models/Request.js');
var multer = require('multer');
var pg = require('pg');
var massive = require('massive');
// var nodemailer = require('nodemailer');
// var transporter = nodemailer.createTransport();

var connectionString = process.env.ELEPHANTSQL_URL || "postgres://qidfyhmg:pQg3ixELoTh3ZKKmZQ_kBItW8D9Ekwil@stampy.db.elephantsql.com:5432/qidfyhmg";
var db = massive.connectSync({connectionString : connectionString});



/* GET /todos listing. */
router.get('/', function(req, res, next) {
    db.requests.find(function(err, data){
        res.json(data);
    });
});
router.post('/', function(req, res, next) {
    console.log(req.body);
    // transporter.sendMail({
    //     from: req.email,
    //     to: req.email,
    //     subject: 'New schedule request',
    //     text: req
    // }, function (err) {
    //     console.log(err);
    // });
    db.requests.insert(req.body, function (err, post) {
        if (err) return next(err);
        console.log(post);
        res.json(post);
    });
});
// router.post('/upload', upload.any(), function(req, res){
//     //console.log(req.body);
//     console.log(req);
//     //console.log(res.data);
//     res.json({success: true});
// });
// router.get('/:id', function(req, res, next) {
//     console.log(req.params.id);
//     Story.findById(req.params.id, function (err, post) {
//         if (err) return next(err);
//         res.json(post);
//     });
// });
router.put('/update', function(req, res, next) {
    console.log("employee id is " + req.body['req_key']);
    db.requests.save(req.body, function(err,updated){
        console.log(updated);
    })
});
router.delete('/:id', function(req, res, next) {
    console.log(req.params.id);
    db.requests.destroy({req_key: req.params.id}, function(err, dbres){
        res.json(dbres);
    });
});
module.exports = router;


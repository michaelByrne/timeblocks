var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Story = require('../models/Story.js');
var multer = require('multer');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/uploads')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});

var upload = multer({ storage: storage });

/* GET /todos listing. */
router.get('/', function(req, res, next) {
    Story.find(function (err, todos) {
        if (err) return next(err);
        console.log(todos);
        res.json(todos);
    });
});
router.post('/', function(req, res, next) {
    console.log(req.body);
    Story.create(req.body, function (err, post) {
        if (err) return next(err);
        console.log(post);
        res.json(post);
    });
});
router.post('/upload', upload.any(), function(req, res){
    //console.log(req.body);
    console.log(req);
    //console.log(res.data);
    res.json({success: true});
});
router.get('/:id', function(req, res, next) {
    console.log(req.params.id);
    Story.findById(req.params.id, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});
router.put('/:id', function(req, res, next) {
    console.log(req.body);
    Story.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});
router.delete('/:id', function(req, res, next) {
   Story.findByIdAndRemove(req.params.id, req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});
module.exports = router;


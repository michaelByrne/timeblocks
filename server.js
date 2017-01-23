// modules =================================================
var express        = require('express');
var app            = express();
var mongoose       = require('mongoose');
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');
var multer = require('multer');

// configuration ===========================================
	
// config files
var db = require('./config/db');

var mongoose = require('mongoose');
// Use native Node promises
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://admin:123@ds147975.mlab.com:47975/byrneio')
    .then(() =>  console.log('connection succesful')).catch((err) => console.error(err));

var port = process.env.PORT || 8080; // set our port
// mongoose.connect(db.url); // connect to our mongoDB database (commented out after you enter in your own credentials)
var stories = require('./app/routes/stories');

// get all data/stuff of the body (POST) parameters
app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(bodyParser.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded
app.use('/stories', stories);


//app.use(methodOverride('X-HTTP-Method-Override')); // override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(express.static(__dirname + '/public')); // set the static files location /public/img will be /img for users
// routes ==================================================
require('./app/routes')(app); // pass our application into our routes


// start app ===============================================
app.listen(port);	
console.log('Magic happens on port ' + port); 			// shoutout to the user
exports = module.exports = app; 						// expose app
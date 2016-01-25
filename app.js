var express = require('express');
var app = express();
var morgan = require('morgan');
var swig = require('swig');
var router = require('./routes/wiki.js');
var fs = require('fs');
var bodyParser = require('body-parser');

app.use(express.static(__dirname+ '/public'));

// point res.render to the proper directory
app.set('views', __dirname + '/views');
// have res.render work with html files
app.set('view engine', 'html');
// when res.render works with html files
// have it use swig to do so
app.engine('html', swig.renderFile);
// turn of swig's caching
swig.setDefaults({cache: false});

app.use(morgan('dev'));

app.use(bodyParser.urlencoded({ extended: true })); // for HTML form submits
app.use(bodyParser.json()); // would be for AJAX requests

app.get('/', function(req, res, next) {
	res.render('index', {

	})	
});
app.use('/wiki', router)

var server = app.listen(1337, function(){
  console.log('listening on port 1337');
});
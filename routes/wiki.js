var express = require('express');
var router = express.Router();
var app = express();
var User = require('../models/').User;
var Page = require('../models/').Page;

var error = function (err, res) {
	if (err) console.log(err);
	res.render('error')
}

module.exports = router
//=-----------GET USERS-------------
// User.find(function(err, user){
//   			if (err) return console.error(err);
//   			console.log(user);

//   		})

router.get('/add', function(req, res, next) {
	res.render('addpage', {

	})	
});

router.get('/', function(req, res, next) {
  	Page.find(function(err, pages){
		if (err) return console.error(err);
		res.render('index', {
			pages:pages
		});
	})
});

//-------------ADD PAGE---------------
router.post('/', function(req, res, next) {
	var user = new User({ 
		name:req.body.name,
		email:req.body.email 
	});
	
	var page = new Page({ 
		title : req.body.title,
		content: req.body.content,
		status: req.body.status,
		author: user
	});

	user.save()
  	.then(function(){
	  	return page.save();	
  	})
  	.then(function(page){
  			res.redirect(page.route)
  		}, 
  		function(err){
  			res.redirect('error')
  			console.log(err)
  	})

});

router.get('/:pageTitle', function(req, res, next) {
	var title = req.params.pageTitle
	Page.findOne({ 'urlTitle': title}).populate('author').exec(function(err, page){
		if(err) return err;
		res.render('wikipage', page);
		console.log(page)
	})

});


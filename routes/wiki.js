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
		tags: req.body.tags,
		author: user
	});
	//validate
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
		console.log("THIS",page)
		page.findSimilarTypes(function (err, pages) {
	  		console.log('PAGES',pages); // woof
		});
		
		res.render('wikipage', page);
		console.log(page)
	})

});


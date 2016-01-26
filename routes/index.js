var express = require('express');
var router = express.Router();
var app = express();
var User = require('../models/').User;
var Page = require('../models/').Page;


module.exports = router

router.get('/', function(req, res, next) {
	res.render('index', {

	})	
});

router.get('/search',function(req, res, next){
	if(req.query.tag){
		var tagCollection = req.query.tag.split(" ")
		console.log(tagCollection)
		Page.findByTags(tagCollection)
		.then(function(pages){
			console.log(pages)
			res.render('tags', {pages: pages});	
		})
	}else{
		res.render('tags')
	}

})

// router.get('/search',function(req, res, next){
// 	res.render('tags')
// })








// POST	/wiki/	/	submit a new page to the database


// GET	/wiki/add/	/add	retrieve the "add a page" form



// app.use('/error', function(err, req, res, next){
// 	res.status(500).render('error')
// })




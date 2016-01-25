var express = require('express');
var router = express.Router();
var app = express();


module.exports = router

function getPages (req, res, next){
	res.render('index',{
     
    });
};

router.get ('/', getPages)
router.get ('/wiki', getPages)

router.get('/:id', function(req, res){
	res.render('wikipage',{
     
    });
})





// POST	/wiki/	/	submit a new page to the database


// GET	/wiki/add/	/add	retrieve the "add a page" form



// app.use('/error', function(err, req, res, next){
// 	res.status(500).render('error')
// })




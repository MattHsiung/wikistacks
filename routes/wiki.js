var express = require('express');
var router = express.Router();
var app = express();


module.exports = router

// function getPages (req, res, next){
// 	res.render('index',{
     
//     });
// };

// router.get ('/', getPages)
// router.get ('/wiki', getPages)
router.get('/add', function(req, res, next) {
	res.render('addpage', {

	})	
});


router.get('/', function(req, res, next) {
  res.redirect('/');
});

router.post('/', function(req, res, next) {
  res.send('got to POST /wiki/');
});
// router.get('/:id', function(req, res){
// 	res.render('wikipage',{
     
//     });
// })

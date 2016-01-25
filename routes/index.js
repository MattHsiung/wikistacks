var express = require('express');
var router = express.Router();
var app = express();


module.exports = router


router.get('/', function(req, res){
	res.render('index',{
     
    });
})
router.get('/:id', function(req, res){
	res.render('wikipage',{
     
    });
})


// app.use('/error', function(err, req, res, next){
// 	res.status(500).render('error')
// })




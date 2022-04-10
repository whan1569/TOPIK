var express = require('express');
const dbcon = require("../config/db_con");
var router = express.Router();

router.get('/', function(req, res, next) {
  console.log(req.session);
  res.render('index', { title: 'Dambi Topik', user_id : req.session.user_id });
});
router.get('/logout', function(req, res, next) {
  req.session.destroy(function(){ req.session;});  
  res.redirect('/');
});


module.exports = router;

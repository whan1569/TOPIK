var express = require('express');
const dbcon = require("../config/db_con");
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  if(!req.session.user_id)
    console.log(req.session);
  res.render('index', { title: 'Express', user_id : req.session.user_id });
});
router.get('/logout', function(req, res, next) {
  delete req.session.user_id;
  res.redirect('/');
});

router.get('/test',async  function(req, res, next) {
  num = req.query.num;
  num++;
  var a=206000+num;
  console.log(a);
  var quetion = await dbcon("SELECT * FROM quetion WHERE code = ?",[a]);
  res.render('test', {quetion:quetion,num:num});
});
module.exports = router;

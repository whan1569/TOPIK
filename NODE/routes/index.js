var express = require('express');
const session = require('express-session');
const dbcon = require("../config/db_con");
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(req.session);
  res.render('index', { title: 'Express', user_id : req.session.user_id });
});
router.get('/logout', function(req, res, next) {
  req.session.destroy(function(){ req.session;});  
  res.redirect('/');
});

router.get('/test',async  function(req, res, next) {
  var num = req.query.num++;
  var a=206000+num;
  var [quetion] = await dbcon("SELECT * FROM quetion WHERE code = ?",[a]);
  req.session.answ = quetion.answ;
  res.render('test', {answ : quetion.answ,num1 : quetion.num1, num2 : quetion.num2, num3 : quetion.num3 , num4 : quetion.num4 ,code : quetion.code , num:num});
});
router.post('/test',async  function(req, res, next) {
  var num = req.query.num++;
  if(num<50)
  {
    if(!req.session.test)
     req.session.test = [];
     console.log(req.session.answ);
     console.log(req.body.ans);
    if(req.body.ans==req.session.answ)
      req.session.test[num]=0;
    else
      req.session.test[num]=1;
    console.log(req.session);
    num++;
    res.redirect('test?num='+num);
  }
  else
  {
    res.redirect('/');
  }
});
module.exports = router;

var express = require('express');
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
  if(!req.session.test)
    req.session.test = [];
  if(req.body.ans==req.session.answ)
    req.session.test[num]=0;
  else
    req.session.test[num]=1;
  if(num==5)
  {
    var [result] = await dbcon("SELECT try FROM user WHERE id = ?;", [req.session.user_id]);
    if(!result.try)
    {
      result.try=1;
      console.log(req.session.user_id);
      await dbcon("UPDATE user SET try = ? WHERE id = ?;", [result.try, req.session.user_id]);
    }
    else
      await dbcon("UPDATE user SET try = ? WHERE id = ?;", [++result.try,req.session.user_id]);
    await dbcon("INSERT INTO test(id_try) VALUES (?);", [req.session.user_id+"_"+result.try]);
    for(var i=1;i<=5;i++)
    {
      await dbcon("UPDATE test SET t? = ?  WHERE id_try = ? ;", [i, req.session.test[i], req.session.user_id+"_"+result.try]);
    }
    res.redirect('/');
  }
  else
  {
    num++;
    res.redirect('test?num='+num);
  }
});
module.exports = router;

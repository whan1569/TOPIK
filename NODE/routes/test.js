var express = require('express');
const dbcon = require("../config/db_con");
var router = express.Router();
router.get('/',async  function(req, res, next) {
  var num = req.query.num++;
  var a=206000+num;
  var [quetion] = await dbcon("SELECT * FROM quetion WHERE code = ?",[a]);
  var title=showTitle(num);
  req.session.answ = quetion.answ;
  res.render('test', {title:title ,answ : quetion.answ,num1 : quetion.num1, num2 : quetion.num2, num3 : quetion.num3 , num4 : quetion.num4 ,code : quetion.code , num:num});
});
router.post('/',async  function(req, res, next) {
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
router.get('/history',async  function(req, res, next) {
    var history = await dbcon("SELECT * FROM test ORDER BY id_try ASC");
    res.render('test_history', {history:history});
  });

function showTitle(a) {
  if(a<=2)
  {
    return "(         )에 들어갈 가장 알맞은 것을 고르십시오.";
  }
  else if(a<=4)
  {
    return "다음 밑줄 친 부분과 의미가 비슷한 것을 고르십시오.";
  }
  else if(a<=8)
  {
    return "다음은 무엇에 대한 글인지 고르십시오.";
  }
  else if(a<=12)
  {
    return "다음 글 또는 그래프의 내용과 같은 것을 고르십시오.";
  }
  else if(a<=15)
  {
    return "다음을 순서대로 맞게 배열한 것을 고르십시오.";
  }
  else if(a<=18)
  {
    return "다음을 읽고(         )에 들어갈 내용으로 가장 알맞은 것을 고르십시오.";
  }
  else if(a<=24)
  {
    return "다음 글을 읽고 물음에 답하십시오.";
  }
  else if(a<=27)
  {
    return "다음 신문 기사의 제목을 가장 잘 설명한 것을 고르십시오.";
  }
  else if(a<=31)
  {
    return "다음을 읽고(         )에 들어갈 내용으로 가장 알맞은 것을 고르십시오.";
  }
  else if(a<=34)
  {
    return "다음을 읽고 내용이 같은 것을 고르십시오.";
  }
  else if(a<=38)
  {
    return "다음 글의 주제로 가장 알맞은 것을 고르십시오.";
  }
  else if(a<=41)
  {
    return "다음 글에서 <보기>의 문양이 들어가기에 가장 알맞은 곳을 고르십시오.";
  }
  else if(a<=43)
  {
    return "다음 글을 읽고 물음에 답하십시오.";
  }
  else if(a<=45)
  {
    return "다음을 읽고 물음에 답하십시오.";
  }
  else if(a<=47)
  {
    return "다음 글을 읽고 물음에 답하십시오.";
  }
  else if(a<=50)
  {
    return "다음을 읽고 물음에 답하십시오";
  }
}

module.exports = router;

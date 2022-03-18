var express = require('express');
const dbcon = require("../config/db_con");
var router = express.Router();

/* GET users listing. */
router.get('/',async  function(req, res, next) {
  var user = await dbcon("SELECT id FROM user");
  res.render('users', { title: 'user', user: user });
});
router.get('/users_insert', function(req, res, next) {
  res.render('users_insert', { title: 'users_insert'});
});
router.post('/users_insert', async function(req, res, next) {
  const { id,pw } = req.body;
  await dbcon("INSERT INTO user(id,pw) VALUES (?,?);", [id,pw]);
  res.redirect("/");
});
module.exports = router;

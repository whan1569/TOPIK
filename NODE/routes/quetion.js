var express = require('express');
const dbcon = require("../config/db_con");
var multer  = require('multer');
var router = express.Router();

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/quetion');
  },
  filename: function (req, file, cb) {
    cb(null, req.body.code+'.png');
  }
});
var upload = multer({ storage: storage });

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('quetion', { title: 'quetion' });
});
router.get('/quetion_insert', function(req, res, next) {
  res.render('quetion_insert', { title: 'quetion_insert' });
});

router.post('/quetion_insert',/* upload.single('file'),*/async function(req, res, next) {
  const {code,num1,num2,num3,num4,answ} = req.body;
  await dbcon("INSERT INTO quetion(code,num1,num2,num3,num4,answ) VALUES (?,?,?,?,?,?);", [code,num1,num2,num3,num4,answ]);
  res.redirect("quetion_insert");
});

router.get('/quetion_list',/* upload.single('file'),*/async function(req, res, next) {
  var quetion = await dbcon("SELECT * FROM quetion ORDER BY code ASC");
  res.render('quetion_list', { title: 'quetion_list', quetion : quetion});
});
module.exports = router;

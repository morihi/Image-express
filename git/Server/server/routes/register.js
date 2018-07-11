//require packages
var express = require('express');
var router = express.Router();
var admin = require("firebase-admin");
var serviceAccout = require('./serviceAccountKey.json')
var jwt = require('jsonwebtoken');

/*
    firebase DBの設定
*/

var config = {
  apiKey: "AIzaSyDCGtY7lkg9x8O6WQCidpfNV3VqHyGN_2Y",
  authDomain: "system-5b20e.firebaseapp.com",
  databaseURL: "https://system-5b20e.firebaseio.com",
  credential: admin.credential.cert(serviceAccout),
  projectId: "system-5b20e",
  storageBucket: "system-5b20e.appspot.com",
  messagingSenderId: "725899420515"
};
/*
  firebaes DBの初期化
*/
admin.initializeApp(config);
var database = admin.database();


var extract = function(request){
  return {
    name:request.body.user,
    class_name:request.body.classnumber,
    pass:request.body.password
  };
};

/*
  ユーザー登録
*/

router.post('/', function(req, res, next) {


  // 入力データを取得
  var user = req.body.user
  var classname = req.body.classnumber
  var password = req.body.password
  var flag = 0
  console.log(user)

  //firebase呼び出し、一回だけ取得
  var ref = admin.database().ref().once('value').then(function(snapshot){

    //ユーザーの既存確認
    for(var i in snapshot.val().user) {
      console.log(i)
        if(user == i){
          console.log('come here')
          flag = 1
        }
    }
    console.log(flag)
    if(flag == 1){
      //ユーザーが登録済みのとき
      res.json({
        success: false,
        message: 'Authentication failed. User already exist'
      })
    }else{
      //ユーザーが登録されていない場合
      database.ref('/user/'+user).set({
        name: user,
        password: password,
        classname: classname
      })
      res.json({
        name: user,
        password: password,
        classname: classname
      })
    }
  })
});



//ログイン処理
router.post('/login', function(req, res, next) {

  var user = req.body.user
  var classname = req.body.classnumber
  var password = req.body.password
  var flag = 0

  // 入力データを取得
  var ref = admin.database().ref().once('value').then(function(snapshot){

    for (var i in snapshot.val().user){
      //ユーザー名の確認
      if(user == i){
        flag = 1
      }
    }
    if(flag == 0){
      res.json({
        success: false,
        message: 'Authentication failed. User already exist'
      })
    }else{
      flag = 0
    }

    //パスワードの確認
    if(password != snapshot.val().user[user].password){
      res.json({
        success: false,
        message: 'Authentication failed. Wrong Pass'
      })
    }else{
    }
    //ログイン許可

    var token = jwt.sign({
      id: user,
      pass: password
    },'Image')

    res.json({
      success: true,
      message: 'Authentication successfully finished.',
      token: token
    });

  })
})

//教師画面へのログイン
router.post('/login/teacher', function(req,res,next){
  var user = req.body.user
  var classname = req.body.classnumber
  var password = req.body.password
  var flag = 0

  // 入力データを取得
  var ref = admin.database().ref().once('value').then(function(snapshot){

    for (var i in snapshot.val().user){
      //ユーザー名の確認
      if(user == i){
        flag = 1
      }
    }
    if(flag == 0){
      res.json({
        success: false,
        message: 'Authentication failed. User already exist'
      })
    }else{
      flag = 0
    }

    //パスワードの確認
    if(password != snapshot.val().user[user].password){
      res.json({
        success: false,
        message: 'Authentication failed. Wrong Pass'
      })
    }else{
    }
    //ログイン許可

    var token = jwt.sign({
      id: user,
      pass: password
    },'Image')

    res.json({
      success: true,
      message: 'Authentication successfully finished.',
      token: token
    });

  })
})



router.post('/students', function(req, res, next) {

  //console.log(req.body);
  var userName = req.body.user;
  var classnumber = req.body.classnumber;
  var password = req.body.password;

  res.redirect('/DrawImage/'+userName+'/'+classnumber);

});





router.post('/teacher', function(req, res, next) {

  //console.log(req.body);
  var userName = req.body.user;
  var classnumber = req.body.classnumber;
  var password = req.body.password;

  res.redirect('/DrawImage1/'+userName+'/'+classnumber);

});

module.exports = router;

var express = require('express');
var router = express.Router();
var firebase = require("firebase-admin");

/*
    firebase DBの設定
*/
var config = {
  apiKey: "AIzaSyDCGtY7lkg9x8O6WQCidpfNV3VqHyGN_2Y",
  authDomain: "system-5b20e.firebaseapp.com",
  databaseURL: "https://system-5b20e.firebaseio.com",
  projectId: "system-5b20e",
  storageBucket: "system-5b20e.appspot.com",
  messagingSenderId: "725899420515"
};

firebase.initializeApp(config);
var database = firebase.database();


var extract = function(request){
  return {
    name:request.body.user,
    class_name:request.body.classnumber,
    pass:request.body.password,
    _csrf:request.body._csrf
  };
};


router.post('/confirm', function(req, res, next) {
  // 入力データを取得
  var data = extract(req);

  //ユーザー認証
  var ref = firebase.database().ref(req.body.classnumber).once('value').then(function(snapshot){
    if(snapshot.val() == null){
      //登録されていないクラス名
      console.log('no classname');
    }else{
      var string = JSON.stringify(snapshot.val());
      var da = JSON.parse(string);
      if(da[req.body.user]==null){
        //登録されていないユーザー名
        console.log('no username');
      }else{
        //ユーザー認証成功
        res.render("confirm.ejs", data);
        console.log(da[req.body.user]);
      };
    };
  });
});

router.post('/complete', function(req, res, next) {
  // 入力データを取得
  var data = extract(req);
  /*
  // 入力データの検証
  if (validate(data) === false) {
    //return response.render("./shop/regist/input.ejs", data);
  }*/
  res.render("complete",{});
});

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

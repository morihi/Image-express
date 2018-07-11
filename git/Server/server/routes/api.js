var express = require('express');
var router = express.Router();
//var firebase = require("firebase-admin");
var fs = require('fs');
var exec = require('child-process-promise').exec;
var admin = require('firebase-admin')

/*

python の処理をAPIにして返すroute

*/



/*
    firebase DBの設定
*/
/*
var config = {
  apiKey: "AIzaSyDCGtY7lkg9x8O6WQCidpfNV3VqHyGN_2Y",
  authDomain: "system-5b20e.firebaseapp.com",
  databaseURL: "https://system-5b20e.firebaseio.com",
  projectId: "system-5b20e",
  storageBucket: "system-5b20e.appspot.com",
  messagingSenderId: "725899420515"
};

firebase.initializeApp(config);
*/
var database = admin.database();

//結線あるなしから
router.get('/',(request,res,next)=>{
  exec('python conversion/main.py').then(function(result){
    var parse = JSON.parse(result.stdout);
    console.log(parse);
    res.status(200).json(JSON.stringify(parse));
  }).catch(function(err){
    console.error("Error: " + err );
    res.status(500).send(err);
  });
});

//teacher.csvから
router.get('/teacher',(request,res,next)=>{
  exec('python conversion/main.py -t').then(function(result){
    var parse = JSON.parse(result.stdout);
    console.log(parse);
    res.status(200).json(JSON.stringify(parse));
  }).catch(function(err){
    console.error("Error: " + err );
    res.status(500).send(err);
  });
});

//ファイル名指定して教師データから
router.get('/teacher/:name',(request,res,next)=>{
  exec('python conversion/main.py -t '+request.params.name).then(function(result){
    var parse = JSON.parse(result.stdout);
    console.log(parse);
    res.status(200).json(JSON.stringify(parse));
  }).catch(function(err){
    console.error("Error: " + err );
    res.status(500).send(err);
  });
});

//80%の教師データ作成
router.get('/make/',(request,res,next)=>{
  exec('python conversion/main.py -m ').then(function(result){
    var parse = JSON.parse(result.stdout);
    console.log(parse);
    res.status(200).json(JSON.stringify(parse));
  }).catch(function(err){
    console.error("Error: " + err );
    res.status(500).send(err);
  });
});

//percentの教師データ作成
router.get('/make/:percent',(request,res,next)=>{
  exec('python conversion/main.py -m '+request.params.percent).then(function(result){
    var parse = JSON.parse(result.stdout);
    console.log(parse);
    res.status(200).json(JSON.stringify(parse));
  }).catch(function(err){
    console.error("Error: " + err );
    res.status(500).send(err);
  });
});

//生徒データcsv作成
router.get('/change/:classnumber/:name',(req,res,next)=>{
  var ref = admin.database().ref(req.params.classnumber+"/"+req.params.name).once('value').then(function(snapshot){
    fs.writeFile('conversion/conversion/changeJSON/'+req.params.name+'.json',JSON.stringify(snapshot.val()));
    exec('python conversion/conversion/changeJSON/changer.py -s '+req.params.name+' '+ req.params.name + '.json '+req.params.classnumber).then(function(result){
      console.log(result.stdout);
      res.send();
    });
  });
});

//教師データcsv作成
router.get('/change/teacher/:classnumber/:name',(req,res,next)=>{
  var ref = admin.database().ref(req.params.classnumber+"/"+req.params.name).once('value').then(function(snapshot){
    fs.writeFile('conversion/conversion/changeJSON/'+req.params.name+'.json',JSON.stringify(snapshot.val()));
    exec('python conversion/conversion/changeJSON/changer.py -t '+req.params.name+' '+ req.params.name + '.json '+req.params.classnumber).then(function(result){
      console.log(result.stdout);
      res.send();
    });
  });
});

module.exports = router;

/*var session =new QiSession();
var session;//変数の定義
QiSession( function (s){
    session = s;
    });*/
var flag=0;

$(function() {
    document.getElementById("slide2").style.display="none";
    document.getElementById("map1").style.display="none";
    document.getElementById("profile1").style.display="none";
    document.getElementById("list_btn").style.display="none";
    document.getElementById("top_btn").style.display="none";
});

function backButtonClicked() {
    /*session.service("ALTextToSpeech").then(function (tts) {
      tts.say("Hello");
    });*/
    if(flag==0){
        window.location.href = 'education.html';
    }
    else if(flag==1){
        document.getElementById("slide2").style.display="none";
        document.getElementById("slide1").style.display="block";
        flag--;
    }
    else if(flag==2){
        document.getElementById("map1").style.display="none";
        document.getElementById("slide2").style.display="block";
        flag--;
    }
    else if(flag==3){
        document.getElementById("profile1").style.display="none";
        document.getElementById("list_btn").style.display="none";
        document.getElementById("top_btn").style.display="none";
        document.getElementById("map1").style.display="block";
        document.getElementById("next_btn").style.display="block";
        flag--;
    }
}

function nextButtonClicked() {
    if(flag==0){
        document.getElementById("slide1").style.display="none";
        document.getElementById("slide2").style.display="block";
        flag++;
    }
    else if(flag==1){
        document.getElementById("slide2").style.display="none";
        document.getElementById("map1").style.display="block";
        flag++;
    }
    else if(flag==2){
        document.getElementById("map1").style.display="none";
        document.getElementById("next_btn").style.display="none";
        document.getElementById("profile1").style.display="block";
        document.getElementById("list_btn").style.display="block";
        document.getElementById("top_btn").style.display="block";
        flag++;
    }
}

function topButtonClicked(){
    window.location.href = 'index.html';
}

function listButtonClicked(){
    window.location.href = 'education.html';
}
$(function() {
    Pitch.staticArea = $("#static"),
    Pitch.staticArea.width($(window).width() - 20),
    Pitch.staticArea.height($(window).height() - 20),
    Pitch.progressText = $("#progressText"),
    Pitch.startButton = $("#progressText"),
    Pitch.updateText(""),
    Pitch.beep = document.getElementById("alarm"),
    $(window).bind("resize", windowResize),
    windowResize(),
    navigator.userAgent.match(/iphone/i) || navigator.userAgent.match(/ipad/i) ? (Pitch.updateText("Tap to Start"),
    Pitch.startButton.click(function() {
      Pitch.beep && Pitch.beep.load && Pitch.beep.load(),
        Pitch.start(),
        Pitch.startButton.unbind("click");
    }),
    Pitch.startButton.show()) : (Pitch.beep && Pitch.beep.load && Pitch.beep.load(),
    Pitch.start());
});

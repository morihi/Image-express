(function () {
  var login_students = function (event) {
    $("#form").attr("action", "/register/students").submit();
  };

  var login_teacher = function (event) {
    $("#form").attr("action", "/register/teacher").submit();
  };
  var register = function (event) {
    $("#form").attr("action", "/register/").submit();
  };

  // ドキュメント読み込み完了時に呼び出されます。
  var document_onready = function (event) {
    $("#login").click(login_students).focus();
    $("#login1").click(login_teacher);
    $("#newuser").click(register);
  };

  $(document).ready(document_onready);
})();

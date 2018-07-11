(function () {
  var btn_back = function (event) {
    $("#form").attr("action", "/login/").submit();
  };

  var btn_regist = function (event) {
    $("#form").attr("action", "/register/complete").submit();
  };
  // ドキュメント読み込み完了時に呼び出されます。
  var document_onready = function (event) {
    $("#btn_back").click(btn_back);
    $("#btn_regist").click(btn_regist).focus();
  };

  $(document).ready(document_onready);
})();

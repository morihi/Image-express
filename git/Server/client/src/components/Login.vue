<template>
  <div class="form">
        <input v-model="user" type="text" placeholder="名前を入力" required/>
        <input v-model="classnumber" type="text" placeholder="クラス番号を入力" required/>
        <input v-model="password" type="password" placeholder="パスワードを入力" required/>
        <button @click = 'login' >生徒ログイン</button>
        <button @click = 'login_teacher'>教師ログイン</button>
        <button @click = "newuser">新規登録</button>
        <button id = "logout" class="hide">ログアウト</button>
<!--
    <button id="teacher">教師用ページ</button>
-->
    </div>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'

export default {
  name: 'HelloWorld',
  data () {
    return {
      user: '',
      classnumber: '',
      password: ''
    }
  },
  methods: {
    async login () {
      var res = await AuthenticationService.login({
        'user': this.user,
        'classnumber': this.classnumber,
        'password': this.password
      })
      console.log(res)
      this.$router.push('/DrawImage')
    },
    async newuser () {
      var res = await AuthenticationService.register({
        'user': this.user,
        'classnumber': this.classnumber,
        'password': this.password
      })
      console.log(res)
    },
    async login_teacher () {
      var res = await AuthenticationService.login_teacher({
        'user': this.user,
        'classnumber': this.classnumber,
        'password': this.password
      })
      console.log(res)
      this.$router.push('/MakeSample')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.header-title {
      padding: 12px;
      margin-bottom: 50px;
      font-size: 30px;
      border-bottom: 1px solid #aaa;
      text-align: center;
    }
    .body{
      background: #F2F2F2;
    }

    @import url(https://fonts.googleapis.com/css?family=Roboto:300);

    .login-page {
      width: 360px;
      padding: 3% 0 0;
      margin: auto;
    }
    .form {
      position: relative;
      z-index: 1;
      background: #FFFFFF;
      max-width: 360px;
      margin: 0 auto 100px;
      padding: 45px;
      text-align: center;
      box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);
    }
    .form input {
      font-family: "Roboto", sans-serif;
      outline: 0;
      background: #f2f2f2;
      width: 100%;
      border: 0;
      margin: 0 0 15px;
      padding: 15px;
      box-sizing: border-box;
      font-size: 14px;
    }
    .form button {
      font-family: "Roboto", sans-serif;
      text-transform: uppercase;
      margin: 0 0 5px;
      outline: 0;
      background: #58ACFA;
      width: 100%;
      border: 0;
      padding: 15px;
      color: #FFFFFF;
      font-size: 14px;
      -webkit-transition: all 0.3 ease;
      transition: all 0.3 ease;
      cursor: pointer;
    }
    .form button:hover,.form button:active,.form button:focus {
      background: #00BFFF;
    }
    #teacher {
      color: #FFFFFF;
      background: #00FF00;
    }
</style>

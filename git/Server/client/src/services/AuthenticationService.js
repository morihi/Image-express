import Api from '@/services/Api'

export default {
  login (credentials) {
    return Api().post('register/login', credentials)
  },
  register (credentials) {
    return Api().post('register', credentials)
  },
  login_teacher (credentials) {
    return Api().post('register/login/teacher', credentials)
  }
}

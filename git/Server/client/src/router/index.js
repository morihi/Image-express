import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Login from '@/components/Login'
import DrawImage from '@/components/drawimage'
import MakeSample from '@/components/makesample'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/DrawImage',
      name: 'drawimage',
      component: DrawImage
    },
    {
      path: '/MakeSample',
      name: 'makesample',
      component: MakeSample
    }
  ]
})

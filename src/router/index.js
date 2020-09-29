import Vue from 'vue'
import VueRouter from 'vue-router'
import MovieRouter from './movie'
import MineRouter from './cinema'
import CinemaRouter from './mine'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  // base: process.env.BASE_URL,
  base: 'miaomiao',
  routes: [
    MovieRouter,
    MineRouter,
    CinemaRouter,
    {
      path: '/*',
      redirect: '/movie'
    }
  ]
})

export default router

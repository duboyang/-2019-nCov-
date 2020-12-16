import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
//引入简介页面
import Introduction from '../views/Introduction.vue'
import guowai from '../views/guowai.vue'
import keshihua from '../views/keshihua.vue'
import ceshi from '../echarts/ceshi.vue'

Vue.use(VueRouter)

const routes = [
  //首页
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  //简介
  {
    path: '/introduction',
    component: Introduction
  },
  {
    path: '/guowai',
    component: guowai
  },
  {
    path: '/keshihua',
    component: keshihua
  },
  {
    path: '/ceshi',
    component: ceshi
  },
]

const router = new VueRouter({
  routes
})

export default router

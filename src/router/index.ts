import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Detail from '../views/Detail.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: '/blog'
    },
    {
      path: '/blog',
      name: 'home',
      component: Home
    },
    {
      path: '/detail/:fileName',
      name: 'Detail',
      component: Detail,
      props: true
    }
  ]
})

export default router

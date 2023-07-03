import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Detail from '../views/Detail.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
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

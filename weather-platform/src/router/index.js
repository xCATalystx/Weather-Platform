import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
// import TownPage from '../views/TownPage.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/CountyWeather',
    name: 'CountyWeather',
    component: () => import('@/views/Home.vue')
  },
  {
    path: '/TownWeather',
    name: 'TownWeather',
    component: () => import('@/views/TownPage.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

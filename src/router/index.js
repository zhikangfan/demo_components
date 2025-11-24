import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView/index.vue'
import GridView from '../views/Grid.vue'
import Demo2 from '@/views/Demo2.vue'
import Demo3 from '@/views/Demo3.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      // component: HomeView,
      component: GridView,
    },
    {
      path: '/demo2',
      name: 'Demo2',
      // component: HomeView,
      component: Demo2,
    },
    {
      path: '/demo3',
      name: 'Demo3',
      // component: HomeView,
      component: Demo3,
    },
  ],
})
router.beforeEach(async (to, from, next) => {
  next()
})
export default router

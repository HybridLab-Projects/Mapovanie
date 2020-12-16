import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    name: 'Home',
    path: '/',
    component: () => import('@/views/Home.vue'),
  },
  {
    name: 'Form',
    path: '/form',
    component: () => import('@/views/Form.vue'),
  },
  {
    name: 'Success',
    path: '/success',
    component: () => import('@/views/Success.vue'),
  },
  {
    name: 'Fail',
    path: '/fail',
    component: () => import('@/views/Fail.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;

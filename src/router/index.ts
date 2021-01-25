import { createRouter, createWebHashHistory } from '@ionic/vue-router';
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
    beforeEnter(to, from, next) {
      if (!to.params.image
      || !to.params.deviceLocation) {
        next({ name: 'Home' });
      } else {
        next();
      }
    },
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
  history: createWebHashHistory(process.env.BASE_URL),
  routes,
});

export default router;

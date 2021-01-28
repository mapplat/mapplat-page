import { createRouter, createWebHistory } from 'vue-router';
import { logout } from '@/utils/utils';
import Desktop from '@/components/desktop';

const routes = [
  {
    path: '/',
    name: 'desktop',
    component: Desktop,
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component() {
      return import(/* webpackChunkName: "about" */ '@/views/About.vue');
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, from, next) => {
  if (router.$user) {
    return next();
  }
  return logout();
});

export default router;

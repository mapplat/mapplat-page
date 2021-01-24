import { createRouter, createWebHashHistory } from 'vue-router';
import Home from '../views/Home.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component() {
      return import(/* webpackChunkName: "about" */ '../views/About.vue');
    },
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

// router.beforeEach(async (to, from, next) => {
//   let userinfo = localStorage.getItem('userinfo');
//   if (userinfo) {
//     userinfo = JSON.parse(userinfo);
//     const { meta } = to;
//     if (meta && meta.role) {
//       if (meta.role.indexOf(userinfo.role) === -1) {
//         router.push({
//           path: '/no-authority',
//         });
//         return;
//       }
//     }
//     return next();
//   }
//   logout(to.path);
// });

export default router;

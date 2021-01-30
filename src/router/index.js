import { createRouter, createWebHistory } from 'vue-router';
import { logout } from '@/utils/utils';
import Desktop from '@/components/desktop';
import Datasets from '@/components/datasets';
import Maps from '@/components/maps';

const breadcrumbsConf = {
  'my-data': [{
    name: '数据',
    path: '/desktop/datasets',
  },
  {
    name: '我的数据',
    path: '/desktop/datasets/my-data',
  }],
  'my-map': [{
    name: '地图',
    path: '/desktop/maps',
  },
  {
    name: '我的数据',
    path: '/desktop/maps/my-map',
  }],
};

const routes = [
  // {
  //   path: '/',
  //   redirect: (to) => {
  //     console.log(to);
  //     return { path: '/desktop' };
  //   },
  // },
  {
    path: '/desktop',
    name: 'desktop',
    component: Desktop,
    children: [{
      path: 'datasets/my-data',
      name: 'my-data',
      component: Datasets,
      meta: { breadcrumbs: breadcrumbsConf['my-data'] },
    },
    {
      path: 'maps/my-map',
      name: 'my-map',
      component: Maps,
      meta: { breadcrumbs: breadcrumbsConf['my-map'] },
    },
    {
      path: '',
      redirect: () => ({ name: 'my-data' }),
    },
    {
      path: 'maps/:others*',
      redirect: () => ({ name: 'my-map' }),
    },
    {
      path: 'datasets/:others*',
      redirect: () => ({ name: 'my-data' }),
    },
    ],
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

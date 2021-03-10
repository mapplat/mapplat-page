import { createRouter, createWebHistory } from 'vue-router';
import { logout } from '@/utils/utils';
import Desktop from '@/components/desktop';
import Datasets from '@/components/datasets';
import Maps from '@/components/maps';
import Profile from '@/components/profile';

const breadcrumbsConf = {
  datasets: [{
    name: '数据',
    path: '/datasets',
  },
  {
    name: '我的数据',
    path: '/datasets/my-data',
  }, {
    name: '公共数据',
    path: '/datasets/public-data',
  }],
  'my-map': [{
    name: '地图',
    path: '/maps',
  },
  {
    name: '我的地图',
    path: '/maps/my-map',
  }],
  profile: [{
    name: '个人中心',
    path: '/profile',
  }],
};

const routes = [
  {
    path: '/',
    redirect: () => ({ path: '/datasets' }),
  },
  {
    path: '/datasets',
    name: 'datasets',
    component: Desktop,
    children: [{
      path: '/datasets/my-data',
      name: 'my-data',
      component: Datasets,
      meta: { breadcrumbs: breadcrumbsConf.datasets, activePath: '/datasets' },
    }, {
      path: '/datasets/public-data',
      name: 'public-data',
      component: Datasets,
      meta: { breadcrumbs: breadcrumbsConf.datasets, activePath: '/datasets' },
    },
    {
      path: '/datasets/:others*',
      redirect: () => ({ name: 'my-data' }),
    }],
  },
  {
    path: '/maps',
    name: 'maps',
    component: Desktop,
    children: [{
      path: '/maps/my-map',
      name: 'my-map',
      component: Maps,
      meta: { breadcrumbs: breadcrumbsConf['my-map'], activePath: '/maps' },
    },
    {
      path: '/maps/:others*',
      redirect: () => ({ name: 'my-map' }),
    }],
  },
  {
    path: '/profile',
    component: Desktop,
    children: [{
      path: '',
      name: 'profile',
      component: Profile,
      meta: { breadcrumbs: breadcrumbsConf.profile, activePath: '/profile' },
    }],
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

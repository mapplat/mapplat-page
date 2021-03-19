import { createRouter, createWebHistory } from 'vue-router';
import { logout } from '@/utils/utils';
import Desktop from '@/components/desktop';
import Datasets from '@/components/datasets';
import MyData from '@/components/datasets/my-data';
import PublicData from '@/components/datasets/public-data';
import Maps from '@/components/maps';
import MyMap from '@/components/maps/my-map';
import PublicMap from '@/components/maps/public-map';
import Profile from '@/components/profile';

const breadcrumbsConf = {
  'my-data': [{
    name: _t('message.data'),
    path: '/datasets/my-data',
  }, {
    name: _t('message.my_data'),
    path: '/datasets/my-data',
  }],
  'public-data': [{
    name: _t('message.data'),
    path: '/datasets/public-data',
  }, {
    name: _t('message.public_data'),
    path: '/datasets/public-data',
  }],
  'my-map': [{
    name: _t('message.map'),
    path: '/maps/my-map',
  }, {
    name: _t('message.my_map'),
    path: '/maps/my-map',
  }],
  'public-map': [{
    name: _t('message.map'),
    path: '/maps/public-map',
  }, {
    name: _t('message.public_map'),
    path: '/maps/public-map',
  }],
  profile: [{
    name: _t('message.profile'),
    path: '/profile',
  }],
};

const routes = [{
  path: '/',
  name: 'desktop',
  component: Desktop,
  children: [{
    path: '',
    redirect: () => ({ path: '/datasets' }),
  }, {
    path: '/datasets',
    name: 'datasets',
    component: Datasets,
    children: [{
      path: '',
      redirect: () => ({ path: '/datasets/my-data' }),
    }, {
      path: 'my-data',
      name: 'my-data',
      component: MyData,
      meta: { breadcrumbs: breadcrumbsConf['my-data'], activePath: '/datasets' },
    }, {
      path: 'public-data',
      name: 'public-data',
      component: PublicData,
      meta: { breadcrumbs: breadcrumbsConf['public-data'], activePath: '/datasets' },
    }],
  }, {
    path: '/maps',
    name: 'maps',
    component: Maps,
    children: [{
      path: '',
      redirect: () => ({ path: '/maps/my-map' }),
    }, {
      path: 'my-map',
      name: 'my-map',
      component: MyMap,
      meta: { breadcrumbs: breadcrumbsConf['my-map'], activePath: '/maps' },
    }, {
      path: 'public-map',
      name: 'public-map',
      component: PublicMap,
      meta: { breadcrumbs: breadcrumbsConf['public-map'], activePath: '/maps' },
    }],
  }, {
    path: '/profile',
    name: 'profile',
    component: Profile,
    meta: { breadcrumbs: breadcrumbsConf.profile, activePath: '/profile' },
  }, {
    path: '/:pathMatch(.*)*',
    redirect: () => ({ path: '/datasets' }),
  }],
}];

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

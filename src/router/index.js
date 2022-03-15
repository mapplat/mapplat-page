import { createRouter, createWebHistory } from 'vue-router';
import Desktop from '@/views/Desktop.vue';
import Sign from '@/views/Sign.vue';
import Datasets from '@/components/datasets/index.vue';
import MyData from '@/components/datasets/my-data.vue';
import PublicData from '@/components/datasets/public-data.vue';
import Maps from '@/components/maps/index.vue';
import MyMap from '@/components/maps/my-map.vue';
import PublicMap from '@/components/maps/public-map.vue';
import Profile from '@/components/profile/index.vue';
import Mapviz from '@/components/mapviz/index.vue';

const breadcrumbsConf = {
  'my-data': [{
    name: $t('message.data'),
    path: '/datasets/my-data',
  }, {
    name: $t('message.my_data'),
    path: '/datasets/my-data',
  }],
  'public-data': [{
    name: $t('message.data'),
    path: '/datasets/public-data',
  }, {
    name: $t('message.public_data'),
    path: '/datasets/public-data',
  }],
  'my-map': [{
    name: $t('message.map'),
    path: '/maps/my-map',
  }, {
    name: $t('message.my_map'),
    path: '/maps/my-map',
  }],
  'public-map': [{
    name: $t('message.map'),
    path: '/maps/public-map',
  }, {
    name: $t('message.public_map'),
    path: '/maps/public-map',
  }],
  profile: [{
    name: $t('message.profile'),
    path: '/profile',
  }],
};

const routes = [{
  path: '/',
  name: 'Desktop',
  component: Desktop,
  children: [{
    path: '',
    redirect: () => ({ path: '/datasets' }),
  }, {
    path: '/datasets',
    name: 'data-sets',
    component: Datasets,
    children: [{
      path: '',
      name: 'my-data',
      component: MyData,
      meta: { breadcrumbs: breadcrumbsConf['my-data'], activePath: '/datasets' },
      alias: ['my-data'],
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
      name: 'my-map',
      component: MyMap,
      meta: { breadcrumbs: breadcrumbsConf['my-map'], activePath: '/maps' },
      alias: ['my-map'],
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
  }],
}, {
  path: '/sign',
  name: 'sign',
  component: Sign,
}, {
  path: '/mapviz/:mapid',
  name: 'mapviz',
  component: Mapviz,
}, {
  path: '/:pathMatch(.*)*',
  redirect: () => ({ path: '/datasets' }),
}];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, from, next) => {
  const userInfo = router.$user;
  if (to.meta && to.meta.title) document.title = to.meta.title;
  if (to.name !== 'sign' && !userInfo) {
    next({
      name: 'sign',
    });
  }
  next();
});

export default router;

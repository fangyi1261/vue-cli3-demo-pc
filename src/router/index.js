import Vue from 'vue';
import VueRouter from 'vue-router';

import store from '@/vuex';
import homeRoutes from './home.js';
import Home from '@/views/Home.vue';
import Main from '@/views/main/Index.vue';

// eslint-disable-next-line no-unused-vars
import getMenus from '../utils/requestMenu';

Vue.use(VueRouter);

export const constantRouterMap = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/LoginCopy.vue')
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/404.vue')
  },
  {
    path: '/',
    component: Home,
    children: [
      {
        path: '/',
        name: 'main',
        value: '空白页',
        hidden: false,
        icon: 'news',
        component: Main
      },
      ...homeRoutes
    ]
  }
];

const router = new VueRouter({
  routes: constantRouterMap
});

if (process.env.NODE_ENV !== 'development') {
  router.beforeEach(async (to, from, next) => {
    getMenus(to, from, next);
  });
}

router.afterEach(to => {
  const path = to.path;
  const navList = store.getters.navs;
  const flag = navList.some(_nav => _nav.path === path);

  if (!flag) {
    const nav = homeRoutes.filter(_route => _route.path === path)[0];

    if (nav) {
      store.dispatch('addNav', nav);
    }
  }
});

export default router;

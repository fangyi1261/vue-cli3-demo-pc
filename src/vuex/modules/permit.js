import { constantRouterMap } from '../../router/index';
import { menus } from '@/router/home';
import ComAPI from '@/api/common';

import { filterMenu } from '@/utils/filterMenus';

const permission = {
  state: {
    routers: constantRouterMap,
    asyncRouters: [],
    homeRouters: [],
    hasPermissionMenu: ['/'],
    // times: 0,
    routes: menus
  },
  mutations: {
    SET_ROUTERS: (state, homeRouters) => {
      state.hasPermissionMenu = homeRouters;
      // state.homeRouters = homeRouters;
      // state.routes = constantRouterMap.concat(homeRouters);
    },
    SET_MENUS: (state, list) => {
      state.routes = list;
    }
    // SET_TIMES: (state, payload) {
    //   state.times = payload.times;
    // }
  },
  actions: {
    async generateRoutes({ commit }) {
      const res = await $http.post(ComAPI.getMenus);

      // 拿到所有菜单url数组集合
      const menuList = res.result;
      const val = res.result;

      const list = [];

      menuList.forEach(item => {
        item.children.forEach(child => {
          list.push(child.url);
        });
      });
      // 匹配菜单
      const afterRouteList = filterMenu(val, menus);

      commit('SET_MENUS', afterRouteList);
      commit('SET_ROUTERS', list);
      return res.result;
    }
  }
};

export default permission;

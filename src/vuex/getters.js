const getters = {
  token: state => state.user.token,
  roles: state => state.user.roles,
  userId: state => state.user.userId,
  userName: state => state.user.userName,
  umAccount: state => state.user.umAccount,

  // 权限
  routers: state => state.permit.routers,
  homeRouters: state => state.permit.homeRouters,
  asyncRouters: state => state.permit.asyncRouters,
  hasPermissionMenu: state => state.permit.hasPermissionMenu,
  routes: state => state.permit.routes,

  // 标签导航
  navs: state => state.navs.navLists,
  activeNav: state => state.navs.activeNav
};

export default getters;

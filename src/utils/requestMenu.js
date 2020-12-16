import Vue from 'vue';
import store from '../vuex';

export default function getMenu(to, from, next) {
  let list = [];

  store.dispatch('generateRoutes').then(() => {
    list = store.getters.hasPermissionMenu;
    if (list.indexOf(to.name) === -1 && to.path !== '/') {
      Vue.prototype.$message({
        message: '该用户无可访问内容，请用管理员赋予权限',
        type: 'warning'
      });
      if (from.name === null) {
        return next('/');
      } else {
        return next(false);
      }
    } else {
      return next();
    }
  });
}

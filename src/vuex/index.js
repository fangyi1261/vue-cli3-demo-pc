import Vue from 'vue';
import Vuex from 'vuex';

import user from './modules/user';
import permit from './modules/permit';
import navs from './modules/navs';

import getters from './getters';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    user,
    permit,
    navs
  },
  getters
});


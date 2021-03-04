import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './vuex';
import http from '@/api/index';

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import './filter';
import './directive';
import '@/style/reset.scss';

import 'animate.css';

import '@/api/common/mock.js';

Vue.use(ElementUI);

Vue.config.productionTip = false;
window._vue = Vue;
window.$http = http;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');

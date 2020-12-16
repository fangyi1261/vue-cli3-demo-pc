import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './vuex';

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import './filter';
import './directive';
import '@/style/reset.scss';

Vue.use(ElementUI);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import axios from 'axios'
Vue.prototype.axios = axios;

/* 图片格式过滤器 */
Vue.filter('setWH', (url, arg) => {
  return (url.replace(/w\.h/, '')).concat(arg);
});

Vue.filter('setWHC', (url, arg) => {
  return url.replace(/w\.h/, arg);
});

import Scroller from '@/components/Scroller'
Vue.component('Scroller', Scroller)

import Loading from '@/components/Loading'
Vue.component("Loading", Loading)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

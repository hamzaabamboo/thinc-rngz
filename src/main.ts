import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from '@/common/store';
import 'bulma/css/bulma.css';
import './style/thinc.css';
import './style/font-awesome.css';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');

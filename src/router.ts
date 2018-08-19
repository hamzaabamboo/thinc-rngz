import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/modules/home/index.vue';
import Add from '@/modules/add/index.vue';
import Remote from '@/modules/remote/index.vue';
import Login from '@/modules/login/index.vue';
import Control from '@/modules/control/index.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/add',
      name: 'Add',
      component: Add
    },
    {
      path: '/remote',
      name: 'Remote',
      component: Remote
    },
    {
      path: '/control',
      name: 'Control Panel',
      component: Control
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    }
  ]
});

import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/modules/home';
import Add from '@/modules/add';
import Remote from '@/modules/remote';
import Login from '@/modules/login';
import Control from '@/modules/control';

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

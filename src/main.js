/*=========================================================================================
  File Name: main.js
  Description: main vue(js) file
  ----------------------------------------------------------------------------------------
  Item Name: Vuesax Admin - VueJS Dashboard Admin Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/


import Vue from 'vue';
import App from './App.vue';

// Vuesax Component Framework
import Vuesax from 'vuesax';
import 'material-icons/iconfont/material-icons.css'; //Material Icons
import 'vuesax/dist/vuesax.css'; // Vuesax

Vue.use(Vuesax);

import axios from 'axios';
import VueAxios from 'vue-axios';
axios.defaults.baseURL = process.env.VUE_APP_URL;
axios.defaults.headers.common['Accept'] = 'application/json';
axios.defaults.headers.common['Content-Type'] = 'application/json';

let access_token = localStorage.getItem('access_token');

if (access_token) {
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + access_token;
}

Vue.use(VueAxios, axios);

import AuthPlugin from "./plugins/auth";
Vue.use(AuthPlugin);


// Theme Configurations
import '../themeConfig.js';


// Globally Registered Components
import './globalComponents.js';


// Styles: SCSS
import './assets/scss/main.scss';


// Tailwind
import '@/assets/css/main.css';


// Vue Router
import router from './router';


// Vuex Store
import store from './store/store';


// Vuesax Admin Filters
import './filters/filters';


// Vuejs - Vue wrapper for hammerjs
import { VueHammer } from 'vue2-hammer';
Vue.use(VueHammer);


// PrismJS
import 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';


// Feather font icon
require('./assets/css/iconfont.css');


// VeeValidate
import VeeValidate from 'vee-validate';
Vue.use(VeeValidate);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');

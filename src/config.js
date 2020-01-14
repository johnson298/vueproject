import axios from 'axios';
import VueAxios from 'vue-axios';
import Vue from 'vue';

axios.defaults.baseURL = process.env.VUE_APP_URL;
axios.defaults.headers.common['Accept'] = 'application/json';
axios.defaults.headers.common['Content-Type'] = 'application/json';

let access_token = localStorage.getItem('access_token');

if (access_token) {
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + access_token;
}

Vue.use(VueAxios, axios);

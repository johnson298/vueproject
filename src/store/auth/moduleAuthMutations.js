/*=========================================================================================
  File Name: moduleAuthMutations.js
  Description: Auth Module Mutations
  ----------------------------------------------------------------------------------------
  Item Name: Vuesax Admin - VueJS Dashboard Admin Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/
import Vue from 'vue';

export default {
  UPDATE_AUTHENTICATED_USER(state, user) {
    state.currentUser = user;
    localStorage.setItem('user', JSON.stringify(user));
  },
  UPDATE_TOKEN(state, access_token) {
    localStorage.setItem('access_token', access_token);
    Vue.axios.defaults.headers.common['Authorization'] = 'Bearer ' + access_token;
  }
};

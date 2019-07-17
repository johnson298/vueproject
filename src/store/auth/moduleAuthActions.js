/*=========================================================================================
  File Name: moduleAuthActions.js
  Description: Auth Module Actions
  ----------------------------------------------------------------------------------------
  Item Name: Vuesax Admin - VueJS Dashboard Admin Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/
import router from '@/router';
import Vue from 'vue';
export default {
  login({ commit, state, dispatch}, payload) {

    // If user is already logged in notify and exit
    if (state.isUserLoggedIn()) {
      payload.notify({
        title: 'Login Attempt',
        text: 'You are already logged in!',
        iconPack: 'feather',
        icon: 'icon-alert-circle',
        color: 'warning'
      });
      return false;
    }

    // Try to sigin
    Vue.axios.post('auth/login', {
      email: payload.userDetails.email,
      password: payload.userDetails.password
    }).then((result) => {
      // Set FLAG username update required for updating username
      let isUsernameUpdateRequired = false;
      // if username update is not required
      // just reload the page to get fresh data
      // set new user data in localstorage
      if(!isUsernameUpdateRequired) {
        // router.push(router.currentRoute.query.to || '/');
        commit('UPDATE_TOKEN', result.data.data.access_token);
        dispatch('updateUser', {
          isReloadRequired: true,
          notify: payload.notify
        });
      }
    }).catch(error => {
      payload.notify({
        time: 3000,
        title: 'Error!',
        text: error.response.status === 401 ? error.response.data.error.message : 'Error',
        iconPack: 'feather',
        icon: 'icon-alert-circle',
        color: 'danger'
      });
    });
  },
  updateUser({ commit }, payload) {
    Vue.axios.get('me').then((res) => {
      commit('UPDATE_AUTHENTICATED_USER', res.data.data);
      // If reload is required to get fresh data after update
      // Reload currentz page
      if(payload.isReloadRequired) {
        router.push(router.currentRoute.query.to || '/');
      }
    }).catch(() => {
      payload.notify({
        time: 8800,
        title: 'Error',
        text: 'Error',
        iconPack: 'feather',
        icon: 'icon-alert-circle',
        color: 'danger'
      });
    });
  },
  updateAuthenticatedUser({ commit }, payload) {
    commit('UPDATE_AUTHENTICATED_USER', payload);
  }
};

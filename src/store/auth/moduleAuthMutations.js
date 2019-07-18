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

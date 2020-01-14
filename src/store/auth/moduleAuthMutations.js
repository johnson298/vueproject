import Vue from 'vue';
import store from '../store';

export default {
  UPDATE_AUTHENTICATED_USER(state, user) {
    state.currentUser = user;
    localStorage.setItem('user', JSON.stringify(user));
  },
  UPDATE_TOKEN(state, {access_token, branch_id}) {
    localStorage.setItem('access_token', access_token);
    localStorage.setItem('defaultBranch', branch_id);
    store.dispatch('changeBranchData', localStorage.getItem('branchId') ? localStorage.getItem('branchId') : branch_id);
    Vue.axios.defaults.headers.common['Authorization'] = 'Bearer ' + access_token;
  }
};

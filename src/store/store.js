import Vue from 'vue';
import Vuex from 'vuex';

import state from "./state";
import getters from "./getters";
import mutations from "./mutations";
import actions from "./actions";
import moduleAuth from './auth/moduleAuth.js';
import moduleEmployees from './employees/module';
import moduleStudents from './students/module';

Vue.use(Vuex);

export default new Vuex.Store({
  getters,
  mutations,
  state,
  actions,
  modules: {
    auth: moduleAuth,
    employees: moduleEmployees,
    students: moduleStudents,
  },
  strict: process.env.NODE_ENV !== 'production'
});

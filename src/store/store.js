import Vue from 'vue';
import Vuex from 'vuex';

import state from "./state";
import getters from "./getters";
import mutations from "./mutations";
import actions from "./actions";
import moduleAuth from './auth/moduleAuth.js';
import moduleEmployees from './employees/module';
import moduleStudents from './students/module';
import modulePrograms from './programs/module';
import moduleBranches from './branches/module';
import moduleCourses from  './courses/module';

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
    programs: modulePrograms,
    branches: moduleBranches,
    courses : moduleCourses,
  },
  strict: process.env.NODE_ENV !== 'production'
});

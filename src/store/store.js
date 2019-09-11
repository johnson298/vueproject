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
import moduleCoupons from './coupons/module';
import moduleCourses from  './courses/module';
import moduleTeachers from './teachers/module';
import moduleRegisters from  './registers/module';
import moduleCalendar from  './calendar/moduleCalendar';
import moduleRooms from  './rooms/module';
import moduleInvoices from  './invoices/module';
import moduleCustomer from './customer/module';
import moduleCustomerCare from './customer_care/module';
import moduleCampaign from  './campaign/module';
import moduleCoursesEmployee from './courses_register/module';
import moduleExpense from './expense/module';

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
    coupons: moduleCoupons,
    courses : moduleCourses,
    teachers : moduleTeachers,
    registers : moduleRegisters,
    invoices : moduleInvoices,
    calendar : moduleCalendar,
    rooms : moduleRooms,
    customer : moduleCustomer,
    customer_care : moduleCustomerCare,
    campaign : moduleCampaign,
    courses_register : moduleCoursesEmployee,
    expense : moduleExpense,
  },
  strict: process.env.NODE_ENV !== 'production'
});

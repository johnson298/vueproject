export default {
  // Nhân viên
  UPDATE_TABLE(state, payload) {
    state.users = payload.users;
    state.pagination = payload.pagination;
  },
  UPDATE_ORDER(state, payload) {
    state.order = payload.order;
  },
  UPDATE_SEARCH(state, payload) {
    state.searchTerm = payload.searchTerm;
  },
  UPDATE_VIEWS(state, payload) {
    state.views[payload.index].viewable = payload.viewable;
  },
  UPDATE_NEED_RELOAD(state, payload) {
    state.needReload = payload;
  },
  RESET(state) {
    state.users = [];
  },

  // Học viên
  UPDATE_TABLE_STUDENTS(state, payload) {
    state.students = payload.students;
    state.paginationStudents = payload.paginationStudents;
  },
  UPDATE_ORDER_STUDENTS(state, payload) {
    state.orderStudents = payload.orderStudents;
  },
  UPDATE_SEARCH_STUDENTS(state, payload) {
    state.searchTermStudents = payload.searchTermStudents;
  },
  UPDATE_VIEWS_STUDENTS(state, payload) {
    state.views[payload.index].viewableStudents = payload.viewableStudents;
  },
  UPDATE_NEED_RELOAD_STUDENTS(state, payload) {
    state.needReloadStudents = payload;
  },
  RESET_STUDENTS(state) {
    state.students = [];
  },

  // Lớp học
  UPDATE_TABLE_COURSES(state, payload) {
    state.usersCourses = payload.usersCourses;
    state.paginationCourses = payload.paginationCourses;
  },
  UPDATE_ORDER_COURSES(state, payload) {
    state.orderCourses = payload.orderCourses;
  },
  UPDATE_SEARCH_COURSES(state, payload) {
    state.searchTermCourses = payload.searchTermCourses;
  },
  UPDATE_VIEWS_COURSES(state, payload) {
    state.views[payload.index].viewableCourses = payload.viewableCourses;
  },
  UPDATE_NEED_RELOAD_COURSES(state, payload) {
    state.needReloadCourses = payload;
  },
  RESET_COURSES(state) {
    state.usersCourses = [];
  },

  // Thu chi
  UPDATE_TABLE_MONEY(state, payload) {
    state.money = payload.money;
    state.paginationMoney = payload.paginationMoney;
  },
  UPDATE_ORDER_MONEY(state, payload) {
    state.orderMoney = payload.orderMoney;
  },
  UPDATE_SEARCH_MONEY(state, payload) {
    state.searchTermMoney = payload.searchTermMoney;
  },
  UPDATE_VIEWS_MONEY(state, payload) {
    state.views[payload.index].viewableMoney = payload.viewableMoney;
  },
  UPDATE_NEED_RELOAD_MONEY(state, payload) {
    state.needReloadMoney = payload;
  },
  RESET_MONEY(state) {
    state.usersMoney = [];
  }
};

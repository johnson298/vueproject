export default {
  // nhân viên
  updateTable({ commit }, payload) {
    commit("UPDATE_TABLE", payload);
  },
  updateOrder({ commit }, payload) {
    commit("UPDATE_ORDER", payload);
  },
  updateSearch({ commit }, payload) {
    commit("UPDATE_SEARCH", payload);
  },
  updateViews({ commit }, payload) {
    commit("UPDATE_VIEWS", payload);
  },
  updateNeedReload({ commit }, payload) {
    commit("UPDATE_NEED_RELOAD", payload);
  },

  // học viên
  updateTableStudents({ commit }, payload) {
    commit("UPDATE_TABLE_STUDENTS", payload);
  },
  updateOrderStudents({ commit }, payload) {
    commit("UPDATE_ORDER_STUDENTS", payload);
  },
  updateSearchStudents({ commit }, payload) {
    commit("UPDATE_SEARCH_STUDENTS", payload);
  },
  updateViewsStudents({ commit }, payload) {
    commit("UPDATE_VIEWS_STUDENTS", payload);
  },
  updateNeedReloadStudents({ commit }, payload) {
    commit("UPDATE_NEED_RELOAD_STUDENTS", payload);
  },

  // lớp học
  updateTableCourses({ commit }, payload) {
    commit("UPDATE_TABLE_COURSES", payload);
  },
  updateOrderCourses({ commit }, payload) {
    commit("UPDATE_ORDER_COURSES", payload);
  },
  updateSearchCourses({ commit }, payload) {
    commit("UPDATE_SEARCH_COURSES", payload);
  },
  updateViewsCourses({ commit }, payload) {
    commit("UPDATE_VIEWS_COURSES", payload);
  },
  updateNeedReloadCourses({ commit }, payload) {
    commit("UPDATE_NEED_RELOAD_COURSES", payload);
  },

  // thu chi
  updateTableMoney({ commit }, payload) {
    commit("UPDATE_TABLE_MONEY", payload);
  },
  updateOrderMoney({ commit }, payload) {
    commit("UPDATE_ORDER_MONEY", payload);
  },
  updateSearchMoney({ commit }, payload) {
    commit("UPDATE_SEARCH_MONEY", payload);
  },
  updateViewsMoney({ commit }, payload) {
    commit("UPDATE_VIEWS_MONEY", payload);
  },
  updateNeedReloadMoney({ commit }, payload) {
    commit("UPDATE_NEED_RELOAD_MONEY", payload);
  }
};

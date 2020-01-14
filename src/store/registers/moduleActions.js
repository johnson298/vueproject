export default {
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
  hiddenCreatedAt({ commit }, payload) {
    commit("HIDDEN_CREATED_AT", payload);
  },
  updateAttendance({ commit }, payload) {
    commit("UPDATE_ATTENDACE", payload);
  }
};

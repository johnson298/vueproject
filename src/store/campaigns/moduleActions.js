export default {
  updateTable({ commit}, payload) {
    commit('UPDATE_TABLE', payload);
  },
  updateOrder({ commit}, payload) {
    commit('UPDATE_ORDER', payload);
  },
  updateSearch({ commit}, payload) {
    commit('UPDATE_SEARCH', payload);
  },
  updateViews({ commit}, payload) {
    commit('UPDATE_VIEWS', payload);
  },
  updateNeedReload({ commit}, payload) {
    commit('UPDATE_NEED_RELOAD', payload);
  },
  updateTableEvaluate({ commit}, payload) {
    commit('UPDATE_TABLE_EVALUATE', payload);
  },
  updateOrderEvaluate({ commit}, payload) {
    commit('UPDATE_ORDER_EVALUATE', payload);
  },
  updateSearchEvaluate({ commit}, payload) {
    commit('UPDATE_SEARCH_EVALUATE', payload);
  },
  updateViewsEvaluate({ commit}, payload) {
    commit('UPDATE_VIEWS_EVALUATE', payload);
  },
  updateNeedReloadEvaluate({ commit}, payload) {
    commit('UPDATE_NEED_RELOAD_EVALUATE', payload);
  },
  resetEvaluate({ commit }, payload) {
    commit('RESET_EVALUATE', payload);
  }
};

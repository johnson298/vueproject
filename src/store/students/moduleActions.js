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

  // invoice
  updateTableInvoice({ commit }, payload) {
    commit("UPDATE_TABLE_INVOICE", payload);
  },
  updateOrderInvoice({ commit }, payload) {
    commit("UPDATE_ORDER_INVOICE", payload);
  },
  updateSearchInvoice({ commit }, payload) {
    commit("UPDATE_SEARCH_INVOICE", payload);
  },
  updateViewsInvoice({ commit }, payload) {
    commit("UPDATE_VIEWS_INVOICE", payload);
  },
  updateNeedReloadInvoice({ commit }, payload) {
    commit("UPDATE_NEED_RELOAD_INVOICE", payload);
  }
};

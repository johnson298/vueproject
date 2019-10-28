export default {
  UPDATE_TABLE(state, payload) {
    state.students = payload.students;
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
  // eslint-disable-next-line
  RESET(state) {
    state.students = [];
  },

  // invoice
  UPDATE_TABLE_INVOICE(state, payload) {
    state.studentsInvoice = payload.studentsInvoice;
    state.paginationInvoice = payload.paginationInvoice;
  },
  UPDATE_ORDER_INVOICE(state, payload) {
    state.orderInvoice = payload.orderInvoice;
  },
  UPDATE_SEARCH_INVOICE(state, payload) {
    state.searchTermInvoice = payload.searchTermInvoice;
  },
  UPDATE_VIEWS_INVOICE(state, payload) {
    state.viewsInvoice[payload.index].viewable = payload.viewableInvoice;
  },
  UPDATE_NEED_RELOAD_INVOICE(state, payload) {
    state.needReloadInvoice = payload;
  },
  // eslint-disable-next-line
  RESET_INVOICE(state) {
    state.studentsInvoice = [];
  }
};

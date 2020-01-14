export default {
  UPDATE_TABLE(state, payload) {
    state.registers = payload.registers;
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
    state.registers = [];
  }
};

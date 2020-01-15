export default {

  // mutations notification
  UPDATE_TABLE(state, payload) {
    state.campaigns = payload.campaigns;
    state.pagination = payload.pagination;
  },
  UPDATE_ORDER(state, payload){
    state.order = payload.order;
  },
  UPDATE_SEARCH(state, payload){
    state.searchTerm = payload.searchTerm;
  },
  UPDATE_VIEWS(state, payload){
    state.views[payload.index].viewable = payload.viewable;
  },
  UPDATE_NEED_RELOAD(state, payload){
    state.needReload = payload;
  },
  RESET(state){
    state.notifications = [];
  },

  // mutations evaluate
  UPDATE_TABLE_EVALUATE(state, payload) {
    state.evaluates = payload.data;
    state.paginationEvaluate = payload.pagination;
  },
  UPDATE_ORDER_EVALUATE(state, payload){
    state.orderEvaluate = payload.order;
  },
  UPDATE_SEARCH_EVALUATE(state, payload){
    state.searchTermEvaluate = payload.searchTerm;
  },
  UPDATE_VIEWS_EVALUATE(state, payload){
    state.viewsEvaluate[payload.index].viewable = payload.viewable;
  },
  UPDATE_NEED_RELOAD_EVALUATE(state, payload){
    state.needReloadEvaluate = payload;
  },
  RESET_EVALUATE(state){
    state.evaluates = [];
  },

};

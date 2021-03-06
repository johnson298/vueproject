const actions = {

  // ////////////////////////////////////////////
  // SIDEBAR & UI UX
  // ////////////////////////////////////////////

  updateSidebarWidth({ commit }, width) {
    commit('UPDATE_SIDEBAR_WIDTH', width);
  },
  updateI18nLocale({ commit }, locale) {
    commit('UPDATE_I18N_LOCALE', locale);
  },
  toggleContentOverlay({ commit }) {
    commit('TOGGLE_CONTENT_OVERLAY');
  },
  updateTheme({ commit }, val) {
    commit('UPDATE_THEME', val);
  },
  updateUserRole({ commit }, val) {
    commit('UPDATE_USER_ROLE', val);
  },
  updateWindowWidth({ commit }, width) {
    commit('UPDATE_WINDOW_WIDTH', width);
  },


  // ////////////////////////////////////////////
  // COMPONENT
  // ////////////////////////////////////////////

  // VxAutoSuggest
  updateStarredPage({ commit }, payload) {
    commit('UPDATE_STARRED_PAGE', payload);
  },

  //  The Navbar
  arrangeStarredPagesLimited({ commit }, list) {
    commit('ARRANGE_STARRED_PAGES_LIMITED', list);
  },
  arrangeStarredPagesMore({ commit }, list) {
    commit('ARRANGE_STARRED_PAGES_MORE', list);
  },
  clearData({commit}){
    commit('employees/RESET');
    commit('students/RESET');
    commit('programs/RESET');
    commit('branches/RESET');
    commit('courses/RESET');
  },

  // change branch
  changeBranchData({ commit }, payload){
    commit('CHANGE_BRANCH', payload);
  },

  // change config 
  changeConfigs({ commit }, payload){
    commit('CHANGE_CONFIGS', payload);
  },

  // change config 
  changeConfigsField({ commit }, payload){
    commit('CHANGE_CONFIG_FIELD', payload);
  },

  addBranches({ commit }, payload){
    commit('ADD_BRANCHES', payload);
  }


};

export default actions;

export default {
  addEventToCalendar({ commit }, event) {
    commit("ADD_EVENT_TO_CALENDAR", event);
  },
  ediCalendarEvent({ commit }, event) {
    commit("EDIT_CALENDAR_EVENT", event);
  },
  removeCalendarEvent({ commit }, eventId) {
    commit("REMOVE_CALENDAR_EVENT", eventId);
  },

  // Simple Calendar Actions
  addEventToSimpleCalendar({ commit }, event) {
    commit("ADD_EVENT_TO_SIMPLE_CALENDAR", event);
  },
  editSimpleCalendarEvent({ commit }, event) {
    commit("EDIT_SIMPLE_CALENDAR_EVENT", event);
  },
  removeSimpleCalendarEvent({ commit }, eventId) {
    commit("REMOVE_SIMPLE_CALENDAR_EVENT", eventId);
  },
  simpleCalendarEventDragged({ commit }, payload) {
    commit("SIMPLE_CALENDAR_EVENT_DRAGGED", payload);
  },

  // table list
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
  }
};

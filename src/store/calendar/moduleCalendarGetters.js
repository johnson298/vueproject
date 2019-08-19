export default {
  eventById: state => (eventId) => state.calendarEvents.filter((event) => event.id == eventId)[0],

  // Simple Calendar Getters
  simpleCalendareventById: state => (eventId) => state.simpleCalendarEvents.filter((event) => event.id == eventId)[0],
};

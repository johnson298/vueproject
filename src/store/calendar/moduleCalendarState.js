export default {

  // Common Labels for both calendars
  calendarLabels: [
    { text: 'Lịch học' ,value : 'Lịch học', color: 'success' },
    { text: 'Ngày hiện tại', value: 'Ngày hiện tại', color: 'primary'},
  ],

  calendarEvents: [
    {
      id: 1,
      title: 'My Event',
      start: new Date(new Date() - 1000 * 60 * 60 * 24 * 3),
      end: new Date(new Date() - 1000 * 60 * 60 * 24 * 2),
      desc: 'demo event',
      cssClass: 'event-success',
      label: 'business'
    },
  ],

  // Simple Calendar State
  simpleCalendarEvents: [
    {
      id: 1,
      title: 'My Event',
      startDate: new Date(new Date() - 1000 * 60 * 60 * 24 * 3),
      endDate: new Date(new Date() - 1000 * 60 * 60 * 24 * 2),
      url: '',
      classes: 'event-success',
      label: 'business'
    },
  ]
};

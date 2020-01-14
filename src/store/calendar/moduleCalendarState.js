export default {
  // Common Labels for both calendars
  calendarLabels: [
    { text: "Lịch học", value: "Lịch học", color: "success" },
    { text: "Ngày hiện tại", value: "Ngày hiện tại", color: "primary" }
  ],

  calendarEvents: [
    {
      id: 1,
      title: "My Event",
      start: new Date(new Date() - 1000 * 60 * 60 * 24 * 3),
      end: new Date(new Date() - 1000 * 60 * 60 * 24 * 2),
      desc: "demo event",
      cssClass: "event-success",
      label: "business"
    }
  ],

  // Simple Calendar State
  simpleCalendarEvents: [
    {
      id: 1,
      title: "My Event",
      startDate: new Date(new Date() - 1000 * 60 * 60 * 24 * 3),
      endDate: new Date(new Date() - 1000 * 60 * 60 * 24 * 2),
      url: "",
      classes: "event-success",
      label: "business"
    }
  ],

  // table list
  calendarList: [],
  pagination: {
    count: 0,
    total: 0,
    perPage: 0,
    currentPage: 0,
    totalPages: 0,
    links: []
  },
  searchTerm: "",
  order: {
    orderBy: "id",
    orderType: "desc"
  },
  views: {
    name: { text: "tên lịch học", viewable: true, sortKey: "name" },
    joins: { text: "giáo viên", viewable: true, sortKey: "joins" },
    start_and_end: {
      text: "giờ học",
      viewable: true,
      sortKey: "start_and_end"
    },
    date: { text: "ngày học", viewable: true, sortKey: "date" },
    except_date: { text: "ngày nghỉ", viewable: true, sortKey: "except_date" },
    weekdays: { text: "các thứ", viewable: true, sortKey: "weekdays" },
    note: { text: "ghi chú", viewable: false, sortKey: "note" },
    created_at: { text: "ngày tạo", viewable: false, sortKey: "created_at" },
    updated_at: {
      text: "ngày cập nhật",
      viewable: false,
      sortKey: "updated_at"
    },
    action: { text: "Hành động", viewable: true, sortKey: "action" }
  },
  needReload: false
};

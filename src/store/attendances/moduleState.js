export default {
  attendances: [],
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
    date: { text: "Ngày Điểm danh", viewable: true, sortKey: "date" },
    present: { text: "có mặt", viewable: true, sortKey: "present" },
    late: { text: "đi trễ", viewable: true, sortKey: "late" },
    absent: { text: "vắng mặt", viewable: true, sortKey: "absent" },
    created_at: { text: "Ngày tạo", viewable: true, sortKey: "created_at" },
    updated_at: {
      text: "Ngày cập nhật",
      viewable: false,
      sortKey: "updated_at"
    },
    action: { text: "hành động", viewable: true, sortKey: "" }
  },
  needReload: false
};

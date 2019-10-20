export default {
  lessons: [],
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
    name: { text: "Tên bài học", viewable: true, sortKey: "date" },
    description: { text: "Mô tả", viewable: true, sortKey: "description" },
    url: { text: "video", viewable: true, sortKey: "url" },
    created_at: { text: "Ngày tạo", viewable: false, sortKey: "created_at" },
    updated_at: {
      text: "Ngày cập nhật",
      viewable: false,
      sortKey: "updated_at"
    },
    action: { text: "hành động", viewable: true, sortKey: "" }
  },
  needReload: false
};

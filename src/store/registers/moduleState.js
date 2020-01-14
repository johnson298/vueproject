export default {
  registers: [],
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
    code: { text: "mã hv", viewable: true, sortKey: "code" },
    avatar: { text: "ảnh", viewable: true, sortKey: "" },
    name: { text: "tên hv", viewable: true, sortKey: "name" },
    status: { text: "Trạng thái học tập (buổi)", viewable: true, sortKey: "" },
    note: { text: "ghi chú", viewable: false, sortKey: "note" },
    created_at: { text: "ngày tạo", viewable: false, sortKey: "created_at" },
    updated_at: { text: "ngày cập nhật",  viewable: false, sortKey: "created_at" },
    action: { text: "hành động", viewable: true, sortKey: "" }
  },
  needReload: false
};

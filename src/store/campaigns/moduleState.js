export default {
  campaigns: [],
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
    title: { text: "tên thông báo", viewable: true, sortKey: "title" },
    target_id: { text: "phạm vi gửi", viewable: true, sortKey: "target_id" },
    user: { text: "người tạo", viewable: true, sortKey: "" },
    schedule_at: { text: "ngày triển khai", viewable: false, sortKey: "schedule_at" },
    via: { text: "hình thức gửi", viewable: true, sortKey: "via" },
    focus_on: { text: "đối tượng", viewable: true, sortKey: "focus_on" },
    content: { text: "nội dung", viewable: false, sortKey: "content" },
    perform_at : { text: "thực hiện lúc", viewable: false, sortKey: "perform_at " },
    created_at: { text: "ngày tạo", viewable: false, sortKey: "created_at" },
    updated_at: { text: "ngày cập nhật", viewable: false, sortKey: "updated_at" },
    action: { text: "hành động", viewable: true, sortKey: "" }
  },
  needReload: false
};

export default {
  courses: [],
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
    name: { text: "Tên lớp học", viewable: true, sortKey: "name" },
    price: { text: "Học phí (vnđ)", viewable: true, sortKey: "price" },
    paid: { text: "Đã trả (vnđ)", viewable: true, sortKey: "paid" },
    surplus: { text: "còn dư (vnđ)", viewable: true, sortKey: "" },
    start_at: { text: "Ngày bắt đầu", viewable: false, sortKey: "start_at" },
    end_at: { text: "Ngày kết thúc", viewable: false, sortKey: "end_at" },
    number_of_lessons: {
      text: "Thời lượng",
      viewable: true,
      sortKey: "number_of_lessons"
    },
    status: { text: "Trạng thái", viewable: true, sortKey: "status" },
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

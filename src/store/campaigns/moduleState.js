export default {

  // notifications
  notifications: [],
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
    target_type: { text: "phạm vi gửi", viewable: true, sortKey: "target_type" },
    user: { text: "người tạo", viewable: true, sortKey: "" },
    schedule_at: { text: "ngày triển khai", viewable: false, sortKey: "schedule_at" },
    via: { text: "hình thức gửi", viewable: true, sortKey: "via" },
    focus_on: { text: "đối tượng", viewable: true, sortKey: "focus_on" },
    content: { text: "nội dung", viewable: true, sortKey: "content" },
    perform_at : { text: "thực hiện lúc", viewable: false, sortKey: "perform_at " },
    status : { text: "trạng thái", viewable: true, sortKey: " " },
    created_at: { text: "ngày tạo", viewable: false, sortKey: "created_at" },
    updated_at: { text: "ngày cập nhật", viewable: false, sortKey: "updated_at" }
  },
  needReload: false,


  // evaluatesList
  evaluates: [],
  paginationEvaluate: {
    count: 0,
    total: 0,
    perPage: 0,
    currentPage: 0,
    totalPages: 0,
    links: []
  },
  searchTermEvaluate: "",
  orderEvaluate: {
    orderBy: "id",
    orderType: "desc"
  },
  viewsEvaluate: {
    code: { text: "Mã đánh giá", viewable: false, sortKey: "code" },
    name: { text: "Tên đánh giá", viewable: true, sortKey: "title" },
    count_question: { text: "Số câu hỏi (câu)", viewable: true, sortKey: "count_question" },
    course_name: { text: "tên lớp", viewable: false, sortKey: "" },
    date: { text: "ngày áp dụng", viewable: true, sortKey: "date" },
    user_name: { text: "người tạo", viewable: false, sortKey: "" },
    ratio: { text: "tỉ lệ đánh giá", viewable: true, sortKey: "" },
    status: { text: "trạng thái", viewable: true, sortKey: "status" },
    branch_name: { text: "chi nhánh", viewable: false, sortKey: "" },
    content: { text: "chi nhánh", viewable: false, sortKey: "content" },
    created_at: { text: "ngày tạo", viewable: false, sortKey: "created_at" },
    updated_at: { text: "ngày cập nhật", viewable: false, sortKey: "updated_at" },
    action: { text: "hành động", viewable: true, sortKey: "" },
  },
  needReloadEvaluate: false
};

export default {
  students: [],
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
    code: { text: "Mã hv", viewable: false, sortKey: "code", active: ['students', 'reserves'] },
    avatar: { text: "ảnh", viewable: true, sortKey: "", active: ['students', 'reserves'] },
    name: { text: "tên hv", viewable: true, sortKey: "name", active: ['students', 'reserves'] },
    user_create: { text: "người bảo lưu hv", viewable: true, sortKey: "", active: ['reserves'] },
    email: { text: "Email", viewable: false, sortKey: "email", active: ['students', 'reserves'] },
    birthday: { text: "ngày sinh", viewable: false, sortKey: "birthday", active: ['students', 'reserves'] },
    phone: { text: "điện thoại", viewable: true, sortKey: "phone", active: ['students', 'reserves'] },
    facebook: { text: "Facebook", viewable: false, sortKey: "", active: ['students', 'reserves'] },
    address: { text: "địa chỉ", viewable: false, sortKey: "", active: ['students', 'reserves']  },
    progress: { text: "Số buổi đã học (buổi)", viewable: true, sortKey: "", active: ['reserves'] },
    source: { text: "nguồn", viewable: true, sortKey: "source", active: ['students'] },
    class: { text: "lớp", viewable: false, sortKey: "", active: ['students', 'reserves']  },
    school: { text: "trường", viewable: false, sortKey: "", active: ['students', 'reserves']  },
    debts: { text: "còn nợ (vnđ)", viewable: true, sortKey: "debts", active: ['students'] },
    note: { text: "ghi chú", viewable: false, sortKey: "note", active: ['students'] },
    mem_add: { text: "người tạo", viewable: false, sortKey: "", active: ['students'] },
    reason: { text: "Lý do", viewable: false, sortKey: "note", active: ['reserves'] },
    course: { text: "Lớp bảo lưu", viewable: false, sortKey: "", active: ['reserves'] },
    status: { text: "Trạng thái bảo lưu", viewable: true, sortKey: "type", active: ['reserves'] },
    course_new: { text: "Lớp mới", viewable: true, sortKey: "", active: ['reserves'] },
    created_at: { text: "ngày tạo", viewable: true, sortKey: "created_at", active: ['students', 'reserves'] },
    updated_at: { text: "ngày cập nhật", viewable: false, sortKey: "updated_at", active: ['students', 'reserves'] },
    action: { text: "hành động", viewable: true, sortKey: "", active: ['students', 'reserves'] }
  },
  needReload: false,

  // invoice
  studentsInvoice: [],
  paginationInvoice: {
    count: 0,
    total: 0,
    perPage: 0,
    currentPage: 0,
    totalPages: 0,
    links: []
  },
  searchTermInvoice: "",
  orderInvoice: {
    orderBy: "id",
    orderType: "desc"
  },
  viewsInvoice: {
    course: { text: "đóng cho lớp", viewable: true, sortKey: "course" },
    amount: { text: "số tiền đã đóng (vnđ)", viewable: true, sortKey: "amount" },
    source: { text: "PT THANH TOÁN", viewable: true, sortKey: "source" },
    coupon: { text: "khuyến mại", viewable: true, sortKey: "" },
    note: { text: "ghi chú", viewable: true, sortKey: "note" },
    created_at: { text: "ngày tạo", viewable: false, sortKey: "created_at" },
    updated_at: {
      text: "ngày cập nhật",
      viewable: false,
      sortKey: "updated_at"
    }
  },
  needReloadInvoice: false
};

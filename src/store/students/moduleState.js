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
    code: { text: "Mã hv", viewable: false, sortKey: "code" },
    avatar: { text: "ảnh", viewable: true, sortKey: "" },
    name: { text: "tên hv", viewable: true, sortKey: "name" },
    email: { text: "Email", viewable: false, sortKey: "email" },
    birthday: { text: "ngày sinh", viewable: false, sortKey: "birthday" },
    phone: { text: "điện thoại", viewable: true, sortKey: "phone" },
    facebook: { text: "Facebook", viewable: false, sortKey: "" },
    address: { text: "địa chỉ", viewable: false, sortKey: "" },
    source: { text: "nguồn", viewable: true, sortKey: "source" },
    class: { text: "lớp", viewable: false, sortKey: "" },
    school: { text: "trường", viewable: false, sortKey: "" },
    debts: { text: "còn nợ (vnđ)", viewable: true, sortKey: "debts" },
    created_at: { text: "ngày tạo", viewable: false, sortKey: "created_at" },
    updated_at: {
      text: "ngày cập nhật",
      viewable: false,
      sortKey: "updated_at"
    },
    action: { text: "hành động", viewable: true, sortKey: "" }
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
    amount: {
      text: "số tiền đã đóng (vnđ)",
      viewable: true,
      sortKey: "amount"
    },
    source: { text: "PT THANH TOÁN", viewable: true, sortKey: "source" },
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

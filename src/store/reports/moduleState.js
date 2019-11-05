export default {
  // Nhân viên
  users: [],
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
    code: { text: "mã NV", viewable: false, sortKey: "code" },
    avatar: { text: "Ảnh", viewable: true, sortKey: "" },
    name: { text: "Tên NV", viewable: true, sortKey: "name" },
    position: { text: "Chức vụ", viewable: true, sortKey: "position" },
    email: { text: "Email", viewable: false, sortKey: "email" },
    birthday: { text: "Ngày sinh", viewable: false, sortKey: "birthday" },
    phone: { text: "điện thoại", viewable: true, sortKey: "phone" },
    facebook: { text: "Facebook", viewable: false, sortKey: "" },
    address: { text: "địa chỉ", viewable: false, sortKey: "" },
    status: { text: "trạng thái", viewable: true, sortKey: "status" },
    created_at: { text: "ngày tạo", viewable: false, sortKey: "created_at" },
    updated_at: {
      text: "ngày cập nhật",
      viewable: false,
      sortKey: "updated_at"
    }
  },
  needReload: false,

  // Học viên
  students: [],
  paginationStudents: {
    count: 0,
    total: 0,
    perPage: 0,
    currentPage: 0,
    totalPages: 0,
    links: []
  },
  searchTermStudents: "",
  orderStudents: {
    orderBy: "id",
    orderType: "desc"
  },
  viewsStudents: {
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
    surplus: { text: "còn dư (vnđ)", viewable: true, sortKey: "surplus" },
    created_at: { text: "ngày tạo", viewable: false, sortKey: "created_at" },
    updated_at: {
      text: "ngày cập nhật",
      viewable: false,
      sortKey: "updated_at"
    }
  },
  needReloadStudents: false,

  // Lớp học
  courses: [],
  paginationCourses: {
    count: 0,
    total: 0,
    perPage: 0,
    currentPage: 0,
    totalPages: 0,
    links: []
  },
  searchTermCourses: "",
  orderCourses: {
    orderBy: "id",
    orderType: "desc"
  },
  viewsCourses: {
    name: { text: "Tên lớp học", viewable: true, sortKey: "name" },
    price: { text: "Học phí (vnđ)", viewable: true, sortKey: "price" },
    program_id: {
      text: "Chương chính học",
      viewable: false,
      sortKey: "program_id"
    },
    start_at: { text: "Ngày bắt đầu", viewable: false, sortKey: "start_at" },
    end_at: { text: "Ngày kết thúc", viewable: false, sortKey: "end_at" },
    progress: { text: "Tiến độ (buổi)", viewable: true, sortKey: "progress" },
    status: { text: "Trạng thái", viewable: true, sortKey: "status" },
    created_at: { text: "Ngày tạo", viewable: false, sortKey: "created_at" },
    updated_at: {
      text: "Ngày cập nhật",
      viewable: false,
      sortKey: "updated_at"
    }
  },
  needReloadCourses: false,

  // Thu chi
  money: [],
  paginationMoney: {
    count: 0,
    total: 0,
    perPage: 0,
    currentPage: 0,
    totalPages: 0,
    links: []
  },
  searchTermMoney: "",
  orderMoney: {
    orderBy: "id",
    orderType: "desc"
  },
  viewsMoney: {
    id: { text: "mã hóa đơn", viewable: false, sortKey: "id" },
    student_id: { text: "mã học viên", viewable: false, sortKey: "student_id" },
    student_avatar: {
      text: "ảnh học viên",
      viewable: true,
      sortKey: "student_avatar"
    },
    student_name: {
      text: "tên học viên",
      viewable: true,
      sortKey: "student_name"
    },
    amount: { text: "số tiền trả (vnđ)", viewable: true, sortKey: "amount" },
    note: { text: "ghi chú", viewable: false, sortKey: "note" },
    source: { text: "pt thanh toán", viewable: true, sortKey: "source" },
    created_at: { text: "Ngày tạo", viewable: true, sortKey: "created_at" },
    updated_at: {
      text: "Ngày cập nhật",
      viewable: false,
      sortKey: "updated_at"
    }
  },
  needReloadMoney: false
};

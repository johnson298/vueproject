export default {
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
    },
    action: { text: "hành động", viewable: true, sortKey: "" }
  },
  needReload: false
};

export default {
  roles: [],
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
    name: { text: "Tên quyền", viewable: true, sortKey: "name" },
    guard_name: { text: "Loại tài khoản", viewable: true, sortKey: "guard_name" },
    action: { text: "Hành động", viewable: true, sortKey: "" }
  },
  needReload: false
};

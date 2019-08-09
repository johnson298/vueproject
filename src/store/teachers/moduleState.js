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
  searchTerm: '',
  order: {
    orderBy: 'id',
    orderType: 'desc',
  },
  views: {
    name: { text: 'tên gv', viewable: true, sortKey: 'name' },
    created_at: { text: 'ngày tạo', viewable: true, sortKey: 'updated_at' },
    updated_at: { text: 'ngày cập nhật', viewable: true, sortKey: 'created_at' },
    action: { text: 'hành động', viewable: true, sortKey: '' },
  },
  needReload: false
};

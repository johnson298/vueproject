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
  searchTerm: '',
  order: {
    orderBy: 'id',
    orderType: 'desc'
  },
  views: {
    code: { text: 'mã hv', viewable: true, sortKey: 'code' },
    avatar: { text: 'ảnh', viewable: true, sortKey: '' },
    name: { text: 'tên hv', viewable: true, sortKey: 'name' },
    created_at: { text: 'ngày tạo', viewable: true, sortKey: 'created_at' },
    action: { text: 'hành động', viewable: true, sortKey: '' },
  },
  needReload: false
};

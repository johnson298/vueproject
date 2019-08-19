export default {
  rooms: [],
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
    name: { text: 'Name', viewable: true, sortKey: 'name' },
    created_at: { text: 'Ngày tạo', viewable: true, sortKey: 'created_at' },
    updated_at: { text: 'Ngày cập nhật', viewable: true, sortKey: 'updated_at' },
    action: { text: 'Action', viewable: true, sortKey: '' },
  },
  needReload: false
};

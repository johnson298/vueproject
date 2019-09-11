export default {
  branches: [],
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
    name: { text: 'Tên chi nhánh', viewable: true, sortKey: 'name' },
    address: { text: 'Địa chỉ', viewable: true, sortKey: 'address' },
    created_at: { text: 'Ngày tạo', viewable: false, sortKey: 'created_at' },
    updated_at: { text: 'Ngày cập nhật', viewable: false, sortKey: 'updated_at' },
    action: { text: 'hành động', viewable: true, sortKey: '' },
  },
  needReload: false
};

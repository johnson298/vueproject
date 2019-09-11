export default {
  expense: [],
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
    user_name: { text: 'nhân viên tạo', viewable: true, sortKey: 'user_name' },
    user_avatar: { text: 'ảnh', viewable: false, sortKey: 'user_avatar' },
    position: { text: 'Chức vụ', viewable: false, sortKey: 'position' },
    amount: { text: 'số tiền (vnđ)', viewable: true, sortKey: 'amount' },
    note: { text: 'ghi chú', viewable: true, sortKey: 'note' },
    created_at: { text: 'Ngày tạo', viewable: false, sortKey: 'created_at' },
    updated_at: { text: 'Ngày cập nhật', viewable: false, sortKey: 'updated_at' },
    action: { text: 'hành động', viewable: true, sortKey: '' },
  },
  needReload: false
};

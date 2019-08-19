export default {
  invoices: [],
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
    id: { text: 'mã hóa đơn', viewable: false, sortKey: 'id' },
    student_id: { text: 'mã học viên', viewable: false, sortKey: 'student_id' },
    student_avatar: { text: 'ảnh học viên', viewable: true, sortKey: 'student_avatar' },
    student_name: { text: 'tên học viên', viewable: true, sortKey: 'student_name' },
    amount: { text: 'số tiền trả (vnđ)', viewable: true, sortKey: 'amount' },
    note: { text: 'ghi chú', viewable: false, sortKey: 'note' },
    source: { text: 'phương thức chuyển tiền', viewable: true, sortKey: 'source' },
    created_at: { text: 'Ngày tạo', viewable: true, sortKey: 'created_at' },
    updated_at: { text: 'Ngày cập nhật', viewable: false, sortKey: 'updated_at' },
    action: { text: 'Action', viewable: true, sortKey: '' },
  },
  needReload: false
};

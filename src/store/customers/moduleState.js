export default {
  customers: [],
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
    code: { text: 'mã', viewable: false ,sortKey: '' },
    name: { text: 'tên KH', viewable: true, sortKey: 'name' },
    email: { text: 'Email', viewable: true, sortKey: 'email' },
    phone: { text: 'số điện thoại', viewable: false, sortKey: '' },
    zalo: { text: 'zalo', viewable: false, sortKey: '' },
    address: { text: 'địa chỉ', viewable: false, sortKey: 'address' },
    facebook: { text: 'Facebook', viewable: false, sortKey: 'facebook' },
    birthday: { text: 'ngày sinh', viewable: false, sortKey: 'birthday' },
    gender: { text: 'giới tính', viewable: false, sortKey: '' },
    status: { text: 'trạng thái', viewable: true, sortKey: '' },
    note: { text: 'ghi chú', viewable: false, sortKey: 'note' },
    created_at: { text: 'ngày tạo', viewable: false, sortKey: 'created_at' },
    updated_at: { text: 'ngày cập nhật', viewable: false, sortKey: 'updated_at' },
    action: { text: 'hành động', viewable: true, sortKey: '' },
  },
  needReload: false
};

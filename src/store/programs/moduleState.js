export default {
  programs: [],
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
    name: { text: 'Tên CT', viewable: true, sortKey: 'name' },
    description: { text: 'Mô tả', viewable: false, sortKey: 'description' },
    price: { text: 'Giá tiền(vnđ)', viewable: true, sortKey: 'price' },
    number_of_lessons: { text: 'Số bài học', viewable: true, sortKey: 'number_of_lessons' },
    created_at: { text: 'Ngày tạo', viewable: false, sortKey: 'created_at' },
    updated_at: { text: 'Ngày cập nhật', viewable: false, sortKey: 'updated_at' },
    action: { text: 'Action', viewable: true, sortKey: '' },
  },
  needReload: false
};

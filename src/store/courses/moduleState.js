export default {
  courses: [],
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
    name: { text: 'Tên lớp học', viewable: true, sortKey: 'name' },
    price: { text: 'Học phí', viewable: true, sortKey: 'price' },
    program_id: { text: 'Chương chính học', viewable: false, sortKey: 'program_id' },
    branch_id: { text: 'Tên chi nhánh', viewable: false, sortKey: 'branch_id' },
    start_at: { text: 'Ngày bắt đầu', viewable: true, sortKey: 'start_at' },
    end_at: { text: 'Ngày kết thúc', viewable: false, sortKey: 'end_at' },
    number_of_lessons: { text: 'Thời lượng', viewable: true, sortKey: 'number_of_lessons' },
    status: { text: 'Trạng thái', viewable: true, sortKey: 'status' },
    created_at: { text: 'Ngày tạo', viewable: false, sortKey: 'created_at' },
    updated_at: { text: 'Ngày cập nhật', viewable: true, sortKey: 'updated_at' },
    action: { text: 'Action', viewable: true, sortKey: '' },
  },
  needReload: false
};

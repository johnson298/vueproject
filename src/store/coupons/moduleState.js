export default {
  coupons: [],
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
    type: { text: 'Kiểu khuyến mại', viewable: true, sortKey: 'type' },
    discount_amount: { text: 'chiết khấu', viewable: true, sortKey: 'discount_amount' },
    coupons_limit: { text: 'Giới hạn (lần)', viewable: true, sortKey: 'coupons_limit' },
    coupons_code: { text: 'Mã KM', viewable: true, sortKey: 'coupons_code' },
    status: { text: 'Trạng thái', viewable: true, sortKey: 'status' },
    note: { text: 'Ghi chú', viewable: false, sortKey: 'note' },
    created_at: { text: 'Ngày tạo', viewable: false, sortKey: 'created_at' },
    updated_at: { text: 'Ngày cập nhật', viewable: false, sortKey: 'updated_at' },
    action: { text: 'Action', viewable: true, sortKey: '' },
  },
  needReload: false
};

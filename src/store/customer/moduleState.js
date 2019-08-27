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
    code: { text: 'Code', viewable: false ,sortKey: 'code' },
    avatar: { text: 'Avatar', viewable: false, sortKey: '' },
    name: { text: 'Name', viewable: true, sortKey: 'name' },
    email: { text: 'Email', viewable: true, sortKey: 'email' },
    birthday: { text: 'Birthday', viewable: false, sortKey: 'birthday' },
    phone: { text: 'Phone', viewable: false, sortKey: 'phone' },
    branch_id: { text: 'Chi nhánh', viewable: true, sortKey: 'created_at' },
    status: { text: 'Status', viewable: true, sortKey: '' },
    facebook: { text: 'Facebook', viewable: false, sortKey: '' },
    address: { text: 'Address', viewable: false, sortKey: '' },
    created_at: { text: 'Created at', viewable: true, sortKey: 'created_at' },
    updated_at: { text: 'Updated at', viewable: true, sortKey: 'updated_at' },
    action: { text: 'Action', viewable: true, sortKey: '' },
  },
  needReload: false
};

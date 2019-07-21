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
    orderType: 'desc'
  },
  views: {
    code: { text: 'Code', viewable: true, sortKey: 'code' },
    avatar: { text: 'Avatar', viewable: true, sortKey: '' },
    name: { text: 'Name', viewable: true, sortKey: 'name' },
    email: { text: 'Email', viewable: true, sortKey: 'email' },
    birthday: { text: 'Birthday', viewable: true, sortKey: 'birthday' },
    phone: { text: 'Phone', viewable: true, sortKey: 'phone' },
    facebook: { text: 'Facebook', viewable: true, sortKey: '' },
    address: { text: 'Address', viewable: false, sortKey: '' },
    source: { text: 'Source', viewable: true, sortKey: 'source' },
    class: { text: 'Class', viewable: false, sortKey: '' },
    school: { text: 'School', viewable: false, sortKey: '' },
    created_at: { text: 'Created at', viewable: true, sortKey: 'created_at' },
    updated_at: { text: 'Updated at', viewable: false, sortKey: 'updated_at' },
    action: { text: 'Action', viewable: true, sortKey: '' },
  },
  needReload: false
};

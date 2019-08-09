export default {
  registers: [],
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
    created_at: { text: 'Created at', viewable: true, sortKey: 'created_at' },
    action: { text: 'Action', viewable: true, sortKey: '' },
  },
  needReload: false
};

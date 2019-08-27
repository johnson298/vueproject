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
    name: { text: 'Name', viewable: true, sortKey: 'name' },
    content: { text: 'Nội dung', viewable: true, sortKey: '' },
    created_at: { text: 'Created at', viewable: true, sortKey: 'created_at' },
    updated_at: { text: 'Updated at', viewable: true, sortKey: 'updated_at' },
    action: { text: 'Action', viewable: true, sortKey: '' },
  },
  needReload: false
};

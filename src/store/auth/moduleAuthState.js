export default {
  isUserLoggedIn: () => {
    const currentUser = localStorage.getItem('user');
    return !!currentUser;
  },
};

/*=========================================================================================
  File Name: moduleAuthState.js
  Description: Auth Module State
  ----------------------------------------------------------------------------------------
  Item Name: Vuesax Admin - VueJS Dashboard Admin Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/
export default {
  isUserLoggedIn: () => {
    let isAuthenticated;
    const currentUser = localStorage.getItem('user');

    isAuthenticated = !!currentUser;

    return (localStorage.getItem('user') && isAuthenticated);
  },
};

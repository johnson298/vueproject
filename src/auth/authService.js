import EventEmitter from 'events';
const loginEvent = 'loginEvent';

class AuthService extends EventEmitter {
  renewTokens() {
    // reject can be used as parameter in promise for using reject
    return new Promise((resolve, reject) => {
      if (!localStorage.getItem('access_token')) {
        reject('Not Login');
      }
    });
  }

  logOut() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');
    this.emit(loginEvent, { loggedIn: false });
  }

  isAuthenticated() {
    return !!localStorage.getItem('access_token');
  }
}

export default new AuthService();

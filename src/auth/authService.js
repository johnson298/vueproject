import EventEmitter from 'events';
import store from '../store/store';

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

  isAuthenticated(callback, to) {
    return new Promise(() => {
      if (store.state.auth.currentUser) {
        callback();
      } else {
        store.dispatch('auth/updateUser', {
          isReloadRequired: false,
          to: to
        }).then(() => {
          callback();
        });
      }
    });
  }
}

export default new AuthService();

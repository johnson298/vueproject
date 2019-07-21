import EventEmitter from 'events';
import store from '../store/store';

class AuthService extends EventEmitter {
  renewTokens() {
    // reject can be used as parameter in promise for using reject
    return new Promise((resolve, reject) => {
      if (!localStorage.getItem('access_token')) {
        reject('Not Login');
      }
    });
  }

  logOut = async () => {
    await localStorage.removeItem('access_token');
    await localStorage.removeItem('user');
    store.dispatch('clearData');
  };

  isAuthenticated = async () => {
    if (store.state.auth.currentUser) {
      return true;
    } else {
      return await store.dispatch('auth/updateUser', {
        isReloadRequired: false
      });
    }
  };
}

export default new AuthService();

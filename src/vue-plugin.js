import Vue from 'vue';
import * as helpers from './helpers/helpers';

export const  plugin = {
  install () {
    Vue.prototype.$helpers = helpers;
  }
};

Vue.use(plugin);

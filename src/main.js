/* eslint-disable no-case-declarations */
import Vue from "vue";
import App from "./App.vue";
import configsWeb from './configuration/index';
configsWeb();

// Vuesax Component Framework
import Vuesax from "vuesax";
import "material-icons/iconfont/material-icons.css"; //Material Icons

import "vuesax/dist/vuesax.css"; // Vuesax
Vue.use(Vuesax);

import AuthPlugin from "./plugins/auth";
Vue.use(AuthPlugin);

// Theme Configurations
import "../themeConfig.js";

// Globally Registered Components
import "./globalComponents.js";

// Styles: SCSS
import "./assets/scss/main.scss";

// Tailwind
import "@/assets/css/main.css";

// Vue Router
import router from "./router";

// Vuex Store
import store from "./store/store";

import "./config";

// Vuesax Admin Filters
import "./filters/filters";

// Vuejs - Vue wrapper for hammerjs
import { VueHammer } from "vue2-hammer";
Vue.use(VueHammer);

// PrismJS
import "prismjs";
import "prismjs/themes/prism-tomorrow.css";

// Feather font icon
require("./assets/css/iconfont.css");

// font awesome

import { library } from "@fortawesome/fontawesome-svg-core";
import { faUserSecret, faSitemap, faPlayCircle, faUsers, faUserTie, faGraduationCap, faHandHoldingUsd, faFileInvoiceDollar, faUserFriends, faTools, faChartPie, faHandshake, faLayerGroup, faListAlt, faHome, faBuilding, faFilePdf, faEnvelope, faUsersCog, faCog, faCodeBranch, faDollarSign, faFilter, faInfoCircle, faWindowRestore, faEye, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add( faUserSecret, faSitemap, faPlayCircle, faUsers, faUserTie, faGraduationCap, faHandHoldingUsd, faFileInvoiceDollar, faUserFriends, faTools, faChartPie, faHandshake, faLayerGroup, faListAlt, faHome, faBuilding, faFilePdf, faEnvelope, faUsersCog, faCog, faCodeBranch, faDollarSign, faFilter, faInfoCircle, faWindowRestore, faEye, faPlus );
Vue.component("font-awesome-icon", FontAwesomeIcon);

// VeeValidate
import VeeValidate from "vee-validate";
Vue.use(VeeValidate);

Vue.config.productionTip = false;

// Vue Ckeditor
import CKEditor from "@ckeditor/ckeditor5-vue";

Vue.use(CKEditor);

// Mixins global
import "./helpers/mixins";

// vue plugin
import './vue-plugin';

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

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
import { faUserSecret, faSitemap, faPlayCircle, faUsers, faUserTie, faGraduationCap, faHandHoldingUsd, faFileInvoiceDollar, faUserFriends, faTools, faChartPie, faHandshake, faLayerGroup, faListAlt, faHome, faBuilding, faFilePdf, faEnvelope, faUsersCog, faCog, faCodeBranch, faDollarSign, faFilter, faInfoCircle, faWindowRestore, faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add( faUserSecret, faSitemap, faPlayCircle, faUsers, faUserTie, faGraduationCap, faHandHoldingUsd, faFileInvoiceDollar, faUserFriends, faTools, faChartPie, faHandshake, faLayerGroup, faListAlt, faHome, faBuilding, faFilePdf, faEnvelope, faUsersCog, faCog, faCodeBranch, faDollarSign, faFilter, faInfoCircle, faWindowRestore, faEye );
Vue.component("font-awesome-icon", FontAwesomeIcon);

// VeeValidate
import VeeValidate from "vee-validate";
Vue.use(VeeValidate);

Vue.config.productionTip = false;

// Vue Ckeditor
import CKEditor from "@ckeditor/ckeditor5-vue";

Vue.use(CKEditor);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

// Mixin golabal
Vue.mixin({

  methods: {
    formatPrice(value) {
      let val = (value / 1).toFixed(0).replace(".", ",");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    formatDateUTC(val) {
      var date = new Date(val);
      var yearTime = date.getFullYear().toString();
      var monthTime = (date.getMonth() + 1).toString();
      var dateTime = date.getDate().toString();
      monthTime = monthTime.length > 1 ? monthTime : "0" + monthTime;
      dateTime = dateTime.length > 1 ? dateTime : "0" + dateTime;
      return `${yearTime}-${monthTime}-${dateTime}`;
    },
    DOCSO(s) {
      var th = ["", "nghìn", "triệu", "tỷ", "nghìn tỷ"];
      var dg = [
        "không",
        "một",
        "hai",
        "ba",
        "bốn",
        "năm",
        "sáu",
        "bảy",
        "tám",
        "chín"
      ];
      var tn = [
        "mười",
        "mười một",
        "mười hai",
        "mười ba",
        "mười bốn",
        "mười năm",
        "mười sáu",
        "mười bảy",
        "mười tám",
        "mười chín"
      ];
      var tw = [
        "hai mươi",
        "ba mươi",
        "bốn mươi",
        "năm mươi",
        "sáu mươi",
        "bảy mươi",
        "tám mươi",
        "chín mươi"
      ];
      s = s.toString();
      if (s != parseFloat(s)) return "không phải là số";
      var x = s.indexOf(".");
      if (x == -1) x = s.length;
      if (x > 15) return "quá lớn";
      var n = s.split("");
      var str = "";
      var sk = 0;
      for (var i = 0; i < x; i++) {
        if ((x - i) % 3 == 2) {
          if (n[i] == "1") {
            str += tn[Number(n[i + 1])] + " ";
            i++;
            sk = 1;
          } else if (n[i] != 0) {
            str += tw[n[i] - 2] + " ";
            sk = 1;
          }
        } else if (n[i] != 0) {
          // 0235
          str += dg[n[i]] + " ";
          if ((x - i) % 3 == 0) str += "trăm ";
          sk = 1;
        }
        if ((x - i) % 3 == 1) {
          if (sk) str += th[(x - i - 1) / 3] + " ";
          sk = 0;
        }
      }

      if (x != s.length) {
        var y = s.length;
        str += "point ";
        for (i = x + 1; i < y; i++) str += dg[n[i]] + " ";
      }
      return str.replace(/\s+/g, " ") + "đồng";
    },
    // check status (convert number to word)
    checkStatus(arrCheck, x) {
      if (!Number.isInteger(x)) {
        return "Không định dạng";
      }
      var arrFilter = arrCheck.map(el => el.text);
      let result = null;
      for (let i = 1; i <= arrFilter.length; i++) {
        if (i === x) result = arrFilter[i - 1];
      }
      return result;
    },
    checkStatusFrom0(arrCheck, x) {
      var arrFilter = arrCheck.map(el => el.text);
      let result = null;
      for (let i = 0; i <= arrFilter.length; i++) {
        if (i === x) result = arrFilter[i];
      }
      return result;
    },
    toNumber(string) {
      return string.replace(/[^\d]/g, "");
    },
    convertWeekdays(word) {
      let text = null;
      let dayEn = [
        "monday",
        "tuesday",
        "wednesday",
        "thursday",
        "friday",
        "saturday",
        "sunday"
      ];
      let dayVi = ["T2", "T3", "T4", "T5", "T6", "T7", "CN"];
      dayEn.forEach((el, key) => {
        el == word ? (text = dayVi[key]) : false;
      });
      return text;
    },
    formatShortMoney(num) {
      if (num >= 1000000000) {
        return (num / 1000000000).toFixed(1).replace(/\.0$/, "") + "Tỷ";
      }
      if (num >= 1000000) {
        return (num / 1000000).toFixed(1).replace(/\.0$/, "") + "Triệu";
      }
      if (num >= 1000) {
        return (num / 1000).toFixed(1).replace(/\.0$/, "") + "Nghìn";
      }
      return num;
    },
    // check respon axios & return notification
    checkResponRequest(data, _500, callback, mess = "Có lỗi xảy ra, vui lòng thử lại") {
      switch (data.status) {
      case 403:
        this.$vs.notify({
          title: "Lỗi phân quyền !",
          text: data.error.message,
          color: "danger",
          iconPack: "feather",
          icon: "icon-alert-circle"
        });
        break;
      case 500:
        if(data.error.hasOwnProperty("validation")){
          if (_500 instanceof Function){
            _500();
          } else {
            let message = data.error.validation[Object.keys(data.error.validation)[0]][0];
            this.$vs.notify({
              title: "Validation error!",
              text: message,
              iconPack: "feather",
              icon: "fa fa-lg fa-exclamation-triangle",
              color: "danger"
            });
          }
        } else {
          if (callback instanceof Function){
            callback();
          } else {
            this.$vs.notify({
              title: "Lỗi !",
              text: mess,
              iconPack: "feather",
              icon: "fa fa-lg fa-exclamation-triangle",
              color: "danger"
            });
          }
        }
        break;
      default:
        if (callback instanceof Function){
          callback();
        } else {
          this.$vs.notify({
            title: "Lỗi !",
            text: mess,
            iconPack: "feather",
            icon: "fa fa-lg fa-exclamation-triangle",
            color: "danger"
          });
        }
        break;
      }
    },
    // translate roles
    translateRoles(val){
      let result;
      const type = ['employee', 'student', 'course', 'register', 'schedule', 'attendance', 'teacher', 'program', 'lesson', 'invoice', 'customer', 'campaign', 'evaluate', 'report', 'room', 'branch', 'role', 'coupon'];
      const convert = ['Nhân viên', 'Học viên', 'Lớp học', 'Học viên trong lớp', 'Lịch học', 'Điểm danh', 'Giáo viên trong lớp', 'Chương trình học', 'Bài học', 'Hóa đơn', 'Khách hàng', 'Chiến dịch', 'Đánh giá', 'Báo cáo', 'Phòng học', 'Chi nhánh', 'Khuyến mại', 'Phân quyền' ];
      for (let i = 0; i < type.length; i++) {
        if (type[i] === val) result = convert[i];
      }
      return result;
    },
    getObjectConfig(array){
      let obj = {};
      let check = input => {
        return array.filter(e => e.name == input)[0];
      };
      array
        .map(e => e.name)
        .forEach(item => {
          obj[item] = check(item);
        });
      return obj;
    }

  }
});

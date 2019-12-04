import axios from "axios";
import store from "@/store/store";
axios.defaults.baseURL = process.env.VUE_APP_URL;
export default function() {
  axios.get("system_configuration").then(res => {
    let data = res.data.data;
    let obj = {};
    let check = input => {
      return data.filter(e => e.name == input)[0];
    };
    data
      .map(e => e.name)
      .forEach(item => {
        obj[item] = check(item);
      });
    store.dispatch("changeConfigs", obj);
  });
}

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


    // set favicon index
    var link =
      document.querySelector("link[rel*='icon']") ||
      document.createElement("link");
    link.type = "image/x-icon";
    link.rel = "shortcut icon";
    link.href = obj.favicon.image;
    document.getElementsByTagName("head")[0].appendChild(link);

    // save configuration
    store.dispatch("changeConfigs", obj);
  });
}

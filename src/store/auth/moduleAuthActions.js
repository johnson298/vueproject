import router from "@/router";
import Vue from "vue";

export default {
  login({ commit, state, dispatch }, payload) {
    // If user is already logged in notify and exit
    if (state.isUserLoggedIn()) {
      payload.notify({
        title: "Login Attempt",
        text: "You are already logged in!",
        iconPack: "feather",
        icon: "icon-alert-circle",
        color: "warning"
      });
      return false;
    }

    // Try to sigin
    Vue.axios
      .post("auth/login", {
        email: payload.userDetails.email,
        password: payload.userDetails.password
      })
      .then(result => {
        commit("UPDATE_TOKEN", result.data.data.access_token);
        dispatch("updateUser", {
          isReloadRequired: true,
          notify: payload.notify
        });
      })
      .catch(error => {
        payload.notify({
          time: 3000,
          title: "Error!",
          text:
            error.response.status === 401
              ? error.response.data.error.message
              : "Error",
          iconPack: "feather",
          icon: "icon-alert-circle",
          color: "danger"
        });
      })
      .finally(() => {
        payload.loading.close();
      });
  },

  async updateUser({ commit, dispatch }, payload) {
    return new Promise(resolve => {
      Vue.axios
        .get("me")
        .then(res => {
          commit("UPDATE_AUTHENTICATED_USER", res.data.data);
          // If reload is required to get fresh data after update
          // Reload currentz page
          if (payload.isReloadRequired) {
            router.push(router.currentRoute.query.to || "/");
          }
          resolve(true);
        })
        .catch(() => {
          if (payload.hasOwnProperty("notify")) {
            payload.notify({
              time: 3000,
              title: "Error!",
              text:
                "Không thể lấy được dữ liệu, vui lòng đăng xuất và đăng nhập lại.",
              iconPack: "feather",
              icon: "icon-alert-circle",
              color: "danger"
            });
          }
          localStorage.removeItem("user");
          dispatch("clearData");
          resolve(false);
        });
    });
  }
};

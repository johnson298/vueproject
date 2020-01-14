<template>
  <div id="profile-page">
    <!-- PROFILE HEADER -->
    <div class="cover-container rounded-t-lg img-profile-cus">
      <img
        v-if="profileInfo.avatar"
        key="checkImage"
        :src="profileInfo.avatar"
        class="user-profile-img"
      />
      <img
        v-else
        key="checkImage"
        :src="require(`@/assets/images/portrait/small/${activeUserImg}`)"
        class="user-profile-img"
      />
    </div>
    <h2 class="text-center m-5 d-flex">{{ profileInfo.name}}</h2>

    <div class="vx-card">
      <div class="vx-card__body">
        <div class="con-slot-tabs">
          <div class="con-tab vs-tabs--content">
            <div>
              <div class="vx-row">
                <div class="vx-col md:w-1/2 w-full mb-base">
                  <div class="vx-col mb-6">
                    <h2>Thông tin cá nhân</h2>
                  </div>
                  <div>
                    <vs-input
                      label="Mã học viên"
                      v-model="profileInfo.code"
                      class="mt-5 w-full"
                      disabled
                    />
                  </div>
                  <div>
                    <vs-input label="Tên" v-model="profileInfo.name" class="mt-5 w-full" />
                  </div>
                  <div>
                    <vs-input
                      label="Địa chỉ"
                      v-model="profileInfo.address"
                      class="mt-5 w-full"
                      placeholder="Nhập địa chỉ"
                    />
                  </div>
                  <div>
                    <vs-input
                      label="Điện thoại"
                      v-model="profileInfo.phone"
                      class="mt-5 w-full"
                      placeholder="Nhập số điện thoại"
                    />
                  </div>
                  <div>
                    <vs-input
                      label="Facebook"
                      v-model="profileInfo.facebook"
                      class="mt-5 w-full"
                      placeholder="Nhập link facebook"
                    />
                  </div>
                  <div class="mt-5">
                    <label for class="vs-input--label">Ngày sinh</label>
                    <datepicker
                      :fullMonthName="true"
                      v-model="formatDate"
                      :language="languages[language]"
                      format="d MMMM yyyy"
                      :value="profileInfo.birthday"
                      class="w-full picker-custom"
                      placeholder="Chọn ngày sinh"
                    ></datepicker>
                  </div>
                  <div>
                    <div
                      class="vs-component vs-con-input-label vs-input mt-5 w-full vs-input-primary"
                    ></div>
                  </div>
                </div>
                <div class="vx-col md:w-1/2 w-full mb-base">
                  <div class="vx-col mb-6">
                    <h2>Thông tin đăng nhập</h2>
                  </div>
                  <div>
                    <vs-input label="Email" v-model="profileInfo.email" class="mt-5 w-full" />
                  </div>
                  <div>
                    <vs-input
                      label="Mật khẩu"
                      type="password"
                      class="mt-5 w-full"
                      v-model="profileInfo.password"
                      placeholder="Nhập mật khẩu mới"
                    />
                  </div>
                  <div>
                    <vs-input
                      label="Nhập lại khẩu"
                      type="password"
                      class="mt-5 w-full"
                      v-model="profileInfo.password_confirmation"
                      placeholder="Nhập lại mật khẩu"
                    />
                  </div>
                  <div class="vx-col mb-6 mt-5">
                    <h2>Thông tin học vấn</h2>
                  </div>
                  <vs-select
                    v-model="profileInfo.level"
                    label="Trình độ học vấn"
                    class="mt-5 w-full"
                    disabled
                  >
                    <vs-select-item
                      :key="index"
                      :value="item.value"
                      :text="item.text"
                      v-for="(item,index) in levels"
                    />
                  </vs-select>
                  <vs-select
                    v-model="profileInfo.position"
                    label="Chức vụ"
                    class="mt-5 w-full"
                    disabled
                  >
                    <vs-select-item
                      :key="index"
                      :value="item.value"
                      :text="item.text"
                      v-for="(item,index) in positions"
                    />
                  </vs-select>
                  <vs-select
                    v-model="profileInfo.major"
                    label="Nghiệp vụ"
                    class="mt-5 w-full"
                    disabled
                  >
                    <vs-select-item
                      :key="index"
                      :value="item.value"
                      :text="item.text"
                      v-for="(item,index) in majors"
                    />
                  </vs-select>
                  <div>
                    <div class="note mt-5">
                      <label class="vs-input--label">Ghi chú</label>
                    </div>
                    <vs-textarea
                      style="border: solid 1px #dddddd"
                      name="note"
                      type="text"
                      v-model="profileInfo.note"
                      class="w-full"
                      :rows="5"
                      placeholder="Nhập Ghi chú"
                    />
                  </div>
                </div>
              </div>
              <vs-row vs-type="flex" vs-justify="flex-end">
                <button
                  id="button-with-loading"
                  class="vs-con-loading__container vs-component vs-button vs-button-primary vs-button-filled"
                  ref="addButton"
                  @click="updateProfile()"
                >Cập nhật</button>
                <button
                  class="ml-3 vs-component vs-button vs-button-danger vs-button-filled"
                  ref="addButton"
                  @click="getData()"
                >Hủy</button>
              </vs-row>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import themeConfig from "@/../themeConfig.js";
import Datepicker from "vuejs-datepicker";
import * as lang from "vuejs-datepicker/src/locale";

export default {
  data() {
    return {
      isNavOpen: true,
      profileInfo: {},
      language: "vi",
      languages: lang,
      wasSidebarOpen: null,
      levels: this.$store.state.model.employees.levels,
      positions: this.$store.state.model.employees.positions,
      majors: this.$store.state.model.employees.majors,
      routerTransition: themeConfig.routerTransition || "zoom-fade"
    };
  },
  components: {
    Datepicker
  },
  computed: {
    activeUserImg() {
      return this.$store.state.AppActiveUser.img;
    },
    branch_id() {
      return this.$store.state.getBranchId;
    },
    formatDate: {
      get() {
        return this.profileInfo.birthday;
      },
      set(val) {
        this.profileInfo.birthday = this.formatDateUTC(val);
      }
    }
  },
  watch: {
    branch_id() {
      this.getData();
    }
  },
  created() {
    this.getData();
  },
  filters: {
    trim: function(string) {
      return string.trim();
    }
  },
  methods: {
    formData() {
      let formData = new FormData();
      Object.keys(this.profileInfo).map(key => {
        if (key != "metadata") {
          formData.append(key, this.profileInfo[key]);
        }
        if (!this.profileInfo[key]) {
          formData.append(key, "");
        }
      });
      if (typeof this.profileInfo.avatar === "string") {
        formData.append("avatar", "");
      }
      formData.append("_method", "PUT");
      return formData;
    },
    updateProfile() {
      this.$vs.loading({
        background: "#1E6DB5",
        color: "#fff",
        container: "#button-with-loading",
        scale: 0.45
      });
      this.$http
        .post("me", this.formData(), {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        })
        .then(() => {
          this.$vs.notify({
            title: "Đã sửa thành công",
            text: "OK",
            iconPack: "feather",
            icon: "fa fa-lg fa-check-circle",
            color: "success"
          });
        })
        .catch(error => {
          if (error) {
            if (
              error.response.status === 500 &&
              error.response.data.error.hasOwnProperty("validation")
            ) {
              let message =
                error.response.data.error.validation[
                  Object.keys(error.response.data.error.validation)[0]
                ][0];
              this.$vs.notify({
                title: "Nhập sai dữ liệu !",
                text: message,
                iconPack: "feather",
                icon: "fa fa-lg fa-exclamation-triangle",
                color: "danger"
              });
            } else {
              this.$vs.notify({
                title: "Có lỗi !",
                text: "Sửa thất bại",
                iconPack: "feather",
                icon: "fa fa-lg fa-exclamation-triangle",
                color: "danger"
              });
            }
          }
        })
        .finally(() => {
          this.$vs.loading.close("#button-with-loading > .con-vs-loading");
        });
    },
    changeAvatar() {
      this.profileInfo.avatar = this.$refs.file.files[0];
    },
    getData() {
      let vm = this;
      vm.$vs.loading({
        color: "#1E6DB5",
        text: "Loading..."
      });
      this.$http
        .get("me")
        .then(function(response) {
          vm.profileInfo = response.data.data;
        })
        .catch(() => {
          this.$router.push("/pages/error-404");
          this.$vs.notify({
            title: "Error!",
            text: "Có lỗi xảy ra",
            iconPack: "feather",
            icon: "fa fa-lg fa-exclamation-triangle",
            color: "danger"
          });
        })
        .finally(function() {
          vm.$vs.loading.close();
        });
    },
    mounted() {
      this.wasSidebarOpen = this.$store.state.reduceButton;
      this.$store.commit("TOGGLE_REDUCE_BUTTON", false);
    },
    beforeDestroy() {
      if (!this.wasSidebarOpen)
        this.$store.commit("TOGGLE_REDUCE_BUTTON", false);
    }
  }
};
</script>

<style lang="scss">
@import "@/assets/scss/vuesax/pages/profile.scss";

#profile-page {
  .img-profile-cus {
    padding: 0 !important;
    display: flex;
    padding: 30px;
    justify-content: center;
    align-items: center;
    position: relative;

    img {
      border-radius: 50%;
      width: 200px;
      height: 200px;
      object-fit: cover;
    }

    .change-avatar {
      position: absolute;
      bottom: 3px;

      input[type="file"] {
        cursor: pointer;
        width: 65px;
        height: 34px;
        overflow: hidden;

        &::before {
          content: "change";
          width: 65px;
          height: 32px;
          font-size: 12px;
          line-height: 32px;
          display: inline-block;
          background: #695df4;
          text-align: center;
          color: #fff;
          border-radius: 20px;
        }

        &::-webkit-file-upload-button {
          visibility: hidden;
        }
      }
    }
  }

  .tabBtn-profile.active {
    color: #6a5ff5 !important;

    &:after {
      content: "";
      position: absolute;
      top: calc(100% + 20px);
      left: 50%;
      transform: translate(-50%, -50%);
      border: 20px solid transparent;
      border-top-color: #fff;
    }
  }
}

.child-nopadding {
  .vs-card--content {
    padding: 0;
  }
}

.custom-tab {
  .con-ul-tabs {
    box-shadow: 0px 4px 25px 0px rgba(0, 0, 0, 0.1);
    margin-bottom: 30px;

    ul {
      display: flex;
      justify-content: space-around;
      border-radius: 10px;

      li {
        button {
          font-size: 18px;
          font-weight: bold;
          padding-top: 22px;
          padding-bottom: 22px;
        }
        .router-link-exact-active.router-link-active {
          color: #1e6db5;
        }
      }
    }
  }
}

.custom-card > .vx-card__header {
  display: none !important;
}

.vx-card.custom-card .vx-card__collapsible-content > .vx-card__body {
  padding: 0 !important;
}

.custom-tab .con-slot-tabs {
  box-shadow: 0px 4px 25px 0px rgba(0, 0, 0, 0.1);
  padding: 10px;
  border-radius: 10px;
}

.font-weight-bold {
  font-weight: bold;
}

.tabBtn-profile {
  position: relative;
  display: block;
  padding: 12px;
}

.d-flex {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>

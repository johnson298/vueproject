<template>
  <div>
    <div class="vx-row">
      <div class="vx-col md:w-1/2 w-full mb-base">
        <div class="vx-col mb-6">
          <h2>Thông tin nhân viên</h2>
        </div>
        <div>
          <vs-input label="Mã nhân viên" class="mt-5 w-full" v-model="user.code" disabled />
        </div>
        <div>
          <vs-input label="Tên nhân viên" class="mt-5 w-full" v-model="user.name" />
        </div>
        <div>
          <vs-input label="Địa chỉ" class="mt-5 w-full" v-model="user.address" />
        </div>
        <div>
          <vs-input label="Số điện thoại" class="mt-5 w-full" v-model="user.phone" />
        </div>
        <div>
          <vs-input label="Facebook" class="mt-5 w-full" v-model="user.facebook" />
        </div>
        <div class="mt-5">
          <label for class="vs-input--label">Ngày sinh</label>
          <datepicker
            :fullMonthName="true"
            v-model="formatDate"
            :language="languages[language]"
            format="d MMMM yyyy"
            :value="user.birthday"
            class="w-full picker-custom"
          ></datepicker>
        </div>
        <div>
          <div class="vs-component vs-con-input-label vs-input mt-5 w-full vs-input-primary">
            <label for class="vs-input--label">Ảnh đại diện</label>
            <div class="vs-con-input">
              <input
                type="file"
                ref="file"
                accept="image/*"
                @change="changeAvatar"
                class="vs-inputx vs-input--input normal hasValue"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="vx-col md:w-1/2 w-full mb-base">
        <div class="vx-col mb-6">
          <h2>Thông tin đăng nhập</h2>
        </div>
        <div>
          <vs-input label="Email" class="mt-5 w-full" v-model="user.email" />
        </div>
        <div>
          <vs-input
            label="Mật khẩu"
            type="password"
            class="mt-5 w-full"
            v-model="user.password"
            placeholder="Thêm mật khẩu mới"
          />
        </div>
        <div>
          <vs-input
            label="Nhập lại khẩu"
            type="password"
            class="mt-5 w-full"
            v-model="user.password_confirmation"
            placeholder="Nhập lại mật khẩu"
          />
        </div>
        <div class="vx-col mb-6 mt-5">
          <h2>Thông tin học vấn</h2>
        </div>
        <vs-select v-model="user.level" label="Trình độ học vấn" class="mt-5 w-full">
          <vs-select-item
            :key="index"
            :value="item.value"
            :text="item.text"
            v-for="(item,index) in levels"
          />
        </vs-select>
        <vs-select v-model="user.position" label="Chức vụ" class="mt-5 w-full">
          <vs-select-item
            :key="index"
            :value="item.value"
            :text="item.text"
            v-for="(item,index) in positions"
          />
        </vs-select>
        <vs-select v-model="user.major" label="Nghiệp vụ" class="mt-5 w-full">
          <vs-select-item
            :key="index"
            :value="item.value"
            :text="item.text"
            v-for="(item,index) in majors"
          />
        </vs-select>
        <!--trang thai-->
        <vs-select v-model="user.status" label="Trạng thái" class="mt-5 w-full">
          <vs-select-item
            :key="item.value"
            :value="item.value"
            :text="item.text"
            v-for="item in status"
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
            v-model="user.note"
            class="w-full"
            :rows="5"
            placeholder="Nhập Ghi chú"
          />
        </div>
      </div>
    </div>
    <vs-row vs-type="flex" vs-justify="flex-end">
      <button
        id="update-loading"
        class="vs-component vs-button vs-button-primary vs-button-filled"
        ref="addButton"
        @click="updateUser(user)"
      >Cập nhật</button>
      <button
        class="ml-3 vs-component vs-button vs-button-danger vs-button-filled"
        ref="addButton"
        @click="userInfo()"
      >Hủy</button>
    </vs-row>
  </div>
</template>

<script>
import Datepicker from "vuejs-datepicker";
import * as lang from "vuejs-datepicker/src/locale";
import "video.js/dist/video-js.css";

export default {
  components: {
    Datepicker
  },
  data() {
    return {
      employeeId: this.$route.params.employee,
      language: "vi",
      languages: lang,
      isNavOpen: true,
      wasSidebarOpen: null,
      levels: this.$store.state.model.employees.levels,
      positions: this.$store.state.model.employees.positions,
      majors: this.$store.state.model.employees.majors,
      status: this.$store.state.model.employees.status,
      user: {
        birthday: "",
        facebook: "",
        address: "",
        phone: "",
        name: "",
        email: "",
        password: "",
        password_confirmation: null,
        code: "",
        avatar: "",
        note: "",
        level: 0,
        position: 0,
        major: 0,
        status: 1
      }
    };
  },
  watch: {
    user() {
      if (this.user.phone) {
        this.user.phone = this.toNumber(this.user.phone);
      }
    }
  },
  created() {
    this.userInfo();
  },
  computed: {
    formatDate: {
      get() {
        return this.user.birthday;
      },
      set(val) {
        this.user.birthday = this.formatDateUTC(val);
      }
    }
  },
  filters: {
    trim: function(string) {
      return string.trim();
    }
  },
  methods: {
    changeAvatar() {
      this.user.avatar = this.$refs.file.files[0];
    },

    userInfo() {
      let vm = this;
      this.$http
        .get("users/" + this.employeeId)
        .then(function(response) {
          vm.user = response.data.data;
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
        });
    },
    formData() {
      let formData = new FormData();
      Object.keys(this.user).map(key => {
        if (key != "metadata") {
          formData.append(key, this.user[key]);
        }
        if (this.user[key] === null || this.user[key] === "") {
          formData.append(key, "");
        }
      });
      if (typeof this.user.avatar === "string") {
        formData.append("avatar", "");
      }
      formData.append("_method", "PUT");
      return formData;
    },
    updateUser(user) {
      this.$vs.loading({
        background: "#1E6DB5",
        color: "#fff",
        container: "#update-loading",
        scale: 0.45
      });
      this.$http
        .post("users/" + user.id, this.formData(), {
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
          this.userInfo();
        })
        .catch(error => {
          if (
            error.response.status === 500 &&
            error.response.data.error.hasOwnProperty("validation")
          ) {
            let message =
              error.response.data.error.validation[
                Object.keys(error.response.data.error.validation)[0]
              ][0];
            this.$vs.notify({
              title: "Validation error!",
              text: message,
              iconPack: "feather",
              icon: "fa fa-lg fa-exclamation-triangle",
              color: "danger"
            });
          } else {
            this.$vs.notify({
              title: "Error!",
              text: "Sửa thất bại",
              iconPack: "feather",
              icon: "fa fa-lg fa-exclamation-triangle",
              color: "danger"
            });
          }
        })
        .finally(() => {
          this.$vs.loading.close("#update-loading > .con-vs-loading");
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

      button {
        font-size: 18px;
        font-weight: bold;
        padding-top: 22px;
        padding-bottom: 22px;
      }
    }
  }
}

.vx-card {
  .vx-card__header {
    display: none;
  }
}

.vx-card.custom-card .vx-card__body {
  padding: 0;
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

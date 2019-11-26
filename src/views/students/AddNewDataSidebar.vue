<template>
  <vs-sidebar
    click-not-close
    position-right
    parent="body"
    default-index="1"
    color="primary"
    class="add-new-data-sidebar items-no-padding"
    spacer
    v-model="isSidebarActiveLocal"
  >
    <div class="mt-6 flex items-center justify-between px-6">
      <h4>Thêm Học viên</h4>
      <feather-icon icon="XIcon" @click.stop="isSidebarActiveLocal = false" class="cursor-pointer"></feather-icon>
    </div>
    <vs-divider class="mb-0"></vs-divider>

    <VuePerfectScrollbar class="scroll-area--data-list-add-new pt-4 pb-6" :settings="settings">
      <div class="p-6">
        <form>
          <div>
            <h4 class="text-center uppercase">Thông tin đăng nhập</h4>
            <!--Email-->
            <div>
              <vs-input
                label="Email *"
                name="email"
                v-model="student.email"
                class="mt-5 w-full"
                v-validate="'required|email'"
                autocomplete="email"
                placeholder="Demo@gmail.com"
              />
            </div>
            <!--Password-->
            <div>
              <vs-input
                label="Mật khẩu *"
                name="password"
                type="password"
                v-model="student.password"
                class="mt-5 w-full"
                v-validate="'required|min:8'"
                autocomplete="new-password"
                placeholder="Nhập mật khẩu (8 ký tự)"
              />
            </div>
            <!--Nhập lại mật khẩu-->
            <div>
              <vs-input
                label="Nhập lại mật khẩu *"
                name="password_confirmation"
                autocomplete="new-password"
                type="password"
                v-model="student.password_confirmation"
                class="mt-5 w-full"
                placeholder="Nhập lại mật khẩu"
              />
            </div>
          </div>
          <div class="mt-8">
            <h4 class="text-center uppercase">Thông tin học viên</h4>
            <!-- NAME -->
            <div>
              <vs-input
                label="Tên học viên *"
                name="name"
                v-model="student.name"
                class="mt-5 w-full"
                v-validate="'required'"
                placeholder="Nhập tên học viên"
              />
            </div>
            <!--địa chỉ-->
            <div>
              <vs-input
                label="Địa chỉ"
                name="address"
                type="text"
                v-model="student.address"
                class="mt-5 w-full"
                placeholder="Nhập địa chỉ"
              />
            </div>
            <!--số điện thoại-->
            <div>
              <vs-input
                label="Số điện thoại"
                name="phone"
                type="text"
                v-model="student.phone"
                class="mt-5 w-full"
                placeholder="0123456789"
              />
            </div>
            <!--facebook-->
            <div>
              <vs-input
                label="Facebook"
                name="facebook"
                type="text"
                v-model="student.facebook"
                class="mt-5 w-full"
                placeholder="http://demo.com"
              />
            </div>
            <!-- ngày sinh -->
            <div class="mt-5">
              <label for class="vs-input--label">Ngày sinh</label>
              <datepicker
                :fullMonthName="true"
                v-model="formatDate"
                :language="languages[language]"
                format="d MMMM yyyy"
                :value="student.birthday"
                class="w-full picker-custom"
                placeholder="Chọn ngày sinh"
              ></datepicker>
            </div>
            <!--trường-->
            <div>
              <vs-input
                label="Trường"
                name="school"
                type="text"
                v-model="student.school"
                class="mt-5 w-full"
                placeholder="Nhập tên trường"
              />
            </div>
            <!--lớp-->
            <div>
              <vs-input
                label="Lớp"
                name="class"
                type="text"
                v-model="student.class"
                class="mt-5 w-full"
                placeholder="Nhập tên lớp"
              />
            </div>
            <!--Giới tinh-->
            <vs-select v-model="student.gender" label="Giới Tính" class="mt-5 w-full">
              <vs-select-item
                :key="item.value"
                :value="item.value"
                :text="item.text"
                v-for="item in gender"
              />
            </vs-select>
            <!--nguồn-->
            <vs-select v-model="student.source" label="Nguồn" class="mt-5 w-full">
              <vs-select-item
                :key="item.value"
                :value="item.value"
                :text="item.text"
                v-for="item in source"
              />
            </vs-select>
            <!--ảnh đại diện-->
            <div>
              <div class="mt-5">
                <label class="vs-input--label">Ảnh đại diện</label>
              </div>
              <input
                type="file"
                id="file"
                ref="file"
                accept="image/*"
                class="form-control file_avatar"
                @change="changeAvatar"
              />
            </div>
            <!--nghi chú-->
            <div>
              <div class="mt-5">
                <label class="vs-input--label">Ghi chú</label>
              </div>
              <vs-textarea
                style="border: solid 1px #dddddd"
                name="note"
                type="text"
                v-model="student.note"
                class="w-full"
                :rows="5"
                placeholder="Nhập ghi chú"
              />
            </div>
          </div>
        </form>
      </div>
    </VuePerfectScrollbar>

    <div class="flex flex-wrap items-center justify-center p-6" slot="footer">
      <vs-button
        class="mr-6 vs-con-loading__container"
        @click="createStudent"
        ref="addButton"
        id="button-with-loading"
      >thêm</vs-button>
      <vs-button
        type="border"
        color="danger"
        @click="$emit('closeSidebar', false); initValues()"
      >hủy</vs-button>
    </div>
  </vs-sidebar>
</template>

<script>
import Datepicker from "vuejs-datepicker";
import * as lang from "vuejs-datepicker/src/locale";
import VuePerfectScrollbar from "vue-perfect-scrollbar";

export default {
  props: {
    isSidebarActive: {
      type: Boolean,
      required: false
    },
    callback: {
      type: Function,
      required: true
    }
  },
  data() {
    return {
      language: "vi",
      languages: lang,
      student: {
        birthday: "",
        facebook: "",
        address: "",
        phone: "",
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
        code: "",
        avatar: "",
        note: "",
        gender: "0",
        school: "",
        class: "",
        source: "1",
        branch_id: this.$store.state.getBranchId
      },
      gender: this.$store.state.model.students.gender,
      source: this.$store.state.model.students.source,

      disabled: true,
      settings: {
        // perfectscrollbar settings
        maxScrollbarLength: 60,
        wheelSpeed: 0.6
      }
    };
  },
  computed: {
    isSidebarActiveLocal: {
      get() {
        return this.isSidebarActive;
      },
      set(val) {
        if (!val) {
          this.$emit("closeSidebar");
          this.initValues();
        }
      }
    },
    formatDate: {
      get() {
        return this.student.birthday;
      },
      set(val) {
        this.student.birthday = this.formatDateUTC(val);
      }
    }
  },
  components: {
    VuePerfectScrollbar,
    Datepicker
  },

  methods: {
    changeAvatar() {
      this.student.avatar = this.$refs.file.files[0];
    },

    formData() {
      let formData = new FormData();
      Object.keys(this.student).map(key => {
        formData.append(key, this.student[key]);
      });
      return formData;
    },
    initValues() {
      this.student = {
        birthday: "",
        facebook: "",
        address: "",
        phone: "",
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
        code: "",
        avatar: "",
        note: "",
        level: 1,
        position: 1,
        major: 1,
        gender: 0,
        branch_id: this.$store.state.getBranchId
      };
      this.$refs.file.value = null;
    },
    createStudent() {
      this.$vs.loading({
        background: "#1E6DB5",
        color: "#fff",
        container: "#button-with-loading",
        scale: 0.45
      });
      this.$http
        .post("students", this.formData(), {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        })
        .then(() => {
          this.$vs.notify({
            title: "Đã thêm mới thành công",
            text: "OK",
            iconPack: "feather",
            icon: "fa fa-lg fa-check-circle",
            color: "success"
          });
          this.callback();
          this.initValues();
          this.$emit("closePopupAdd", false);
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
              text: "Thêm mới thất bại",
              iconPack: "feather",
              icon: "fa fa-lg fa-exclamation-triangle",
              color: "danger"
            });
          }
        })
        .finally(() => {
          this.$vs.loading.close("#button-with-loading > .con-vs-loading");
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.add-new-data-sidebar {
  /deep/ .vs-sidebar--background {
    z-index: 52010;
  }

  /deep/ .vs-sidebar {
    z-index: 52010;
    width: 400px;
    max-width: 90vw;

    .img-upload {
      margin-top: 2rem;

      .con-img-upload {
        padding: 0;
      }

      .con-input-upload {
        width: 100%;
        margin: 0;
      }
    }
  }
}

.scroll-area--data-list-add-new {
  height: calc(100% - 4.3rem);
}
</style>

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
      <h4>Thêm nhân viên</h4>
      <feather-icon icon="XIcon" @click.stop="isSidebarActiveLocal = false" class="cursor-pointer"></feather-icon>
    </div>
    <vs-divider class="mb-0"></vs-divider>

    <VuePerfectScrollbar class="scroll-area--data-list-add-new pt-4 pb-6" :settings="settings">
      <div class="p-6">
          <div>
            <h4 class="text-center uppercase">Thông tin đăng nhập</h4>
            <!--Email-->
              <vs-input
                label="Email *"
                name="email"
                v-model="employee.email"
                class="mt-5 w-full"
                v-validate="'required|email'"
                autocomplete="email"
                placeholder="Demo@gmail.com"
              />
            <!--Password-->
              <vs-input
                label="Mật khẩu *"
                name="password"
                type="password"
                v-model="employee.password"
                class="mt-5 w-full"
                v-validate="'required|min:8'"
                autocomplete="new-password"
                placeholder="Nhập mật khẩu (8 ký tự)"
              />
            <!--Nhập lại mật khẩu-->
              <vs-input
                label="Nhập lại mật khẩu *"
                name="password_confirmation"
                autocomplete="new-password"
                type="password"
                v-model="employee.password_confirmation"
                class="mt-5 w-full"
                placeholder="Nhập lại mật khẩu"
              />
          </div>
          <div class="mt-8">
            <h4 class="text-center uppercase">Thông tin cá nhân</h4>
            <!-- NAME -->
              <vs-input
                label="Tên nhân viên *"
                name="name"
                v-model="employee.name"
                class="mt-5 w-full"
                v-validate="'required'"
                placeholder="Nhập tên nhân viên"
              />
            <!--địa chỉ-->
              <vs-input
                label="Địa chỉ"
                name="address"
                type="text"
                v-model="employee.address"
                class="mt-5 w-full"
                placeholder="Nhập địa chỉ"
              />
            <!--số điện thoại-->
              <vs-input
                label="Số điện thoại"
                name="phone"
                type="text"
                v-model="employee.phone"
                class="mt-5 w-full"
                placeholder="0123456789"
              />
            <!--facebook-->
              <vs-input
                label="Facebook"
                name="facebook"
                type="text"
                v-model="employee.facebook"
                class="mt-5 w-full"
                placeholder="http://demo.com"
              />
            <div class="mt-5">
              <label for class="vs-input--label">Ngày sinh</label>
              <datepicker
                :fullMonthName="true"
                v-model="formatDate"
                :language="languages[language]"
                format="d MMMM yyyy"
                :value="employee.birthday"
                class="w-full picker-custom"
                placeholder="Chọn ngày sinh"
              ></datepicker>
            </div>
            <!--ảnh đại diện-->
            <vx-upload-image
              text="Ảnh đại diện"
              :v-model-show="employee.avatar"
              :srcImage="srcAvatar"
              :show.sync="employee.avatar"
              :src.sync="srcAvatar"
            />
          </div>
          <div class="mt-8">
            <h4 class="text-center uppercase">Thông tin học vấn</h4>
            <!--trình độ học vấn-->
            <vs-select v-model="employee.level" label="Trình độ học vấn" class="mt-5 w-full">
              <vs-select-item
                :key="item.value"
                :value="item.value"
                :text="item.text"
                v-for="item in levels"
              />
            </vs-select>
            <!--chức vụ-->
              <vs-select v-model="employee.position" label="Chức vụ" class="mt-5 w-full">
                <vs-select-item
                  :key="item.value"
                  :value="item.value"
                  :text="item.text"
                  v-for="item in positions"
                />
              </vs-select>
            <!--nghiệm vụ-->
              <vs-select v-model="employee.major" label="Nghiệp vụ" class="mt-5 w-full">
                <vs-select-item
                  :key="item.value"
                  :value="item.value"
                  :text="item.text"
                  v-for="item in majors"
                />
              </vs-select>
            <!--trang thai-->
              <vs-select v-model="employee.status" label="Trạng thái" class="mt-5 w-full">
                <vs-select-item
                  :key="item.value"
                  :value="item.value"
                  :text="item.text"
                  v-for="item in status"
                />
              </vs-select>
            <!--nghi chú-->
              <div class="mt-5 note">
                <label class="vs-input--label">Ghi chú</label>
              </div>
              <vs-textarea
                style="border: solid 1px #dddddd"
                name="note"
                type="text"
                v-model="employee.note"
                class="w-full"
                :rows="5"
                placeholder="Nhập ghi chú"
              />
          </div>
      </div>
    </VuePerfectScrollbar>

    <div class="flex flex-wrap items-center justify-center p-6" slot="footer">
      <vs-button
        class="mr-6 vs-con-loading__container"
        @click="createEmployee"
        ref="addButton"
        id="button-with-loading"
      >Thêm</vs-button>
      <vs-button
        type="border"
        color="danger"
        @click="initValues()"
      >Hủy</vs-button>
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
      required: true
    },
    callback: {
      type: Function,
      required: true
    }
  },
  data() {
    return {
      srcAvatar: null,
      language: "vi",
      languages: lang,
      employee: {
        birthday: "",
        facebook: "",
        address: "",
        phone: "",
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
        avatar: "",
        note: "",
        level: 1,
        position: 5,
        major: 1,
        gender: 0,
        status: 1,
        branch_id: this.$store.state.getBranchId
      },
      levels: this.$store.state.model.employees.levels,
      positions: this.$store.state.model.employees.positions,
      majors: this.$store.state.model.employees.majors,
      status: this.$store.state.model.employees.status,
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
        return this.employee.birthday;
      },
      set(val) {
        this.employee.birthday = this.formatDateUTC(val);
      }
    }
  },
  components: {
    VuePerfectScrollbar,
    Datepicker
  },

  methods: {
    formData() {
      let formData = new FormData();
      Object.keys(this.employee).map(key => {
        formData.append(key, this.employee[key]);
      });
      return formData;
    },
    initValues() {
      this.employee = {
        birthday: "",
        facebook: "",
        address: "",
        phone: "",
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
        avatar: "",
        note: "",
        level: 1,
        position: 5,
        major: 1,
        status: 1,
        branch_id: this.$store.state.getBranchId
      };
      this.$emit('closeSidebar', false);
    },
    createEmployee() {
      this.$vs.loading({
        background: "#1E6DB5",
        color: "#fff",
        container: "#button-with-loading",
        scale: 0.45
      });
      this.$http
        .post("users", this.formData(), {
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
        })
        .catch(error => {
          let thisIns = this;
          thisIns.checkResponRequest(error.response.data, null, null, 'Thêm mới thất bại');
        })
        .finally(() => {
          this.$vs.loading.close("#button-with-loading > .con-vs-loading");
        });
    }
  }
};
</script>

<style lang="scss">
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

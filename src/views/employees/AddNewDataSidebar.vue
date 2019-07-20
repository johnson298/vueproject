<template>
  <vs-sidebar click-not-close position-right parent="body" default-index="1" color="primary" class="add-new-data-sidebar items-no-padding" spacer v-model="isSidebarActiveLocal">
    <div class="mt-6 flex items-center justify-between px-6">
        <h4>ADD NEW DATA</h4>
        <feather-icon icon="XIcon" @click.stop="isSidebarActiveLocal = false" class="cursor-pointer"></feather-icon>
    </div>
    <vs-divider class="mb-0"></vs-divider>

    <VuePerfectScrollbar class="scroll-area--data-list-add-new pt-4 pb-6" :settings="settings">

      <div class="p-6">
          <div>
              <h4>Thông tin đăng nhập</h4>
              <!--Email-->
              <div>
                  <vs-input label="Email" name="email" v-model="employee.email" class="mt-5 w-full" v-validate="'required|email'"/>
                  <small class="text-danger">{{ errors.first('email') }}</small>
              </div>
              <!--Password-->
              <div>
                  <vs-input label="Password" name="password" type="password" v-model="employee.password" class="mt-5 w-full" v-validate="'required|min:8'"/>
                  <small class="text-danger">{{ errors.first('password') }}</small>
              </div>
              <!--Nhập lại mật khẩu-->
              <div>
                  <vs-input label="Password Confirmation" name="password_confirmation"
                            type="password" v-model="employee.password_confirmation" class="mt-5 w-full"/>
              </div>
          </div>

          <div style="margin-top: 20px">
              <h4 style="margin-top: 10px">Thông tin cá nhân</h4>
              <!--Mã nhân viên-->
              <div>
                  <vs-input label="Mã nhân viên" name="code" v-model="employee.code" class="mt-5 w-full" v-validate="'required|min:5'"/>
                  <small class="text-danger">{{ errors.first('code') }}</small>
              </div>
              <!-- NAME -->
              <div>
                  <vs-input label="Name" name="name" v-model="employee.name" class="mt-5 w-full" v-validate="'required'" />
                  <small class="text-danger">{{ errors.first('name') }}</small>
              </div>
              <!--địa chỉ-->
              <div>
                  <vs-input label="Address" name="address" type="text" v-model="employee.address" class="mt-5 w-full" />
              </div>
              <!--số điện thoại-->
              <div>
                  <vs-input label="Phone" name="phone" type="text" v-model="employee.phone" class="mt-5 w-full" />
              </div>
              <!--facebook-->
              <div>
                  <vs-input label="Facebook" name="facebook" type="text" v-model="employee.facebook" class="mt-5 w-full" />
              </div>
              <div>
                  <vs-input label="Birthday" name="birthday" type="date" v-model="employee.birthday" class=" mt-5 w-full mydatepicker" />
              </div>
              <!--ảnh đại diện-->
              <div style="margin-bottom: 10px">
                  <div style="margin-top: 10px;margin-bottom: 10px"><label class="control-label">Ảnh đại diện</label></div>
                  <input type="file" id="file" ref="file" accept="image/*" class="form-control"
                         @change="changeAvatar">
              </div>
          </div>
          <div style="margin-top: 20px">
              <h4 style="margin-top: 10px">Thông tin học vấn</h4>
              <!--trình độ học vấn-->
              <vs-select v-model="employee.level" label="Trình độ học vấn" class="mt-5 w-full">
                  <vs-select-item :key="item.value" :value="item.value" :text="item.text" v-for="item in levels" />
              </vs-select>
              <!--chức vụ-->
              <div style="margin-top: 5px">
                  <vs-select v-model="employee.position" label="Chức vụ" class="mt-5 w-full">
                      <vs-select-item :key="item.value" :value="item.value" :text="item.text" v-for="item in positions" />
                  </vs-select>
              </div>
              <!--nghiệm vụ-->
              <div style="margin-top: 5px">
                  <vs-select v-model="employee.major" label="Nghiệp vụ" class="mt-5 w-full">
                      <vs-select-item :key="item.value" :value="item.value" :text="item.text" v-for="item in majors" />
                  </vs-select>
              </div>
              <!--nghi chú-->
              <div>
                  <label style="margin-top: 10px;">Note</label>
                  <vs-textarea style="border: solid 1px #dddddd" name="note" type="text" v-model="employee.note" class="mt-5 w-full" />
              </div>
          </div>
      </div>
    </VuePerfectScrollbar>

    <div class="flex flex-wrap items-center justify-center p-6" slot="footer">
      <vs-button class="mr-6" @click="createEmployee" v-if="!errors.any()">Add Data</vs-button>
      <vs-button type="border" color="danger" @click="isSidebarActiveLocal = false">Cancel</vs-button>
    </div>
  </vs-sidebar>
</template>

<script>
import VuePerfectScrollbar from 'vue-perfect-scrollbar';
import Datepicker from 'vuejs-datepicker';
let newVar;
newVar = {
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
      employee: {
        birthday: '',
        facebook: '',
        address: '',
        phone: '',
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        code: '',
        avatar: '',
        note: '',
        level: 1,
        position: 1,
        major: 1,
      },
      levels: [
        { text: 'Đại học', value: 1},
        { text: 'Cao đẳng', value: 2},
        { text: 'Khác', value: 3},
      ],
      positions: [
        { text: 'Giáo viên', value: 1},
        { text: 'Tư vấn', value: 2},
        { text: 'Kế toán', value: 3},
        { text: 'Quản lý', value: 4},
        { text: 'Khác', value: 5},
      ],
      majors: [
        { text: 'Có', value: 1 },
        { text: 'Không', value: 2 },
      ],
      disabled: true,
      settings: { // perfectscrollbar settings
        maxScrollbarLength: 60,
        wheelSpeed: .60,
      },
    };
  },
  computed: {
    isSidebarActiveLocal: {
      get() {
        return this.isSidebarActive;
      },
      set(val) {
        if (!val) {
          this.$emit('closeSidebar');
          this.initValues();
        }
      }
    }
  },
  components: {
    VuePerfectScrollbar,
    Datepicker,
  },

  methods: {
    changeAvatar() {
      this.employee.avatar = this.$refs.file.files[0];
    },

    formData() {
      let formData = new FormData();
      Object.keys(this.employee).map(key => {
        formData.append(key, this.employee[key]);
      });
      return formData;
    },
    initValues() {
      this.name = '';
      this.category = 'audio';
      this.order_status = 'pending';
      this.price = '';
    },
    createEmployee() {
      this.$http.post('users', this.formData(),
        {headers: {'content-type': 'multipart/form-data'}})
        .then(() => {
          this.$vs.notify({
            title: 'Đã thêm mới thánh công',
            text: 'OK',
            iconPack: 'feather',
            icon: 'fa fa-lg fa-check-circle',
            color: 'success'
          });
          this.callback();
          this.isSidebarActiveLocal = false;
          this.remove();
        })
        .catch((error) => {
          if (error.response.status === 500 && error.response.data.error.hasOwnProperty('validation')) {
            let message = error.response.data.error.validation[Object.keys(error.response.data.error.validation)[0]][0];
            this.$vs.notify({
              title: 'Validation error!',
              text: message,
              iconPack: 'feather',
              icon: 'fa fa-lg fa-exclamation-triangle',
              color: 'danger'
            });
          } else {
            this.$vs.notify({
              title: 'Error!',
              text: 'Thêm mới thật bại',
              iconPack: 'feather',
              icon: 'fa fa-lg fa-exclamation-triangle',
              color: 'danger'
            });
          }
        });
    },
    removeFile() {
      this.employee.avatar = '';
      this.employee.showPreview = false;
    },
    remove: function () {
      this.employee.facebook = '';
      this.position = '1';
      this.employee.birthday = '';
      this.employee.facebook = '';
      this.employee.address = '';
      this.employee.phone = '';
      this.employee.name = '';
      this.employee.email = '';
      this.employee.password ='';
      this.employee.password_confirmation = '';
      this.employee.code= '';
      this.employee.avatar= '';
      this.employee.note = '';
    },
  },
};
export default newVar;

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

<template>
  <vs-sidebar click-not-close position-right parent="body" default-index="1" color="primary" class="add-new-data-sidebar items-no-padding" spacer v-model="isSidebarActiveLocal">
    <div class="mt-6 flex items-center justify-between px-6">
      <h4>Thêm lớp học</h4>
      <feather-icon icon="XIcon" @click.stop="isSidebarActiveLocal = false" class="cursor-pointer"></feather-icon>
    </div>
    <vs-divider class="mb-0"></vs-divider>

    <VuePerfectScrollbar class="scroll-area--data-list-add-new pt-4 pb-6" :settings="settings">

      <div class="p-6">
        <form>

          <div>
            <h4 class="text-center uppercase">Thông tin lớp học</h4>
            <!--Email-->
            <div class="mb-5">
                <label for="" class="vs-input--label">Tên lớp học</label>
              <v-select label="countryName" :options="countries"></v-select>
            </div>
            <!--Password-->
            <div class="mb-5">
                <label for="" class="vs-input--label">Chương trình học</label>
              <v-select label="countryName" :options="countries"></v-select>
            </div>
            <!--Nhập lại mật khẩu-->
            <div class="mb-5">
                <label for="" class="vs-input--label">Chọn khuyến mại</label>
              <v-select label="countryName" :options="countries"></v-select>
            </div>
            <!--Nhập lại mật khẩu-->
            <div class="mb-5">
                <label for="" class="vs-input--label">Trạng thái</label>
              <v-select label="countryName" :options="countries"></v-select>
            </div>
            <!--nghi chú-->
            <div>
                <label for="" class="vs-input--label">Ghi chú</label>
              <vs-textarea style="border: solid 1px #dddddd" name="note" type="text" v-model="student.note" class="w-full" :rows="5"/>
            </div>
          </div>
        </form>
      </div>
    </VuePerfectScrollbar>

    <div class="flex flex-wrap items-center justify-center p-6" slot="footer">
      <vs-button class="mr-6 vs-con-loading__container" @click="createStudent" :disabled="errors.any()" ref="addButton" id="button-with-loading">Add Data</vs-button>
      <vs-button type="border" color="danger" @click="isSidebarActiveLocal = false">Cancel</vs-button>
    </div>
  </vs-sidebar>
</template>

<script>
import VuePerfectScrollbar from 'vue-perfect-scrollbar';

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
      countries: [
        {
          countryCode: "INR",
          countryName: "India",
        },
        {
          countryCode: "AUS",
          countryName: "Australia",
        },
        {
          countryCode: "CA",
          countryName: "Canada",
        },
      ],
      student: {
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
        gender : '0',
        school: '',
        class: '',
        source : '1'
      },
      gender: this.$store.state.model.students.gender,
      source: this.$store.state.model.students.source,

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
        gender: 0
      };
      this.$refs.file.value = null;
    },
    createStudent() {
      this.$vs.loading({
        background: '#1E6DB5',
        color: '#fff',
        container: '#button-with-loading',
        scale: 0.45
      });
      this.$http.post('students', this.formData(), { headers: { 'Content-Type': 'multipart/form-data' } })
        .then(() => {
          this.$vs.notify({
            title: 'Đã thêm mới thành công',
            text: 'OK',
            iconPack: 'feather',
            icon: 'fa fa-lg fa-check-circle',
            color: 'success'
          });
          this.callback();
          this.initValues();
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
              text: 'Thêm mới thất bại',
              iconPack: 'feather',
              icon: 'fa fa-lg fa-exclamation-triangle',
              color: 'danger'
            });
          }
        }).finally(() => {
          this.$vs.loading.close('#button-with-loading > .con-vs-loading');
        });
    }
  },
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

<template>
<div>
    <div class="vx-row">
        <div class="vx-col md:w-1/2 w-full mb-base">
            <div class="vx-col mb-6">
                <h2>Thông tin học viên</h2>
            </div>
            <div>
                <vs-input label="Mã học viên" v-model="student.code" class="mt-5 w-full" disabled />
            </div>
            <div>
                <vs-input label="Tên học viên" v-model="student.name" class="mt-5 w-full" />
            </div>
            <div>
                <vs-input label="Địa chỉ" v-model="student.address" class="mt-5 w-full" />
            </div>
            <div>
                <vs-input label="Điện thoại" v-model="student.phone" class="mt-5 w-full" />
            </div>
            <div>
                <vs-input label="Facebook" v-model="student.facebook" class="mt-5 w-full" />
            </div>
            <div class="mt-5">
                <label for="" class="vs-input--label">Ngày sinh</label>
                <datepicker :fullMonthName="true" v-model="formatDate" :language="languages[language]" format="d MMMM yyyy" :value="student.birthday" class="w-full picker-custom"></datepicker>
            </div>
            <div>
                <div class="vs-component vs-con-input-label vs-input mt-5 w-full vs-input-primary">
                    <label for="" class="vs-input--label">Ảnh đại diện</label>
                    <div class="vs-con-input">
                        <input type="file" id="file" ref="file" accept="image/*" @change="changeAvatar" class="vs-inputx vs-input--input normal hasValue">
                    </div>
                </div>
            </div>
            <div>
                <vs-input label="Trường" v-model="student.school" class="mt-5 w-full" />
            </div>
        </div>
        <div class="vx-col pt-8 md:w-1/2 w-full mb-base">
            <div>
                <vs-input label="Lớp" v-model="student.class" class="mt-6 w-full" />
            </div>
            <div>
                <div class="note mt-5"><label class="vs-input--label">Ghi chú</label></div>
                <vs-textarea style="border: solid 1px #dddddd" name="note" type="text" v-model="student.note" class="w-full" :rows="5" />
            </div>
            <div class="vx-col mb-6">
                <h2>Thông tin đăng nhập</h2>
            </div>
            <div>
                <vs-input label="Email" v-model="student.email" class="mt-5 w-full" />
            </div>
            <div>
                <vs-input label="Mật khẩu" type="password" class="mt-5 w-full" v-model="student.password" placeholder="Nhập mật khẩu mới" />
            </div>
            <div>
                <vs-input label="Nhập lại khẩu" type="password" class="mt-5 w-full" v-model="student.password_confirmation" placeholder="Nhập lại mật khẩu" />
            </div>

        </div>
    </div>
    <vs-row vs-type="flex" vs-justify="flex-end">
        <button id="update-loading" class="vs-component vs-button vs-button-primary vs-button-filled" ref="addButton" @click="updateStudent(student)">Cập nhật</button>
        <button class="ml-3 vs-component vs-button vs-button-danger vs-button-filled" ref="addButton" @click="studentInfo()">Hủy</button>
    </vs-row>
</div>
</template>

<script>
import Datepicker from 'vuejs-datepicker';
import * as lang from 'vuejs-datepicker/src/locale';
import 'video.js/dist/video-js.css';

export default {
  data() {
    return {
      language: "vi",
      languages: lang,
      isNavOpen: true,
      wasSidebarOpen: null,
      levels: this.$store.state.model.employees.levels,
      positions: this.$store.state.model.employees.positions,
      majors: this.$store.state.model.employees.majors,
      student: {
        birthday: '',
        facebook: '',
        address: '',
        phone: '',
        name: '',
        email: '',
        password: '',
        password_confirmation: null,
        code: '',
        avatar: '',
        note: '',
        level: 0,
        position: 0,
        major: 0,
      },
    };
  },
  components: {
    Datepicker
  },
  watch: {
    student() {
      this.student.phone = this.toNumber(this.student.phone);
    }
  },
  computed: {
    formatDate: {
      get() {
        return this.student.birthday;
      },
      set(val) {
        this.student.birthday = this.formatDateUTC(val);
      }
    },
    activeUserImg() {
      return this.$store.state.AppActiveUser.img;
    }
  },
  created() {
    this.studentInfo();
  },
  filters: {
    trim: function (string) {
      return string.trim();
    }

  },
  methods: {
    changeAvatar() {
      this.student.avatar = this.$refs.file.files[0];
    },
    studentInfo() {
      let vm = this;
      this.$http.get('students/' + this.$route.params.student).then(function (response) {
        vm.student = response.data.data;
      }).catch(() => {
        this.$router.push('/pages/error-404');
        this.$vs.notify({
          title: 'Error!',
          text: 'Có lỗi xảy ra',
          iconPack: 'feather',
          icon: 'fa fa-lg fa-exclamation-triangle',
          color: 'danger'
        });
      });
    },
    formData() {
      let formData = new FormData();
      Object.keys(this.student).map(key => {
        if (key != 'metadata') {
          formData.append(key, this.student[key]);
        }
        if(!this.student[key]){
          formData.append(key, '');
        }
      });
      if (typeof this.student.avatar === 'string') {
        formData.append('avatar', '');
      }
      formData.append('_method', 'PUT');
      return formData;
    },
    updateStudent(student) {
      this.$vs.loading({
        background: '#1E6DB5',
        color: '#fff',
        container: '#update-loading',
        scale: 0.45
      });
      this.$http.post('students/' + student.id, this.formData(), {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
      })
        .then(() => {
          this.studentInfo();
          this.$vs.notify({
            title: 'Đã sửa thành công',
            text: 'OK',
            iconPack: 'feather',
            icon: 'fa fa-lg fa-check-circle',
            color: 'success'
          });
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
              text: 'Sửa thất bại',
              iconPack: 'feather',
              icon: 'fa fa-lg fa-exclamation-triangle',
              color: 'danger'
            });
          }
        }).finally(() => {
          this.$vs.loading.close('#update-loading > .con-vs-loading');
        });
    },
    mounted() {
      this.wasSidebarOpen = this.$store.state.reduceButton;
      this.$store.commit('TOGGLE_REDUCE_BUTTON', false);
    },
    beforeDestroy() {
      if (!this.wasSidebarOpen) this.$store.commit('TOGGLE_REDUCE_BUTTON', false);
    },
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

            input[type='file'] {
                cursor: pointer;
                width: 65px;
                height: 34px;
                overflow: hidden;

                &::before {
                    content: 'change';
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
            content: '';
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

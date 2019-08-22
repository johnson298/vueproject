<template>
    <div>
        <div class="vs-row">
            <div class="vs-col sm:w-1/2">
                <vs-input label="Mã khách hàng" class="mt-5 w-full" disabled/>
            </div>
            <div class="vs-col sm:w-1/2">
                <vs-input label="Tên khách hàng" class="mt-5 w-full"/>
            </div>
        </div>
        <div class="vs-row">
            <div class="vs-col sm:w-1/2">
                <vs-input label="Email" class="mt-5 w-full"/>
            </div>
            <div class="vs-col sm:w-1/2">
                <vs-input label="Số điện thoại" type="number" class="mt-5 w-full"/>
            </div>
        </div>
        <div class="vs-row">
            <div class="vs-col sm:w-1/2">
                <vs-input label="Zalo" class="mt-5 w-full"/>
            </div>
            <div class="vs-col sm:w-1/2">
                <vs-input label="Địa chỉ" class="mt-5 w-full"/>
            </div>
        </div>
        <div class="vs-row">
            <div class="vs-col sm:w-1/2">
                <vs-input label="Giới tính" class="mt-5 w-full"/>
            </div>
            <div class="vs-col sm:w-1/2">
                <div class="mt-5 w-full">
                    <label class="vs-input--label">Ngày sinh</label>
                    <datepicker v-model="formatDate" :language="languages[language]" format="d MMMM yyyy" :value="customer.birthday" class="w-full picker-custom"></datepicker>
                </div>
            </div>
        </div>
        <div class="vs-row">
            <div class="vs-col sm:w-1/2">
                <vs-input label="Facebook" class="mt-5 w-full"/>
            </div>
            <div class="vs-col sm:w-1/2">
                <vs-select  label="Trạng thái" class="mt-5 w-full">
                    <vs-select-item :key="item.value" :value="item.value" :text="item.text" v-for="item in status" />
                </vs-select>
            </div>
        </div>
        <div class="vs-row">
            <div class="vs-col w-full">
                <div class="mt-5 note"><label class="vs-input--label">Nghi chú</label></div>
                <vs-textarea style="border: solid 1px #dddddd" name="note" type="text" class="w-full" :rows="5" />
            </div>
        </div>

        <vs-col class="mt-5" vs-w='12' vs-type="flex" vs-justify="flex-end">
            <!--:disabled="(selectedStudent!=null && (typeof selectedStudent) === 'object') ? false : true" -->
            <vs-button class="ml-3 vs-con-loading__container" type="filled" color="primary" @click="createInvoice" ref="addButton" id="btn-loading">Cập nhật</vs-button>
            <!--<vs-button :disabled="(selectedStudent!=null && (typeof selectedStudent) === 'object') ? false : true" class="ml-3" type="filled" color="primary">Tạo & in hóa đơn</vs-button>-->
            <vs-button class="ml-3" type="filled" color="danger" @click="backPage">Trở lại</vs-button>
        </vs-col>
    </div>
</template>

<script>
import vSelect from 'vue-select';
import Datepicker from 'vuejs-datepicker';
import * as lang from 'vuejs-datepicker/src/locale';
import 'video.js/dist/video-js.css';
export default {
  props: {
    callback: {
      type: Function,
      required: false
    }
  },
  data() {
    return {
      language: "vi",
      languages: lang,
      disabled: 'disabled',
      selectedStudent: null,
      totalPrice: 0,
      loading: false,
      customer: {
        birthday: '',
      },
      status: this.$store.state.model.customer.status,
    };
  },
  computed: {
    formatDate:{
      get(){
        return this.customer.birthday;
      },
      set(val){
        this.customer.birthday = this.formatDateUTC(val);
      }
    }
  },
  components: {

    'v-select': vSelect,
    Datepicker
  },
  methods: {
    backPage: function () {
      window.history.back();
    },
    initValues() {
      this.invoices = {
        student_id: null,
        courses: {
          course_id: '',
          price: ''
        },
        note: '',
        source: 3,
        amount: 0
      };
      null;
    },
    createInvoice() {
      this.$vs.loading({
        background: 'primary',
        color: '#fff',
        container: '#btn-loading',
        scale: 0.45
      });
      this.$http.post('invoices', {
        student_id: this.selectedStudent.id,
        course_id: this.invoices.courses.id,
        note: this.invoices.note,
        source: this.invoices.source,
        amount: this.invoices.amount
      })
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
          this.$vs.loading.close('#btn-loading > .con-vs-loading');
        });
    },
    getStudents(search = '') {
      let vm = this;
      return new Promise((resolve, reject) => {
        this.$http.get('students', {
          params: {
            search: search
          }
        })
          .then(function (response) {
            resolve(response.data.data);

          }).catch((e) => {
            vm.loading = false;
            reject(e);
          });
      });

    },
    onSuggestSelectStudent(suggest) {
      if (suggest) {
        this.invoices.student_id = suggest.id;
      }
    },
  }
};
</script>

<style lang="scss" scoped>
    .table-border {
        .vs-table--tbody {
            border: none;

            table {
                th {
                    border: 1px solid #ccc;
                }

                td {
                    border: 1px solid #ccc;
                }
            }
        }
    }

    .d-flex {
        display: flex;
    }

    .d-block {
        display: block
    }

    .pl-0 {
        padding-left: 0;
    }

    .border {
        border: 1px solid #ccc;
    }
</style>
<style>
    .vdp-datepicker.picker-custom input{
        width: 100% !important;
    }
</style>

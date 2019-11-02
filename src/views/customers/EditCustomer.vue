<template>
<div>
    <div class="vs-row">
        <div class="vs-col md:w-1/2 w-full mb-5">
            <vs-input label="Mã khách hàng" placeholder="Mã khách hàng" class="w-full uniquesdfgh" v-model="customerInfo.code" disabled="disabled" />
        </div>
        <div class="vs-col md:w-1/2 w-full mb-5">
            <vs-input label="Tên khách hàng" placeholder="Tên khách hàng" class="w-full uniquesdfgh" v-model="customerInfo.name" />
        </div>
    </div>
    <div class="row">
        <div class="vs-col md:w-1/2 w-full mb-5">
            <vs-input label="Email" placeholder="Email" class="w-full" v-model="customerInfo.email" />
        </div>
        <div class="vs-col md:w-1/2 w-full mb-5">
            <vs-input label="Số điện thoại" placeholder="0987654321" type="text" class="w-full" v-model="customerInfo.phone" />
        </div>
    </div>
    <div class="row">
        <div class="vs-col md:w-1/2 w-full mb-5">
            <vs-input label="Zalo" placeholder="Zalo" class="w-full" v-model="customerInfo.zalo" />
        </div>
        <div class="vs-col md:w-1/2 w-full mb-5">
            <vs-input label="Địa chỉ" placeholder="Nhập địa chỉ" class="w-full" v-model="customerInfo.address" />
        </div>
    </div>
    <div class="vs-row w-full">
        <div class="vs-col md:w-1/2 w-full mb-5">
            <vs-input label="Facebook" placeholder="http://demo.com" class="w-full" v-model="customerInfo.facebook" />
        </div>
        <div class="vs-col md:w-1/2 w-full mb-5">
            <div class="w-full">
                <label class="vs-input--label">Ngày sinh</label>
                <datepicker :fullMonthName="true" v-model="formatDate" :language="languages[language]" placeholder="Ngày sinh" format="d MMMM yyyy" :value="customerInfo.birthday" class="w-full picker-custom"></datepicker>
            </div>
        </div>
    </div>
    <div class="vs-row">
        <div class="vs-col md:w-1/2 w-full mb-5">
            <vs-select v-model="customerInfo.gender" label="Giới tính" class="w-full">
                <vs-select-item :key="item.value" :value="item.value" :text="item.text" v-for="item in genderCustomer" />
            </vs-select>
        </div>
        <div class="vs-col md:w-1/2 w-full mb-5">
            <vs-select v-model="customerInfo.status" label="Trạng thái" class="w-full">
                <vs-select-item :key="item.value" :value="item.value" :text="item.text" v-for="item in status" />
            </vs-select>
        </div>
    </div>
    <div class="vs-col w-full mb-5">
        <div class="note"><label class="vs-input--label">Ghi chú</label></div>
        <vs-textarea v-model="customerInfo.note" style="border: solid 1px #dddddd" name="note" placeholder="Ghi chú" type="text" class="w-full" :rows="5" />
    </div>
    <vs-col class="mt-5" vs-w='12' vs-type="flex" vs-justify="flex-end">
        <vs-button class="ml-3 vs-con-loading__container" type="filled" oclor="primary" @click="editCustomer(customerInfo.id)" ref="addButton" id="btn-loading">Chỉnh sửa</vs-button>
        <vs-button class="ml-3" type="filled" color="danger" @click="$emit('update:active',false)">Hủy</vs-button>
    </vs-col>
</div>
</template>

<script>
import Datepicker from 'vuejs-datepicker';
import * as lang from 'vuejs-datepicker/src/locale';
export default {
  props: {
    callback: {
      type: Function,
      required: false
    },
    customerInfo: {
      required: false
    }
  },
  data() {
    return {
      language: "vi",
      languages: lang,
      loading: false,
      customer: {
        name: null,
        email: null,
        phone: null,
        zalo: null,
        address: null,
        facebook: null,
        birthday: null,
        gender: 0,
        note: null,
        status: 1,
      },
      branchId: this.$store.state.getBranchId,
      status: this.$store.state.model.customer.status,
      genderCustomer: this.$store.state.model.students.gender,
    };
  },
  computed: {
    formatDate: {
      get() {
        return this.customerInfo.birthday;
      },
      set(val) {
        this.customerInfo.birthday = this.formatDateUTC(val);
      }
    }
  },
  components: {
    Datepicker,
  },
  methods: {
    formData() {
      let formData = new FormData();
      Object.keys(this.customerInfo).map(key => {
        formData.append(key, this.customerInfo[key]);
      });
      let keyObj = Object.keys(this.customerInfo);
      let valueObj = Object.values(this.customerInfo);
      for(let key in keyObj){
        if(!valueObj[key]){
          formData.append(keyObj[key], '');
        }
      }
      formData.append('_method', 'PUT');
      return formData;
    },
    initValues() {
      this.customer = {
        name: null,
        email: null,
        phone: null,
        zalo: null,
        address: null,
        facebook: null,
        birthday: null,
        gender: 0,
        note: null,
        status: 1
      };
    },
    editCustomer(id) {
      this.$vs.loading({
        background: '#1E6DB5',
        color: '#fff',
        container: '#btn-loading',
        scale: 0.45
      });
      this.$http.post(`branches/${this.branchId}/customers/${id}`, this.formData(), {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
      }).then(() => {
        this.$vs.notify({
          title: 'Đã sửa mới thành công',
          text: 'OK',
          iconPack: 'feather',
          icon: 'fa fa-lg fa-check-circle',
          color: 'success'
        });
        this.callback();
        this.initValues();
        this.$emit('closePopup', false);
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
    }
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
</style><style>
.vdp-datepicker.picker-custom input {
    width: 100% !important;
}
</style>

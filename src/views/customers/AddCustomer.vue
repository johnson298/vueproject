<template>
    <div>
        <div class="vs-row">
            <div class="vs-col md:w-1/2 w-full mb-5">
                <vs-input label="Tên khách hàng *" placeholder="Tên khách hàng" class="w-full uniquesdfgh" v-model="customer.name"/>
            </div>
            <div class="vs-col md:w-1/2 w-full mb-5">
                <vs-input label="Email *" placeholder="Email" class="w-full" v-model="customer.email"/>
            </div>
        </div>
        <div class="row">
            <div class="vs-col md:w-1/2 w-full mb-5">
                <vs-input label="Số điện thoại" placeholder="0987654321" type="number" class="w-full" v-model="customer.phone"/>
            </div>
            <div class="vs-col md:w-1/2 w-full mb-5">
                <vs-input label="Zalo" placeholder="Zalo" class="w-full" v-model="customer.zalo"/>
            </div>
        </div>
        <div class="row">
            <div class="vs-col md:w-1/2 w-full mb-5">
                <vs-input label="Địa chỉ" placeholder="Nhập địa chỉ" class="w-full" v-model="customer.address"/>
            </div>
            <div class="vs-col md:w-1/2 w-full mb-5">
                <vs-input label="Facebook" placeholder="http://demo.com" class="w-full" v-model="customer.facebook"/>
            </div>
        </div>
        <div class="vs-row w-full">
            <div class="vs-col md:w-1/2 w-full mb-5">
                <div class="w-full">
                    <label class="vs-input--label">Ngày sinh</label>
                    <datepicker :fullMonthName="true" v-model="formatDate" :language="languages[language]" placeholder="Ngày sinh" format="d MMMM yyyy" :value="customer.birthday" class="w-full picker-custom"></datepicker>
                </div>
            </div>
            <div class="vs-col md:w-1/2 w-full mb-5">
                <vs-select v-model="customer.gender" label="Giới tính" class="w-full">
                    <vs-select-item :key="item.value" :value="item.value" :text="item.text" v-for="item in genderCustomer" />
                </vs-select>
            </div>
        </div>
        <div class="vs-row">
            <div class="vs-col w-full mb-5">
                <div class="note"><label class="vs-input--label">Ghi chú</label></div>
                <vs-textarea v-model="customer.note" style="border: solid 1px #dddddd" name="note" placeholder="Ghi chú"  type="text" class="w-full" :rows="5" />
            </div>
        </div>
        <vs-col class="mt-5" vs-w='12' vs-type="flex" vs-justify="flex-end">
            <vs-button ref="loadableButton" id="button-with-loading-create"  class="ml-3 vs-con-loading__container" type="filled" color="primary" @click="createCustomer">Thêm khách hàng</vs-button>
            <vs-button class="ml-3" type="filled" color="danger" @click="initValues();$emit('update:active',false)">Hủy</vs-button>
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
        status: 1
      },
      branchId: this.$store.state.getBranchId,
      status: this.$store.state.model.customer.status,
      genderCustomer: this.$store.state.model.students.gender,
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
    Datepicker,
  },
  methods: {
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
    createCustomer() {
      this.$vs.loading({
        background: '#1E6DB5',
        color: '#fff',
        container: '#button-with-loading-create',
        scale: 0.45
      });
      this.$http.post(`branches/${this.branchId}/customers`, this.customer)
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
          this.$emit('closePopup', false);
        })
        .catch((error) => {
          this.checkResponRequest(error.response.data, null, null, "Thêm mới thật bại");
        }).finally(() => {
          this.$vs.loading.close('#button-with-loading-create > .con-vs-loading');
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
</style>
<style>
    .vdp-datepicker.picker-custom input{
        width: 100% !important;
    }
</style>

<template>
  <div>
    <div class="vs-row">
      <div class="vs-col md:w-1/2 w-full mb-5">
        <vs-input
          label="Tên khách hàng *"
          v-model="customerInfo.name"
          placeholder="Tên học viên"
          class="w-full"
        />
      </div>
      <div class="vs-col md:w-1/2 w-full mb-5">
        <vs-input
          label="Số điện thoại"
          v-model="customerInfo.phone"
          placeholder="Số điện thoại"
          type="text"
          class="w-full"
        />
      </div>
    </div>
    <div class="vs-row">
      <div class="vs-col md:w-1/2 w-full mb-5">
        <vs-input
          label="Mật khẩu *"
          type="password"
          v-model="student.password"
          placeholder="Mật khẩu"
          class="w-full"
        />
      </div>
      <div class="vs-col md:w-1/2 w-full mb-5">
        <vs-input
          label="Nhập lại mật khẩu *"
          v-model="student.password_confirmation"
          type="password"
          placeholder="Nhập lại mật khẩu"
          class="w-full"
        />
      </div>
    </div>
    <div class="row">
      <div class="vs-col md:w-1/2 w-full mb-5">
        <vs-input
          label="Email *"
          v-model="customerInfo.email"
          placeholder="Email"
          class="w-full"
        />
      </div>
      <div class="vs-col md:w-1/2 w-full mb-5">
        <vs-input
          label="Zalo"
          placeholder="Zalo"
          v-model="customerInfo.zalo"
          class="w-full"
        />
      </div>
    </div>
    <div class="row">
      <div class="vs-col md:w-1/2 w-full mb-5">
        <vs-input
          label="Địa chỉ"
          placeholder="Địa chỉ"
          v-model="customerInfo.address"
          class="w-full"
        />
      </div>
      <div class="vs-col md:w-1/2 w-full mb-5">
        <vs-select
          v-model="customerInfo.gender"
          label="Giới Tính"
          class="w-full"
        >
          <vs-select-item
            :key="item.value"
            :value="item.value"
            :text="item.text"
            v-for="item in gender"
          />
        </vs-select>
      </div>
    </div>
    <div class="vs-row w-full">
      <div class="vs-col md:w-1/2 w-full mb-5">
        <div class="w-full">
          <label class="vs-input--label">Ngày sinh</label>
          <datepicker
            v-model="formatDate"
            :language="languages[language]"
            placeholder="Ngày sinh"
            format="d MMMM yyyy"
            :value="customerInfo.birthday"
            class="w-full picker-custom"
          ></datepicker>
        </div>
      </div>
      <div class="vs-col md:w-1/2 w-full mb-5">
        <vs-input label="Facebook" placeholder="Facebook" class="w-full" />
      </div>
    </div>
    <div class="vs-row">
      <div class="vs-col md:w-1/2 w-full mb-5">
        <vs-input
          label="Trường học"
          placeholder=" Nhập tên trường"
          class="w-full"
          v-model="student.school"
        />
      </div>
      <div class="vs-col md:w-1/2 w-full mb-5">
        <vs-input
          label="Lớp học"
          placeholder="Nhập tên lớp"
          class="w-full"
          v-model="student.class"
        />
      </div>
    </div>
    <div class="vs-row"></div>
    <div class="vs-row">
      <div class="vs-col w-full mb-5">
        <div class="note">
          <label class="vs-input--label">Ghi chú</label>
        </div>
        <vs-textarea
          style="border: solid 1px #dddddd"
          name="note"
          placeholder="Ghi chú"
          type="text"
          class="w-full"
          :rows="3"
        />
      </div>
    </div>
    <vs-col class="mt-5" vs-w="12" vs-type="flex" vs-justify="flex-end">
      <vs-button
        ref="loadableButton"
        id="button-with-loading"
        class="ml-3 vs-con-loading__container"
        type="filled"
        color="primary"
        @click="createStudent"
        >Thêm</vs-button
      >
      <vs-button
        class="ml-3"
        type="filled"
        color="danger"
        @click="$emit('update:active', false)"
        >Hủy</vs-button
      >
    </vs-col>
  </div>
</template>

<script>
import vSelect from "vue-select";
import Datepicker from "vuejs-datepicker";
import * as lang from "vuejs-datepicker/src/locale";
import axios from "axios";
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
      loading: false,
      language: "vi",
      languages: lang,
      student: {
        password: null,
        password_confirmation: null,
        school: null,
        class: null,
        source: 4,
        note: null
      },
      gender: this.$store.state.model.students.gender
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
    },
    branchId() {
      return this.$store.state.getBranchId;
    }
  },
  components: {
    "v-select": vSelect,
    Datepicker
  },
  methods: {
    addStudent() {
      this.$vs.loading({
        background: "#1E6DB5",
        color: "#fff",
        container: "#button-with-loading",
        scale: 0.45
      });
      this.$http
        .post("students", {
          name: this.customerInfo.name,
          email: this.customerInfo.email,
          birthday: this.customerInfo.birthday,
          facebook: this.customerInfo.facebook,
          phone: this.customerInfo.phone,
          address: this.customerInfo.address,
          school: this.student.school,
          class: this.student.class,
          source: this.student.source,
          note: this.student.note,
          avatar: this.student.avatar,
          password: this.student.password,
          password_confirmation: this.student.password_confirmation
        })
        .then(() => {
          this.$emit("closePopupConvert", false);
          this.callback();
          this.$vs.notify({
            title: "Đã thêm mới thành công",
            text: "OK",
            iconPack: "feather",
            icon: "fa fa-lg fa-check-circle",
            color: "success"
          });
        })
        .catch(error => {
          if (error.response) {
            if (
              error.response.status === 500 &&
              error.response.data.error.hasOwnProperty("validation")
            ) {
              let message =
                error.response.data.error.validation[
                  Object.keys(error.response.data.error.validation)[0]
                ][0];
              this.$vs.notify({
                title: "Thêm mới học viên thất bại !",
                text:
                  Object.keys(error.response.data.error.validation)[0] ===
                  "email"
                    ? "Email này đã tồn tại trong danh sách học viên"
                    : message,
                iconPack: "feather",
                icon: "fa fa-lg fa-exclamation-triangle",
                color: "danger"
              });
            } else {
              this.$vs.notify({
                title: "Có lỗi!",
                text: "Thêm mới thất bại",
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
    editStatusCustomer() {
      this.$http
        .put(`branches/${this.branchId}/customers/${this.customerInfo.id}`, {
          status: 3
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
              title: "Thêm mới học viên thất bại !",
              text: message,
              iconPack: "feather",
              icon: "fa fa-lg fa-exclamation-triangle",
              color: "danger"
            });
          } else {
            this.$vs.notify({
              title: "Có lỗi!",
              text: "Khách hàng chưa được chuyển đổi",
              iconPack: "feather",
              icon: "fa fa-lg fa-exclamation-triangle",
              color: "danger"
            });
          }
        });
    },
    createStudent() {
      axios.all([this.addStudent(), this.editStatusCustomer()]);
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
  display: block;
}

.pl-0 {
  padding-left: 0;
}

.border {
  border: 1px solid #ccc;
}
</style>

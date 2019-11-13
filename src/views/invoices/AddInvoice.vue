<template>
  <div class="vs-con-loading__container" id="div-with-loading-popup">
    <vs-row vs-w="12">
      <vs-col vs-w="12" id="print-invoice">
        <div>
          <div class="vs-component vs-con-input-label vs-input mb-5 w-full vs-input-primary">
            <vue-simple-suggest
              v-model="selectedStudent"
              mode="select"
              ref="suggestComponentStudents"
              placeholder="Tìm học viên..."
              value-attribute="id"
              display-attribute="name"
              :list="getStudents"
              :debounce="200"
              :filter-by-query="false"
              @select="onSuggestSelectStudent"
            >
              <div class="g">
                <input type="text" v-model="searchData" placeholder="Tìm học viên..." />
              </div>
              <template slot="misc-item-above" slot-scope="{ suggestions, query }">
                <div class="misc-item">
                  <span>Bạn đang tìm kiếm '{{ query }}'.</span>
                </div>

                <template v-if="suggestions.length > 0">
                  <div class="misc-item">
                    <span>{{ suggestions.length }} đề xuất được hiển thị...</span>
                  </div>
                  <hr />
                </template>

                <div class="misc-item" v-else-if="!loading">
                  <span>Không có kết quả</span>
                </div>
              </template>

              <div slot="suggestion-item" slot-scope="{ suggestion, query }">
                <div class="text">
                  <span>{{ suggestion.name | truncate(40) }}</span>
                </div>
              </div>

              <div
                class="misc-item"
                slot="misc-item-below"
                slot-scope="{ suggestions }"
                v-if="loading"
              >
                <span>Đang tìm kiếm...</span>
              </div>
            </vue-simple-suggest>
          </div>
        </div>
        <div
          v-if="selectedStudent!=null && (typeof selectedStudent) === 'object'"
          key="check-course"
        >
          <vs-select
            v-if="coursesRegis.length != 0"
            v-model="invoices.courses"
            label="Chọn lớp học"
            class="mt-5 w-full"
          >
            <vs-select-item
              :key="item.id"
              :value="item"
              :text="item.name"
              v-for="item in coursesRegis"
              @change="selectCourseRegister($event)"
            />
          </vs-select>
          <div v-else key="check-course">
            <p class="text-danger">Học viên chưa đăng ký khóa học nào !</p>
          </div>
          <h5 class="my-5">Thông tin học viên</h5>
          <vs-row>
            <vs-col class="text-center" vs-w="3">
              <vs-avatar size="80px" :src="selectedStudent.avatar" />
            </vs-col>
            <vs-col vs-w="9">
              <div class="vx-row mb-5">
                <div class="vx-col sm:w-1/4 w-full">
                  <strong>Tên học viên:</strong>
                </div>
                <div class="vx-col sm:w-3/4 w-full">
                  <span>{{ selectedStudent.name }}</span>
                </div>
              </div>
              <div class="vx-row mb-5">
                <div class="vx-col sm:w-1/4 w-full">
                  <strong>Mã học viên:</strong>
                </div>
                <div class="vx-col sm:w-3/4 w-full">
                  <span>{{ selectedStudent.code }}</span>
                  <vs-input value="id" type="hidden" />
                </div>
              </div>
              <div class="vx-row mb-5">
                <div class="vx-col sm:w-1/4 w-full">
                  <strong>Điện thoại:</strong>
                </div>
                <div class="vx-col sm:w-3/4 w-full">
                  <span>{{ selectedStudent.phone }}</span>
                </div>
              </div>
              <div class="vx-row mb-5">
                <div class="vx-col sm:w-1/4 w-full">
                  <strong>Địa chỉ:</strong>
                </div>
                <div class="vx-col sm:w-3/4 w-full">
                  <span>{{ selectedStudent.address }}</span>
                </div>
              </div>
            </vs-col>
          </vs-row>
        </div>
        <div
          class="vx-row mb-5"
          v-if="invoices.courses.id && selectedStudent.courses.length != 0 && invoices.courses.register.paid !=='undefined'"
        >
          <div class="vx-col w-full pr-0">
            <h5 class="mt-3 mb-3">Chương trình học</h5>
          </div>
          <div class="vx-col w-full">
            <vs-table :data="invoices.courses" class="table-border">
              <template slot="thead">
                <vs-th class="p-2">Tên CT</vs-th>
                <vs-th class="p-2">
                  Học phí
                  <br />(vnđ)
                </vs-th>
                <vs-th class="p-2">
                  Còn thiếu
                  <br />(vnđ)
                </vs-th>
                <vs-th class="p-2">Muốn thanh toán (vnđ)</vs-th>
              </template>

              <template slot-scope="{data}">
                <vs-tr>
                  <vs-td>{{ data.name }}</vs-td>

                  <vs-td>{{ formatPrice(data.price) }}</vs-td>

                  <vs-td>{{ (data.price - invoices.courses.register.paid) > 0 ? formatPrice(data.price - invoices.courses.register.paid) : 0 }}</vs-td>

                  <vs-td>
                    <vs-input v-model="invoices.amount" :value="data.price" type="number" />
                  </vs-td>
                </vs-tr>
              </template>
            </vs-table>
          </div>
          <div class="vx-col w-full">
            <vs-row class="mt-5">
              <vs-col vs-w="6" class="p-0">
                <p class="pt-2">
                  <strong class="text-primary">Tổng tiền thanh toán:</strong>
                  {{ formatPrice(invoices.amount) }} vnđ
                </p>
              </vs-col>

              <vs-col vs-w="6" class="p-0">
                <div class="vx-row d-flex">
                  <div class="vx-col p-0 sm:w-1/4 w-full">
                    <strong class="pt-2 d-block text-primary">Bằng chữ:</strong>
                  </div>
                  <div class="vx-col pl-0 sm:w-3/4 w-full">
                    <span class="mt-2 d-block">{{ DOCSO(invoices.amount) }}</span>
                  </div>
                </div>
              </vs-col>
            </vs-row>
            <vs-row class="mt-5">
              <vs-col vs-w="6" class="p-0">
                <div class="vx-row d-flex ml-1">
                  <div class="vx-col p-0 sm:w-1/4 w-full">
                    <strong class="pt-2 d-block text-primary">Số tiền (vnđ):</strong>
                  </div>
                  <div class="vx-col pl-0 sm:w-3/4 w-full">
                    <vs-input v-model="invoices.total" type="number" />
                  </div>
                </div>
              </vs-col>

              <vs-col vs-w="6" class="p-0">
                <div class="vx-row d-flex">
                  <div class="vx-col p-0 sm:w-1/4 w-full">
                    <strong class="pt-2 d-block text-primary">Trả lại:</strong>
                  </div>
                  <div class="vx-col pl-0 sm:w-3/4 w-full">
                    <span
                      class="mt-2 d-block"
                      v-if="parseInt(invoices.total) > parseInt(invoices.amount)"
                    >{{ formatPrice(invoices.total - invoices.amount) }}vnđ</span>
                  </div>
                </div>
              </vs-col>
            </vs-row>

            <h5 class="mt-3 mb-3">Hình thức thanh toán</h5>
            <ul class="d-flex justify-content-center">
              <li class="mr-5" v-for="(item, key) in sourceInvoices" :key="key">
                <vs-radio v-model="invoices.source" :vs-value="item.value">{{item.text}}</vs-radio>
              </li>
            </ul>
          </div>
        </div>
        <div>
          <div class="mt-5 note">
            <label class="vs-input--label">Ghi chú</label>
          </div>
          <vs-textarea
            v-model="invoices.note"
            style="border: solid 1px #dddddd; background: #fff"
            name="note"
            type="text"
            class="w-full"
            :rows="5"
            placeholder="nhập ghi chú"
          />
        </div>
      </vs-col>
      <vs-col class="mt-5" vs-w="12" vs-type="flex" vs-justify="flex-end">
        <vs-button
          :disabled="(selectedStudent!=null && (typeof selectedStudent) === 'object') ? false : true"
          class="ml-3 vs-con-loading__container"
          type="filled"
          color="primary"
          @click="createInvoice"
          ref="addButton"
          id="btn-loading"
        >Tạo hóa đơn</vs-button>
        <vs-button
          :disabled="(selectedStudent!=null && (typeof selectedStudent) === 'object') ? false : true"
          class="ml-3"
          type="filled"
          color="primary"
          @click="createInvoice"
        >Tạo & in hóa đơn</vs-button>
        <vs-button
          class="ml-3"
          type="filled"
          color="danger"
          @click="initValues();$emit('update:active',false)"
        >Hủy</vs-button>
      </vs-col>
    </vs-row>
  </div>
</template>

<script>
import vSelect from "vue-select";
export default {
  props: {
    callback: {
      type: Function,
      required: false
    }
  },
  data() {
    return {
      coursesRegis: [],
      sourceInvoices: this.$store.state.model.invoices.source,
      searchData: "",
      disabled: "disabled",
      selectedStudent: null,
      totalPrice: 0,
      loading: false,
      invoices: {
        student_id: null,
        courses: {
          course_id: null,
          price: null,
          register: {
            paid: 0
          }
        },
        note: "",
        source: 3,
        amount: 0,
        total: 0
      }
    };
  },
  components: {
    "v-select": vSelect
  },
  computed: {
    branchId() {
      return this.$store.state.getBranchId;
    }
  },
  methods: {
    createInvoice() {
      if (
        this.invoices.amount >
        this.invoices.courses.price - this.invoices.courses.register.paid
      ) {
        this.$vs.notify({
          title: "Lỗi!",
          text: "Số tiền muốn đóng không lớn hơn số tiền còn thiếu",
          iconPack: "feather",
          icon: "fa fa-lg fa-exclamation-triangle",
          color: "danger"
        });
        return false;
      }
      this.$vs.loading({
        container: "#div-with-loading-popup",
        scale: 0.6
      });
      this.$http
        .post(`branches/${this.branchId}/invoices?type=1`, {
          student_id: this.selectedStudent.id,
          course_id: this.invoices.courses.id,
          note: this.invoices.note,
          source: this.invoices.source,
          amount: this.invoices.amount
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
          this.$emit("closePopupInvoice", false);
        })
        .catch(error => {
          if (error.response.status) {
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
          }
        })
        .finally(() => {
          this.$vs.loading.close("#div-with-loading-popup > .con-vs-loading");
        });
    },
    getStudents(search = "") {
      let vm = this;
      return new Promise((resolve, reject) => {
        this.$http
          .get("students", {
            params: {
              search: search
            }
          })
          .then(function(response) {
            resolve(response.data.data);
          })
          .catch(e => {
            vm.loading = false;
            reject(e);
          });
      });
    },
    onSuggestSelectStudent(suggest) {
      if (suggest) {
        this.invoices.student_id = suggest.id;
        let vm = this;
        vm.$vs.loading({
          container: "#div-with-loading-popup",
          scale: 0.6
        });
        vm.$http
          .get(`students/${suggest.id}/courses`)
          .then(res => {
            vm.coursesRegis = res.data.data;
          })
          .catch(() => {
            vm.$vs.notify({
              title: "Lỗi",
              text: "Lỗi tìm lớp của học viên",
              color: "danger",
              iconPack: "feather",
              icon: "icon-alert-circle"
            });
          })
          .finally(() => {
            vm.$vs.loading.close("#div-with-loading-popup > .con-vs-loading");
          });
      }
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

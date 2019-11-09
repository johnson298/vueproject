<template>
  <div>
    <div>
      <div class="vs-row">
        <div class="vs-col sm:w-1/2 w-full mb-5">
          <vs-input label="Tên thông báo" placeholder="Tên thông báo" class="w-full" />
        </div>
        <div class="vs-col sm:w-1/2 w-full mb-5">
          <label class="vs-input--label">Lên lịch</label>
          <flat-pickr
            class="w-full picker-custom vs-inputx vs-input--input normal"
            style="border: 1px solid rgba(0, 0, 0, 0.2);"
            :config="configdateTimePicker"
            v-model="datetime"
            placeholder="Chọn ngày"
          />
        </div>
      </div>
      <div class="vs-row">
        <div class="vs-col sm:w-1/2 w-full mb-5">
          <vs-select
            label="Đối tượng"
            v-model="campaign.position"
            class="w-full"
            placeholder="Chọn đối tượng"
          >
            <vs-select-item value="Giáo viên" text="Giáo viên" />
            <vs-select-item value="Kế toán" text="Kế toán" />
          </vs-select>
        </div>
        <div class="vs-col sm:w-1/2 w-full mb-5">
          <label class="vs-input--label">Hình thức gửi</label>
          <div class="vs-row">
            <div class="vs-col sm:w-1/3 pl-0">
              <vs-checkbox>App</vs-checkbox>
            </div>
            <div class="vs-col sm:w-1/3 pl-0">
              <vs-checkbox>SMS</vs-checkbox>
            </div>
            <div class="vs-col sm:w-1/3 pl-0">
              <vs-checkbox>Email</vs-checkbox>
            </div>
          </div>
        </div>
      </div>

      <div class="vs-row">
        <div class="vs-col sm:w-1/2 w-full mb-5">
          <div>
            <vs-select label="Phạm vi gửi" v-model="campaign.range_send" class="w-full">
              <vs-select-item
                :key="item.value"
                :value="item.value"
                :text="item.text"
                v-for="item in range_send"
              />
            </vs-select>
          </div>
        </div>
      </div>
      <div class="vs-row mt-5 mb-5">
        <div class="vs-col w-full">
          <div class="note">
            <label class="vs-input--label">Nội dung</label>
          </div>
          <ckeditor
            :editor="editor"
            v-model="editorData"
            :config="editorConfig"
            class="w-full mt-5"
          ></ckeditor>
        </div>
      </div>
    </div>
    <div class="flex flex-wrap items-center flex-row-reverse p-6 action-footer">
      <vs-col class="mt-5" vs-w="12" vs-type="flex" vs-justify="flex-end">
        <vs-button
          class="ml-3 vs-con-loading__container"
          type="filled"
          color="primary"
          @click="createCampaign"
          ref="addButton"
          id="btn-loading"
        >Thêm</vs-button>
        <vs-button class="ml-3" type="filled" color="danger">Hủy</vs-button>
      </vs-col>
    </div>
  </div>
</template>

<script>
import vSelect from "vue-select";
import Datepicker from "vuejs-datepicker";
import * as lang from "vuejs-datepicker/src/locale";
import "video.js/dist/video-js.css";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import flatPickr from "vue-flatpickr-component";
import "@/assets/css/flatpickr.css";

export default {
  props: {
    callback: {
      type: Function,
      required: false
    }
  },
  data() {
    return {
      questions: [
        {
          name: "",
          answers: [
            {
              name: "",
              check: false
            }
          ]
        }
      ],
      radios2: "1",
      datetime: null,
      configdateTimePicker: {
        enableTime: true,
        dateFormat: "d-m-Y H:i"
      },
      date: null,
      editor: ClassicEditor,
      editorData: "",
      editorConfig: {
        // The configuration of the rich-text editor.
      },
      language: "vi",
      languages: lang,
      disabled: "disabled",
      selectedBranch: null,
      loading: false,
      campaign: {
        birthday: "",
        range_send: 1,
        position: null
      },
      selectedProgram: null,
      selectedCourses: null,
      range_send: this.$store.state.model.campaign.range_send,
      position: this.$store.state.model.campaign.position
    };
  },
  computed: {
    formatDate: {
      get() {
        return this.customer.birthday;
      },
      set(val) {
        this.customer.birthday = this.formatDateUTC(val);
      }
    },
    branchId() {
      return this.$store.state.getBranchId;
    }
  },
  components: {
    "v-select": vSelect,
    Datepicker,
    flatPickr
  },
  methods: {
    backPage: function() {
      window.history.back();
    },
    addRow() {
      this.questions.push({ name: "", answers: [{ name: "", check: false }] });
    },
    addAnswer(row) {
      row.answers.push({ name: "", check: false });
    },
    deleteRow: function(index) {
      this.questions.splice(index, 1);
    },
    deleteAnswer(row, index) {
      if (index > 0) {
        row.answers.splice(index, 1);
      }
    },
    onSuggestSelectProgram(suggest) {
      if (suggest) {
        this.courses.program_id = suggest.id;
      }
    },
    onSuggestSelectBranch(suggest) {
      if (suggest) {
        this.courses.branch_id = suggest.id;
      }
    },
    onSuggestSelectCourses(suggest) {
      if (suggest) {
        this.courses.branch_id = suggest.id;
      }
    },
    getCourses(search = "") {
      let vm = this;
      return new Promise((resolve, reject) => {
        this.$http
          .get(`branches/${this.branchId}/courses`, {
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
    getBranches(search = "") {
      let vm = this;
      return new Promise((resolve, reject) => {
        this.$http
          .get("branches", {
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
    getPrograms(search = "") {
      let vm = this;
      return new Promise((resolve, reject) => {
        this.$http
          .get(`branches/${this.branchId}/programs`, {
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
    initValues() {
      this.invoices = {
        student_id: null,
        courses: {
          course_id: "",
          price: ""
        },
        note: "",
        source: 3,
        amount: 0
      };
      null;
    },
    createCampaign() {
      this.$vs.loading({
        background: "#1E6DB5",
        color: "#fff",
        container: "#btn-loading",
        scale: 0.45
      });
      this.$http
        .post("invoices", {
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
          this.$vs.loading.close("#btn-loading > .con-vs-loading");
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
  display: block;
}

.pl-0 {
  padding-left: 0;
}

.border {
  border: 1px solid #ccc;
}
</style>
<style>
.vdp-datepicker.picker-custom input {
  width: 100% !important;
}
.ck-editor__editable_inline {
  min-height: 200px !important;
}
</style>

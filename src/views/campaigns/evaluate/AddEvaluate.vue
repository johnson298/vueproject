<template>
  <div>
    <div>
      <div class="vs-row">
        <div class="vs-col sm:w-1/4 w-full mb-5">
          <vs-input label="Mã đánh giá" placeholder="Mã ID" class="w-full" disabled />
        </div>
        <div class="vs-col sm:w-1/4 w-full mb-5">
          <vs-input label="Tên đánh giá" placeholder="Tên chiến dịch" class="w-full" />
        </div>
        <div class="vs-col sm:w-1/4 w-full mb-5">
          <vs-input label="Lớp đánh giá" placeholder="Chọn lớp đánh giá" class="w-full" />
        </div>
        <div class="vs-col sm:w-1/4 w-full mb-5">
          <label class="vs-input--label">Ngày áp dụng</label>
          <flat-pickr
            class="w-full picker-custom vs-inputx vs-input--input normal"
            style="border: 1px solid rgba(0, 0, 0, 0.2);"
            :config="configdateTimePicker"
            v-model="datetime"
            placeholder="Lên lịch"
          />
        </div>
      </div>
      <div class="vs-row">
        <div class="vs-col w-full mb-5">
          <div class="note">
            <label class="vs-input--label">Nghi chú</label>
          </div>
          <vs-textarea
            style="border: solid 1px #dddddd"
            placeholder="Mô tả thêm..."
            name="note"
            type="text"
            class="w-full"
            :rows="4"
          />
        </div>
      </div>
      <h5>Thêm câu hỏi đánh giá:</h5>
      <div>
        <div class="vs-row" v-for="(row, index) in questions" :key="index">
          <div class="vs-col w-full mt-5">
            <div>
              <label class="vs-input--label">Câu hỏi: {{index+1}}</label>
            </div>
            <div class="vs-row">
              <div class="vs-col sm:w-5/6 pl-0">
                <vs-input placeholder="Câu hỏi ..." v-model="row.name" class="w-full" />
              </div>
              <div class="vs-col sm:w-1/6 pl-0">
                <vs-button
                  color="danger"
                  class="ml-3"
                  icon="delete_forever"
                  @click.prevent="deleteRow(index)"
                ></vs-button>
              </div>
            </div>
            <div class="vs-row" v-for="(answer, index) in row.answers" :key="index">
              <div class="vs-col mt-5 w-full">
                <div class="vs-row">
                  <label class="vs-input--label">Câu trả lời: {{index+1}}</label>
                </div>
                <div class="vs-row">
                  <div class="vs-col sm:w-1/10 pl-0 pr-0">
                    <vs-checkbox v-model="answer.check"></vs-checkbox>
                  </div>
                  <div class="vs-col sm:w-2/3 pl-0 pr-0">
                    <vs-input placeholder="Câu trả lời..." v-model="answer.name" class="w-full" />
                  </div>
                  <div class="vs-col sm:w-1/10">
                    <div class="vs-row">
                      <div class="vs-col sm:w-1/2 pl-0">
                        <vs-button color="success" @click.prevent="addAnswer(row)">
                          <i class="feather icon-plus"></i>
                        </vs-button>
                      </div>
                      <div class="vs-col sm:w-1/2 pl-0">
                        <vs-button
                          color="danger"
                          class="ml-3"
                          icon="delete_forever"
                          @click.prevent="deleteAnswer(row,index)"
                        ></vs-button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="vs-row">
          <div class="vs-col mt-5">
            <vs-button color="success" @click.prevent="addRow">+ câu hỏi</vs-button>
          </div>
        </div>
      </div>
    </div>
    <div class="flex flex-wrap items-center flex-row-reverse p-6 action-footer">
      <vs-col class="mt-5" vs-w="12" vs-type="flex" vs-justify="flex-end">
        <vs-button
          class="ml-3 vs-con-loading__container"
          type="filled"
          color="primary"
          ref="addButton"
          id="btn-loading"
        >Thêm</vs-button>
        <vs-button
          class="ml-3"
          type="filled"
          color="danger"
          @click="$emit('closePopupAdd', false)"
        >Hủy</vs-button>
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
        position: 1
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

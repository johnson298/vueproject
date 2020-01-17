<template>
  <div>
    <div>
      <div class="vs-row">
        <div class="vs-col sm:w-1/3 w-full mb-5">
          <vs-input label="Tên đánh giá" placeholder="Tên chiến dịch" class="w-full" v-model="evaluate.name"/>
        </div>
        <div class="vs-col sm:w-1/3 w-full mb-5">
          <div class="vs-component vs-con-input-label vs-input w-full vs-input-primary">
            <vx-search-ajax
              text="Lớp học "
              :link-api="`branches/${branchId}/courses`"
              :change.sync="evaluate.course_id"
              get-attribute="id"
            />
          </div>
        </div>
        <div class="vs-col sm:w-1/3 w-full mb-5">
          <label class="vs-input--label">Ngày áp dụng</label>
          <flat-pickr
            class="w-full picker-custom vs-inputx vs-input--input normal"
            style="border: 1px solid rgba(0, 0, 0, 0.2);"
            :config="configdateTimePicker"
            v-model="evaluate.date"
            placeholder="Lên lịch"
          />
        </div>
      </div>
      <div class="vs-row">
        <div class="vs-col w-full mb-5">
          <div class="note">
            <label class="vs-input--label">Nội dung đánh giá</label>
          </div>
          <vs-textarea
            style="border: solid 1px #dddddd"
            placeholder="Mô tả thêm..."
            name="note"
            type="text"
            class="w-full"
            :rows="4"
            v-model="evaluate.content"
          />
        </div>
      </div>
      <h5 class="pl-5 mb-5">Thêm câu hỏi:</h5>
      <div class="mb-5 px-5 d-flex align-end" v-for="(row, index) in evaluate.question" :key="index">
        <vs-input :label="`Câu hỏi ${index + 1}`" v-model="evaluate.question[index]" class="w-full"></vs-input>
        <vs-button radius color="danger" class="ml-3" icon="delete_forever" @click.prevent="deleteRow(index)" ></vs-button>
      </div>
      <div class="mt-5 px-5">
        <vs-button color="success" @click.prevent="addRow" size="small">
          <font-awesome-icon icon="plus" />
        </vs-button>
      </div>
    </div>
    <div class="flex flex-wrap items-center flex-row-reverse p-6 action-footer">
      <vs-col class="mt-5" vs-w="12" vs-type="flex" vs-justify="flex-end">
        <vs-button
          class="ml-3 vs-con-loading__container"
          type="filled"
          color="primary"
          ref="addButton"
          id="button-with-loading"
          @click="createEvaluate"
        >Thêm </vs-button>
        <vs-button
          class="ml-3"
          type="filled"
          color="danger"
          @click="$emit('closePopupAdd', false)"
        >Hủy </vs-button>
      </vs-col>
    </div>
  </div>
</template>

<script>
import vSelect from "vue-select";
import Datepicker from "vuejs-datepicker";
import * as lang from "vuejs-datepicker/src/locale";
import "video.js/dist/video-js.css";
import flatPickr from "vue-flatpickr-component";
import "@/assets/css/flatpickr.css";

export default {
  props: {
    callback: {
      type: Function,
      required: false
    },
    getInfoEvaluate: {
      require: true,
      type: Object
    }
  },
  created() {
    if (this.getInfoEvaluate){
      this.evaluate.question = this.getInfoEvaluate.evaluate_item.map(item => item.question);
      this.evaluate.content = this.getInfoEvaluate.evaluates.content;
    }
  },
  data() {
    return {
      configdateTimePicker: {
        enableTime: true,
        dateFormat: "Y-m-d"
      },
      date: null,
      language: "vi",
      languages: lang,
      disabled: "disabled",
      loading: false,
      evaluate: {
        name: null,
        course_id: null,
        user_id: JSON.parse(localStorage.getItem('user')).id,
        date: null,
        question: ["Giáo viên dạy nhiệt tình ?"],
        content: null
      }
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
    addRow() {
      this.evaluate.question.push("");
    },
    deleteRow: function (index) {
      this.evaluate.question.splice(index, 1);
    },
    initValues() {
      this.evaluate = {
        name: null,
        course_id: null,
        user_id: JSON.parse(localStorage.getItem('user')).id,
        date: null,
        question: ["Giáo viên dạy nhiệt tình ?"],
        content: null
      };
    },
    createEvaluate(){
      const thisIns = this;
      thisIns.$vs.loading({
        background: "#1E6DB5",
        color: "#fff",
        container: "#button-with-loading",
        scale: 0.45
      });
      this.$http.post(`branches/${thisIns.branchId}/evaluates`, this.evaluate)
        .then(() => {
          thisIns.$vs.notify({
            title: "Đã thêm mới thành công",
            text: "OK",
            iconPack: "feather",
            icon: "fa fa-lg fa-check-circle",
            color: "success"
          });
          thisIns.$emit('closePopupAdd', false);
          thisIns.callback();
          thisIns.initValues();
        })
        .catch((error) => {
          thisIns.checkResponRequest(error.response.data, null, null, 'Thêm mới đánh giá thất bại');
        })
        .finally(() => {
          this.$vs.loading.close("#button-with-loading > .con-vs-loading");
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

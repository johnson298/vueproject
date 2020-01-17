<template>
  <div>
    <div>
      <div class="vs-row">
        <div class="vs-col sm:w-1/2 w-full mb-5">
          <vs-input label="Tên thông báo" placeholder="Tên thông báo" class="w-full" v-model="newCaimpaign.title" />
        </div>
        <div class="vs-col sm:w-1/2 w-full mb-5">
          <label class="vs-input--label">Lên lịch</label>
          <flat-pickr v-model="newCaimpaign.schedule_at" placeholder="Chọn ngày" />
        </div>
      </div>
      <div class="vs-row">
        <div class="vs-col sm:w-1/2 w-full mb-5">
          <vs-select
            label="Đối tượng"
            v-model="newCaimpaign.focus_on"
            class="w-full"
            placeholder="Chọn đối tượng"
          >
            <vs-select-item value="1" text="Học viên" />
            <vs-select-item value="2" text="Giáo viên" />
          </vs-select>
        </div>
        <div class="vs-col sm:w-1/2 w-full mb-5">
          <label class="vs-input--label">Hình thức gửi</label>
          <div class="vs-row">
            <div class="vs-col sm:w-1/3 pl-0">
              <vs-checkbox vs-value="app" v-model="newCaimpaign.via">App</vs-checkbox>
            </div>
            <div class="vs-col sm:w-1/3 pl-0">
              <vs-checkbox vs-value="sms" v-model="newCaimpaign.via">SMS</vs-checkbox>
            </div>
            <div class="vs-col sm:w-1/3 pl-0">
              <vs-checkbox vs-value="email" v-model="newCaimpaign.via">Email</vs-checkbox>
            </div>
          </div>
        </div>
      </div>

      <div class="vs-row">
        <div class="vs-col sm:w-1/2 w-full mb-5">
          <div>
            <vs-select label="Phạm vi gửi" v-model="newCaimpaign.target_type" class="w-full"  @change="resetTargetId">
              <vs-select-item
                :key="item.value"
                :value="item.value"
                :text="item.text"
                v-for="item in target_type"
              />
            </vs-select>
          </div>
        </div>
        <div class="vs-col sm:w-1/2 w-full mb-5">
            <!-- chọn chi nhánh -->
            <div class="vs-component vs-con-input-label vs-input w-full vs-input-primary" v-show="newCaimpaign.target_type === 'App\\Entities\\Branch' ">
              <vx-search-ajax
                text="Chi nhánh "
                :link-api="`branches`"
                :change.sync="newCaimpaign.target_id"
                get-attribute="id"
              />
            </div>

            <!-- chọn lớp học -->
            <div class="vs-component vs-con-input-label vs-input w-full vs-input-primary" v-show="newCaimpaign.target_type === 'App\\Entities\\Course'">
              <vx-search-ajax
                text="Lớp học "
                :link-api="`branches/${branchId}/courses`"
                :change.sync="newCaimpaign.target_id"
                get-attribute="id"
              />
            </div>

            <!-- chọn học viên -->
            <div class="vs-component vs-con-input-label vs-input w-full vs-input-primary" v-show="newCaimpaign.target_type === 'App\\Entities\\Student'">
              <vx-search-ajax
                text="Học viên "
                :link-api="`students`"
                :change.sync="newCaimpaign.target_id"
                get-attribute="id"
              />
            </div>

          <!-- chọn giáo viên -->
          <div class="vs-component vs-con-input-label vs-input w-full vs-input-primary" v-show="newCaimpaign.target_type === 'App\\Entities\\User'">
              <vx-search-ajax
                text="Giáo viên "
                :link-api="`users`"
                :change.sync="newCaimpaign.target_id"
                get-attribute="id"
              />
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
            v-model="newCaimpaign.content"
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
      selectedTeacher: null,
      selectedCourses: null,
      selectedStudent: null,
      selectedBranch: null,
      branches: null,
      editor: ClassicEditor,
      editorData: "",
      editorConfig: {
        // The configuration of the rich-text editor.
      },
      language: "vi",
      languages: lang,
      disabled: "disabled",
      loading: false,
      campaign: {
        target_type: 2,
        position: null
      },
      target_type: this.$store.state.model.campaign.target_type,
      newCaimpaign: {
        title: null,
        content: null,
        focus_on: 2,
        schedule_at: null,
        target_type: "",
        target_id: null,
        via: [],
        status: 0
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
    resetTargetId(){
      this.newCaimpaign.target_id = null;
    },
    initValues(){
      this.newCaimpaign = {
        title: null,
        content: null,
        focus_on: 2,
        schedule_at: null,
        target_type: "",
        target_id: null,
        via: [],
        status: 0
      };
    },


    createCampaign() {
      this.$vs.loading({
        background: "#1E6DB5",
        color: "#fff",
        container: "#btn-loading",
        scale: 0.45
      });
      this.$http
        .post("campaigns", this.newCaimpaign)
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
          this.$emit('closePopupAdd', false);
        })
        .catch(error => {
          this.checkResponRequest(error.response.data, null, null, 'Thêm mới thất bại');
        })
        .finally(() => {
          this.$vs.loading.close("#btn-loading > .con-vs-loading");
        });
    },

  }
};
</script>

<style lang="scss" scoped>

.input.flatpickr-input {
  height: 38.3px !important;
}

input.flatpickr-input {
  width: 100%;
  border: 1px solid rgba(0, 0, 0, 0.2);
  padding: 0.7rem;
  font-size: 1rem;
  border-radius: 5px;
}

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

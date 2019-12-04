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
            <vs-select label="Phạm vi gửi" v-model="newCaimpaign.target_type" class="w-full">
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
            <div class="vs-component vs-con-input-label vs-input w-full vs-input-primary" v-if="newCaimpaign.target_type === 'App\\Entities\\Branch' ">
              <label class="vs-input--label">Chọn chi nhánh</label>
              <vue-simple-suggest
                v-model="selectedBranch"
                mode="select"
                ref="suggestComponentTeacher"
                placeholder="Search information..."
                value-attribute="id"
                display-attribute="name"
                :list="getBranch"
                :debounce="200"
                :filter-by-query="false"
                @select="onSuggestSelectBranch">

                <div class="g">
                  <input type="text" placeholder="Search information...">
                </div>
                <template slot="misc-item-above" slot-scope="{ suggestions, query }">
                  <div class="misc-item">
                    <span>You're searching for '{{ query }}'.</span>
                  </div>

                  <template v-if="suggestions.length > 0">
                    <div class="misc-item">
                      <span>{{ suggestions.length }} suggestions are shown...</span>
                    </div>
                    <hr>
                  </template>

                  <div class="misc-item" v-else-if="!loading">
                    <span>No results</span>
                  </div>
                </template>

                <div slot="suggestion-item" slot-scope="{ suggestion, query }">
                  <div class="text">
                    <span>{{ suggestion.code }} - {{ suggestion.name | truncate(30) }}</span>
                  </div>
                </div>

                <div class="misc-item" slot="misc-item-below" slot-scope="{ suggestions }" v-if="loading">
                  <span>Loading...</span>
                </div>
              </vue-simple-suggest>
            </div>

            <!-- chọn lớp học -->
            <div class="vs-component vs-con-input-label vs-input w-full vs-input-primary" v-if="newCaimpaign.target_type === 'App\\Entities\\Course'">
              <label class="vs-input--label">Chọn lớp học</label>
              <vue-simple-suggest
                v-model="selectedCourses"
                mode="select"
                ref="suggestComponentTeacher"
                placeholder="Search information..."
                value-attribute="id"
                display-attribute="name"
                :list="getCourses"
                :debounce="200"
                :filter-by-query="false"
                @select="onSuggestSelectCourses">

                <div class="g">
                  <input type="text" placeholder="Search information...">
                </div>
                <template slot="misc-item-above" slot-scope="{ suggestions, query }">
                  <div class="misc-item">
                    <span>You're searching for '{{ query }}'.</span>
                  </div>

                  <template v-if="suggestions.length > 0">
                    <div class="misc-item">
                      <span>{{ suggestions.length }} suggestions are shown...</span>
                    </div>
                    <hr>
                  </template>

                  <div class="misc-item" v-else-if="!loading">
                    <span>No results</span>
                  </div>
                </template>

                <div slot="suggestion-item" slot-scope="{ suggestion, query }">
                  <div class="text">
                    <span>{{ suggestion.code }} - {{ suggestion.name | truncate(30) }}</span>
                  </div>
                </div>

                <div class="misc-item" slot="misc-item-below" slot-scope="{ suggestions }" v-if="loading">
                  <span>Loading...</span>
                </div>
              </vue-simple-suggest>
            </div>

            <!-- chọn học viên -->
            <div class="vs-component vs-con-input-label vs-input w-full vs-input-primary" v-if="newCaimpaign.target_type === 'App\\Entities\\Student'">
              <label class="vs-input--label">Chọn học viên</label>
              <vue-simple-suggest
                v-model="selectedStudent"
                mode="select"
                ref="suggestComponentTeacher"
                placeholder="Search information..."
                value-attribute="id"
                display-attribute="name"
                :list="getStudent"
                :debounce="200"
                :filter-by-query="false"
                @select="onSuggestSelectStudent">

                <div class="g">
                  <input type="text" placeholder="Search information...">
                </div>
                <template slot="misc-item-above" slot-scope="{ suggestions, query }">
                  <div class="misc-item">
                    <span>You're searching for '{{ query }}'.</span>
                  </div>

                  <template v-if="suggestions.length > 0">
                    <div class="misc-item">
                      <span>{{ suggestions.length }} suggestions are shown...</span>
                    </div>
                    <hr>
                  </template>

                  <div class="misc-item" v-else-if="!loading">
                    <span>No results</span>
                  </div>
                </template>

                <div slot="suggestion-item" slot-scope="{ suggestion, query }">
                  <div class="text">
                    <span>{{ suggestion.code }} - {{ suggestion.name | truncate(30) }}</span>
                  </div>
                </div>

                <div class="misc-item" slot="misc-item-below" slot-scope="{ suggestions }" v-if="loading">
                  <span>Loading...</span>
                </div>
              </vue-simple-suggest>
            </div>

          <!-- chọn giáo viên -->
          <div class="vs-component vs-con-input-label vs-input w-full vs-input-primary" v-if="newCaimpaign.target_type === 'App\\Entities\\User'">
              <label class="vs-input--label">Chọn giáo viên</label>
              <vue-simple-suggest
                v-model="selectedTeacher"
                mode="select"
                ref="suggestComponentTeacher"
                placeholder="Search information..."
                value-attribute="id"
                display-attribute="name"
                :list="getTeachers"
                :debounce="200"
                :filter-by-query="false"
                @select="onSuggestSelectTeacher">

                <div class="g">
                  <input type="text" placeholder="Search information...">
                </div>
                <template slot="misc-item-above" slot-scope="{ suggestions, query }">
                  <div class="misc-item">
                    <span>You're searching for '{{ query }}'.</span>
                  </div>

                  <template v-if="suggestions.length > 0">
                    <div class="misc-item">
                      <span>{{ suggestions.length }} suggestions are shown...</span>
                    </div>
                    <hr>
                  </template>

                  <div class="misc-item" v-else-if="!loading">
                    <span>No results</span>
                  </div>
                </template>

                <div slot="suggestion-item" slot-scope="{ suggestion, query }">
                  <div class="text">
                    <span>{{ suggestion.code }} - {{ suggestion.name | truncate(30) }}</span>
                  </div>
                </div>

                <div class="misc-item" slot="misc-item-below" slot-scope="{ suggestions }" v-if="loading">
                  <span>Loading...</span>
                </div>
              </vue-simple-suggest>
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
        via: []
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
    initValues(){
      this.newCaimpaign = {
        title: null,
        content: null,
        focus_on: 2,
        schedule_at: null,
        target_type: "",
        target_id: null,
        via: []
      };
    },
    onSuggestSelectTeacher(suggest) {
      if (suggest) {
        this.newCaimpaign.target_id = suggest.id;
      }
    },
    getTeachers(search = ''){
      let vm = this;
      return new Promise((resolve, reject) => {
        this.$http.get(`users`, {
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


    onSuggestSelectCourses(suggest) {
      if (suggest) {
        this.newCaimpaign.target_id = suggest.id;
      }
    },
    getCourses(search = ''){
      let vm = this;
      return new Promise((resolve, reject) => {
        this.$http.get(`branches/${this.branchId}/courses`, {
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
        this.newCaimpaign.target_id = suggest.id;
      }
    },
    getStudent(search = ''){
      let vm = this;
      return new Promise((resolve, reject) => {
        this.$http.get(`students`, {
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

    onSuggestSelectBranch(suggest) {
      if (suggest) {
        this.newCaimpaign.target_id = suggest.id;
      }
    },
    getBranch(search = ''){
      let vm = this;
      return new Promise((resolve, reject) => {
        this.$http.get(`branches`, {
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

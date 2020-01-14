<template>
    <div class="vx-card__body w-full p-5" style="background: #ffffff ; display: inline-block; box-shadow: 2px 2px 2px #dddddd;">
        <form>
            <div>
                <div class="vs-row">
                    <div class="vs-col sm:w-1/6">
                        <vs-radio v-model="radios2" vs-value="1">Thêm thông báo</vs-radio>
                    </div>
                    <div class="vs-col sm:w-1/6">
                        <vs-radio v-model="radios2" vs-value="2">Thêm đánh giá</vs-radio>
                    </div>
                </div>
                <div class="vs-row ">
                    <div class="vs-col sm:w-1/2 mt-5 w-full mb-5">
                        <vs-input label="Mã chiến dich" placeholder="Mã ID" class="w-full" disabled/>
                    </div>
                    <div class="vs-col sm:w-1/2 mt-5 w-full mb-5">
                        <vs-input label="Tên chiến dich" placeholder="Tên chiến dịch" class=" w-full"/>
                    </div>
                </div>
                <div class="vs-row">
                    <div class="vs-col sm:w-1/2  w-full mb-5">
                        <vs-input label="Tiêu đề" class=" w-full" placeholder="Tiêu đề"/>
                    </div>
                    <div class="vs-col sm:w-1/2 w-full mb-5">
                        <label class="vs-input--label">Lên lịch</label>
                        <flat-pickr class="w-full picker-custom vs-inputx vs-input--input normal" style="border: 1px solid rgba(0, 0, 0, 0.2);" :config="configdateTimePicker" v-model="datetime" placeholder="Lên lịch" />
                    </div>
                </div>

                <div class="vs-row">
                    <div class="vs-col sm:w-1/2 w-full mb-5">
                        <vs-select  label="Chức vụ" v-model="campaign.position" class="w-full">
                            <vs-select-item :key="item.value" :value="item.value" :text="item.text" v-for="item in position" />
                        </vs-select>
                    </div>
                    <div class="vs-col sm:w-1/2 w-full mb-5">
                        <label class="vs-input--label">Hình thức gửi</label>
                        <div class="vs-row">
                            <div class="vs-col sm:w-1/3 pl-0">
                                <vs-checkbox>App</vs-checkbox>
                            </div>
                            <div v-if="radios2 === '1'" class="vs-col sm:w-1/3 pl-0">
                                <vs-checkbox>SMS</vs-checkbox>
                            </div>
                            <div v-if="radios2 === '1'" class="vs-col sm:w-1/3 pl-0">
                                <vs-checkbox>Email</vs-checkbox>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="vs-row">
                    <div class="vs-col sm:w-1/2 w-full mb-5">
                        <div>
                            <vs-select  label="Phạm vi gửi" v-model="campaign.range_send" class="w-full">
                                <vs-select-item :key="item.value" :value="item.value" :text="item.text" v-for="item in range_send" />
                            </vs-select>
                        </div>
                        <div v-if="campaign.range_send === 2">
                            <div class="vs-component vs-con-input-label vs-input mt-5 w-full vs-input-primary">
                                <label class="vs-input--label">Chi nhánh</label>
                                <vue-simple-suggest v-model="selectedBranch" mode="select" ref="suggestComponentBranches" placeholder="Search information..." value-attribute="id" display-attribute="name" :list="getBranches" :debounce="200" :filter-by-query="false" @select="onSuggestSelectBranch">
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
                                            <span>{{ suggestion.name | truncate(40) }}</span>
                                        </div>
                                    </div>

                                    <div class="misc-item" slot="misc-item-below" slot-scope="{ suggestions }" v-if="loading">
                                        <span>Loading...</span>
                                    </div>
                                </vue-simple-suggest>
                            </div>
                        </div>
                        <div v-if="campaign.range_send ===3">
                            <div class="vs-component vs-con-input-label vs-input mt-5 w-full vs-input-primary">
                                <label class="vs-input--label">Chương trình học</label>
                                <vue-simple-suggest v-model="selectedProgram" mode="select" ref="suggestComponentPrograms" placeholder="Search information..." value-attribute="id" display-attribute="name" :list="getPrograms" :debounce="200" :filter-by-query="false" @select="onSuggestSelectProgram">
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
                                            <span>{{ suggestion.name | truncate(40) }}</span>
                                        </div>
                                    </div>

                                    <div class="misc-item" slot="misc-item-below" slot-scope="{ suggestions }" v-if="loading">
                                        <span>Loading...</span>
                                    </div>
                                </vue-simple-suggest>
                            </div>
                        </div>
                        <div v-if="campaign.range_send ===4">
                            <div class="vs-component vs-con-input-label vs-input mt-5 w-full vs-input-primary">
                                <label class="vs-input--label">Lớp học</label>
                                <vue-simple-suggest v-model="selectedCourses" mode="select" ref="suggestComponentCourses" placeholder="Search information..." value-attribute="id" display-attribute="name" :list="getCourses" :debounce="200" :filter-by-query="false" @select="onSuggestSelectCourses">
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
                                            <span>{{ suggestion.name | truncate(40) }}</span>
                                        </div>
                                    </div>

                                    <div class="misc-item" slot="misc-item-below" slot-scope="{ suggestions }" v-if="loading">
                                        <span>Loading...</span>
                                    </div>
                                </vue-simple-suggest>
                            </div>
                        </div>
                    </div>
                    <div class="vs-col sm:w-1/2 w-full">
                        <div class="note"><label class="vs-input--label">Nghi chú</label></div>
                        <vs-textarea style="border: solid 1px #dddddd" placeholder="Mô tả ngắn..." name="note" type="text" class="w-full" :rows="4" />
                    </div>
                </div>
                <div class="vs-row mt-5 mb-5" v-if="radios2 === '1'">
                    <div class="vs-col w-full">
                        <div class=" note"><label class="vs-input--label">Nội dung</label></div>
                        <ckeditor :editor="editor" v-model="editorData" :config="editorConfig" class="w-full mt-5"></ckeditor>
                    </div>
                </div>
               <div v-if="radios2 != 1">
                   <div class="vs-row" v-for="(row, index) in questions" :key="index">
                       <div class="vs-col w-full mt-5">
                           <div>
                               <label class="vs-input--label"> Câu hỏi: {{index+1}}</label>
                           </div>
                           <div class="vs-row">
                               <div class="vs-col sm:w-5/6 pl-0">
                                   <vs-input placeholder="Câu hỏi ..." v-model="row.name" class="w-full"/>
                               </div>
                               <div class="vs-col sm:w-1/6 pl-0">
                                   <vs-button color="danger" class="ml-3" icon="delete_forever"  @click.prevent="deleteRow(index)"></vs-button>
                               </div>
                           </div>
                           <div class="vs-row" v-for="(answer, index) in row.answers" :key="index">
                               <div class="vs-col mt-5 w-full">
                                   <div class="vs-row">
                                       <label class="vs-input--label"> Câu trả lời: {{index+1}}</label>
                                   </div>
                                   <div class="vs-row">
                                       <div class="vs-col sm:w-1/10 pl-0 pr-0">
                                           <vs-checkbox  v-model="answer.check"></vs-checkbox>
                                       </div>
                                       <div class="vs-col sm:w-2/3 pl-0 pr-0">
                                           <vs-input placeholder="Câu trả lời..." v-model="answer.name" class=" w-full"/>
                                       </div>
                                       <div class="vs-col sm:w-1/10 ">
                                           <div class="vs-row">
                                               <div class="vs-col sm:w-1/2 pl-0">
                                                   <vs-button color="success"  @click.prevent="addAnswer(row)"><i class="feather icon-plus"></i></vs-button>
                                               </div>
                                               <div class="vs-col sm:w-1/2 pl-0">
                                                   <vs-button color="danger" class="ml-3" icon="delete_forever"  @click.prevent="deleteAnswer(row,index)"></vs-button>
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
                           <vs-button color="success"  @click.prevent="addRow">Thêm câu hỏi</vs-button>
                       </div>
                   </div>
               </div>
            </div>
        </form>
        <vs-col class="mt-5" vs-w='12' vs-type="flex" vs-justify="flex-end">
            <vs-button class="ml-3 vs-con-loading__container" type="filled" color="primary" @click="createCampaign" ref="addButton" id="btn-loading">Thêm</vs-button>
            <vs-button class="ml-3" type="filled" color="danger" @click="backPage">Trở về</vs-button>
        </vs-col>
    </div>

</template>

<script>
import vSelect from 'vue-select';
import Datepicker from 'vuejs-datepicker';
import * as lang from 'vuejs-datepicker/src/locale';
import 'video.js/dist/video-js.css';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import flatPickr from 'vue-flatpickr-component';
import '@/assets/css/flatpickr.css';


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
          'name': '',
          'answers': [
            {
              'name': '',
              'check': false,
            }
          ]
        }
      ],
      radios2:'1',
      datetime: null,
      configdateTimePicker: {
        enableTime: true,
        dateFormat: 'd-m-Y H:i'
      },
      date: null,
      editor: ClassicEditor,
      editorData : '',
      editorConfig: {
        // The configuration of the rich-text editor.
      },
      language: "vi",
      languages: lang,
      disabled: 'disabled',
      selectedBranch: null,
      loading: false,
      campaign: {
        birthday: '',
        range_send: 1,
        position :1
      },
      selectedProgram: null,
      selectedCourses: null,
      range_send: this.$store.state.model.campaign.range_send,
      position: this.$store.state.model.campaign.position,
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
    },
    branchId(){
      return this.$store.state.getBranchId;
    }
  },
  components: {
    'v-select': vSelect,
    Datepicker,
    flatPickr
  },
  methods: {
    backPage: function () {
      window.history.back();
    },
    addRow() {
      this.questions.push({'name': '',answers: [{'name': '','check': false}]});
    },
    addAnswer(row){
      row.answers.push({'name': '', check: false});
    },
    deleteRow: function(index) {
      this.questions.splice(index, 1);
    },
    deleteAnswer(row,index){
      if(index > 0){
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
    getCourses(search = '') {
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
    getBranches(search = '') {
      let vm = this;
      return new Promise((resolve, reject) => {
        this.$http.get('branches', {
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
    getPrograms(search = '') {
      let vm = this;
      return new Promise((resolve, reject) => {
        this.$http.get(`branches/${this.branchId}/programs`, {
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
    createCampaign() {
      this.$vs.loading({
        background: '#1E6DB5',
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
    .ck-editor__editable_inline{
        min-height: 200px !important;
    }
</style>

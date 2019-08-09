<template>
    <div>
       <div>
           <form>
               <div>
                   <div class="vx-row">
                       <div class="vx-col sm:w-1/4 w-full mb-2">
                           <div class="mt-5">
                               <label class="vs-input--label">Ngày bắt đầu</label>
                               <div class="columns">
                                   <div class="column w-full is-3">
                                       <datepicker placeholder="Ngày bắt đầu học" :options="dateOptions" v-model="date1"></datepicker>
                                   </div>
                               </div>
                           </div>
                       </div>
                       <div class="vx-col sm:w-1/4 w-full mb-2">
                           <vs-input label="Giờ bắt đầu" name="end_time" type="text" class="mt-5 w-full" v-validate="'required'" />
                       </div>
                       <div class="vx-col sm:w-1/4 w-full mb-2">
                           <vs-input label="Giờ kết thúc" name="end_time" type="text" class="mt-5 w-full" v-validate="'required'" />
                       </div>
                       <div class="vx-col sm:w-1/4 w-full mb-2">
                           <vs-input label="Phòng học" name="classroom" type="text" class="mt-5 w-full" v-validate="'required'" />
                       </div>
                   </div>

                   <div class="vs-component vs-con-input-label vs-input mt-5 w-full vs-input-primary">
                       <label class="vs-input--label">Giáo viên</label>
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

                   <div class="mt-5">
                       <vs-checkbox v-model="checkBox1">
                           <p v-if="checkBox1">Không lặp lại</p>
                           <p v-else>Lặp lại</p>
                       </vs-checkbox>
                   </div>
                   <div v-if="checkBox1" class="mt-5">
                     <div>
                         <div class="vx-row">
                             <div class="vx-col sm:w-1/6 w-full mb-2">
                                 <vs-checkbox v-model="checkBox2">Thứ 2</vs-checkbox>
                             </div>
                             <div class="vx-col sm:w-1/6 w-full mb-2">
                                 <vs-checkbox v-model="checkBox3">Thứ 3</vs-checkbox>
                             </div>
                             <div class="vx-col sm:w-1/6 w-full mb-2">
                                 <vs-checkbox v-model="checkBox4">Thứ 4</vs-checkbox>
                             </div>
                             <div class="vx-col sm:w-1/6 w-full mb-2">
                                 <vs-checkbox v-model="checkBox5">Thứ 5</vs-checkbox>
                             </div>
                             <div class="vx-col sm:w-1/6 w-full mb-2">
                                 <vs-checkbox v-model="checkBox6">Thứ 6</vs-checkbox>
                             </div>
                             <div class="vx-col sm:w-1/6 w-full mb-2">
                                 <vs-checkbox v-model="checkBox7">Thứ 7</vs-checkbox>
                             </div>
                             <div class="vx-col sm:w-1/6 w-full mb-2">
                                 <vs-checkbox v-model="checkBox8">Chủ nhật</vs-checkbox>
                             </div>

                         </div>
                         <div class="vx-row">
                             <div class="vx-col sm:w-1/2 w-full mb-2">
                                 <div class="mt-5">
                                     <label class="vs-input--label">Ngày kết thúc</label>
                                     <div class="columns">
                                         <div class="column w-full is-3">
                                             <datepicker placeholder="Ngày bắt kết thúc khóa học" :options="end_time" v-model="date2"></datepicker>
                                         </div>
                                     </div>
                                     {{date3}}
                                 </div>
                             </div>
                             <div class="vx-col sm:w-1/2 w-full mb-2">
                               <div class="mt-5">
                                   <label class="vs-input--label">Ngày nghỉ</label>
                                   <div class="columns">
                                       <div class="column is-5 w-full is-3">
                                           <datepicker placeholder="multiple" :options="{mode: 'multiple'}" v-model="date3"></datepicker>
                                       </div>
                                   </div>
                               </div>
                             </div>
                         </div>
                     </div>
                   </div>
               </div>
               <div class="p-6" style="text-align: right" slot="footer">
                   <vs-button class="mr-6 vs-con-loading__container" ref="addButton" id="button-with-loading">Thêm</vs-button>
                   <vs-button type="border" color="danger" @click.prevent="">Húy</vs-button>
               </div>
           </form>
       </div>
    </div>
</template>
<script>
import VuePerfectScrollbar from 'vue-perfect-scrollbar';
import Multiselect from 'vue-multiselect';
import vSelect from 'vue-select';

export default {
  data() {
    return {
      multiple : '',
      end_time : {},
      columns : '',
      dateOptions: {},
      date1 : '',
      date2 : '',
      date3 : '',
      range : [],
      multi: true,
      date: [],
      placeholder: String,
      val: String,
      class: String,
      checkBox1 : false,
      checkBox2: false,
      checkBox3 :false,
      checkBox4 :false,
      checkBox5 :false,
      checkBox6 :false,
      checkBox7 :false,
      checkBox8 :false,
      selectedTeacher: null,
      more_palanquin : false,
      options: [
        {
          libs: [
            { name: 'Thứ 2', value: '1' },
            { name: 'Thứ 3', value: '2' },
            { name: 'Thứ 4', value: '3' },
            { name: 'Thứ 5', value: '4' },
            { name: 'Thứ 6', value: '5' },
            { name: 'Thứ 7', value: '6' },
            { name: 'Chủ nhật', value: '7' },
          ]
        },
      ],
      value: [],
      selected : [],
      calenders: {
        status : 0,
        number_of_lessons : 0,
        lessons : 1,
        day : 'Thứ 2',
        user_id : null,
      },
      selectedBranch: null,
      lessons : this.$store.state.model.calendar.class,
      status : this.$store.state.model.calendar.status,
      day : this.$store.state.model.calendar.day,
      disabled: true,
      settings: { // perfectscrollbar settings
        maxScrollbarLength: 60,
        wheelSpeed: .60,
      },
      loading: false
    };
  },
  computed: {
    isSidebarActiveLocal: {
      get() {
        return this.isSidebarActive;
      },
      set(val) {
        if (!val) {
          this.$emit('closeSidebar');
          this.initValues();
        }
      }
    }
  },
  components: {
    VuePerfectScrollbar,
    'v-select': vSelect,
    Multiselect,
  },

  methods: {
    formatDate(parameters) {
      let date = parameters.date;
      return date.toLocaleDateString();
    },
    onSuggestSelectTeacher(suggest) {
      if (suggest) {
        this.calenders.user_id = suggest.id;
      }
    },
    getTeachers(search = ''){
      let vm = this;
      return new Promise((resolve, reject) => {
        this.$http.get(`courses/${this.$route.params.course}/users`, {
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
      this.courses = {
        name: '',
        program_id : null,
        branch_id : null,
        start_at : '',
        end_at : '',
        price : 0,
        status : 1,
        number_of_lessons : 0
      };
    },
    createCourse() {
      this.$vs.loading({
        background: 'primary',
        color: '#fff',
        container: '#button-with-loading',
        scale: 0.45
      });
      this.$http.post('courses', {
        name : this.courses.name,
        program_id : this.courses.program_id,
        branch_id : this.courses.branch_id,
        status : this.courses.status,
        start_at : this.courses.start_at,
        end_at : this.courses.end_at,
        price : this.courses.price,
        number_of_lessons : this.courses.number_of_lessons,
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
          this.isSidebarActiveLocal = false;
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
          this.$vs.loading.close('#button-with-loading > .con-vs-loading');
        });
    }
  },
  mounted(){
    this.getTeachers();
  }
};
</script>

<style lang="scss" scoped>
    .vs-popup{
        width: 1000px;
    }
</style>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style>
    .input.flatpickr-input{
        height: 38.3px !important;
    }
</style>

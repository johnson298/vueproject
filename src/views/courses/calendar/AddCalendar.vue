<template>
<div>
    <form>
        <div>
            <div class="vx-row">
                <div class="vx-col sm:w-1/2 w-full mb-2">
                    <vs-input label="Tên lịch học" v-model="newCalendars.title" class="w-full" placeholder="nhập tên lịch học..." />
                </div>
                <div class="vx-col sm:w-1/2 w-full mb-2">
                    <div class="vs-component vs-con-input-label vs-input w-full vs-input-primary">
                        <label class="vs-input--label">Giáo viên</label>
                        <vue-simple-suggest :multiple="true" v-model="selectedTeacher" mode="select" ref="suggestComponentTeacher" placeholder="tìm kiếm giáo viên..." value-attribute="id" display-attribute="name" :list="getTeachers" :debounce="200" :filter-by-query="false" @select="onSuggestSelectTeacher">
                            <div class="group-chip">
                                <div class="all-chip">
                                    <vs-chip @click="removeTeacher(item)" v-for="(item, index) in teachers" :key="index" closable class="m-0"> <span class="font-weight-600"> {{ item.name }} </span> </vs-chip>
                                </div>
                                <input type="text" placeholder="tìm kiếm giáo viên...">
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
                <div class="vx-col sm:w-1/2 w-full mb-2">
                    <div v-if="rooms.length!=0" key="check-room">
                        <vs-select v-model="newCalendars.room_id" label="Chọn phòng học" placeholder='Chọn phòng' class="w-full">
                            <vs-select-item :key="item.value" :value="item.id" :text="item.name" v-for="item in rooms" />
                        </vs-select>
                    </div>
                    <p v-else key="check-room" class="pt-8 text-danger">Chi nhánh này chưa có phòng học !</p>
                </div>
                <div class="vx-col sm:w-1/2 w-full mb-2">
                    <label class="vs-input--label">Ngày bắt đầu</label>
                    <div class="columns">
                        <div class="column w-full is-3">
                            <flat-pickr v-model="newCalendars.from_date" placeholder="chọn ngày bắt đầu" />
                        </div>
                    </div>
                </div>
                <div class="vx-col sm:w-1/2 w-full mb-2">
                    <div class="vs-component vs-con-input-label vs-input w-full vs-input-primary">
                        <label for="" class="vs-input--label">Giờ bắt đầu</label>
                        <flat-pickr :config="configTimePicker" v-model="newCalendars.start_at" placeholder="Chọn giờ bắt đầu" />
                    </div>
                </div>
                <div class="vx-col sm:w-1/2 w-full mb-2">
                    <div class="vs-component vs-con-input-label vs-input w-full vs-input-primary">
                        <label for="" class="vs-input--label">Giờ kết thúc</label>
                        <flat-pickr :config="configTimePicker" v-model="newCalendars.end_at" placeholder="Chọn giờ kết thúc" />
                    </div>
                </div>
            </div>

            <div class="mt-5 w-100">
                <vs-row>
                    <vs-col class="p-0" vs-w="3">
                        <vs-checkbox v-model="checkIsLoop">
                            <span v-if="checkIsLoop" key="loop-date">Không lặp lại</span>
                            <span v-else key="loop-date">Lặp lại</span>
                        </vs-checkbox>
                    </vs-col>
                </vs-row>
            </div>
            <div v-if="checkIsLoop" class="mt-5">
                <div>
                    <div class="vx-row">
                        <div class="vx-col sm:w-1/4 w-full mb-3">
                            <vs-checkbox v-model="newCalendars.monday" vs-value="1">Thứ 2</vs-checkbox>
                        </div>
                        <div class="vx-col sm:w-1/4 w-full mb-3">
                            <vs-checkbox v-model="newCalendars.tuesday" vs-value="1">Thứ 3</vs-checkbox>
                        </div>
                        <div class="vx-col sm:w-1/4 w-full mb-3">
                            <vs-checkbox v-model="newCalendars.wednesday" vs-value="1">Thứ 4</vs-checkbox>
                        </div>
                        <div class="vx-col sm:w-1/4 w-full mb-3">
                            <vs-checkbox v-model="newCalendars.thursday" vs-value="1">Thứ 5</vs-checkbox>
                        </div>
                        <div class="vx-col sm:w-1/4 w-full mb-3">
                            <vs-checkbox v-model="newCalendars.friday" vs-value="1">Thứ 6</vs-checkbox>
                        </div>
                        <div class="vx-col sm:w-1/4 w-full mb-3">
                            <vs-checkbox v-model="newCalendars.saturday" vs-value="1">Thứ 7</vs-checkbox>
                        </div>
                        <div class="vx-col sm:w-1/4 w-full mb-3">
                            <vs-checkbox v-model="newCalendars.sunday" vs-value="1">Chủ nhật</vs-checkbox>
                        </div>

                    </div>
                    <div class="vx-row">
                        <div class="vx-col sm:w-1/2 w-full mb-2">
                            <div class="mt-5">
                                <label class="vs-input--label">Ngày nghỉ</label>
                                <div class="columns">
                                    <div class="column w-full is-3">
                                        <flat-pickr v-model="newCalendars.except_date" :config='configMulti' placeholder="chọn ngày nghỉ" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="vx-col sm:w-1/2 w-full mb-2">
                            <div class="mt-5">
                                <label class="vs-input--label">Ngày kết thúc</label>
                                <div class="columns">
                                    <div class="column w-full is-3">
                                        <flat-pickr v-model="newCalendars.to_date" placeholder="chọn ngày kết thúc" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="mt-5">
                <div class="note"><label class="vs-input--label">Nhi chú</label></div>
                <vs-textarea style="border: solid 1px #dddddd" name="note" type="text" v-model="newCalendars.note" class="w-full" :rows="5" />
            </div>
        </div>
    </form>
    <div class="p-6" style="text-align: right" slot="footer">
        <vs-button class="mr-6 vs-con-loading__container" ref="addButton" id="button-with-loading" :disabled="(rooms.length!=0 && newCalendars.title) ? false : true" @click="createSchedule">Thêm</vs-button>
        <vs-button type="border" color="danger" @click.prevent="$emit('update:active',false);initData()">Hủy</vs-button>
    </div>
</div>
</template>

<script>
import flatPickr from 'vue-flatpickr-component';
import '@/assets/css/flatpickr.css';
import VuePerfectScrollbar from 'vue-perfect-scrollbar';
import vSelect from 'vue-select';

export default {
  props: {

    callback: {
      type: Function,
      required: true
    }
  },
  data() {
    return {
      teachers: [],
      newCalendars: {
        room_id: 0,
        title: '',
        start_at: null,
        end_at: null,
        from_date: null,
        to_date: null,
        is_loop: 0,
        except_date: '',
        monday: null,
        tuesday: null,
        wednesday: null,
        thursday: null,
        friday: null,
        saturday: null,
        sunday: null,
        joins: [],
        note: null,
      },
      configTimePicker: {
        enableTime: true,
        enableSeconds: true,
        noCalendar: true
      },
      configMulti: {
        altFormat: "F j, Y",
        altInput: false,
        inline: false,
        enableTime: false,
        mode: "multiple",
      },
      selectedTeacher: null,
      rooms: [],
      loading: false,
      branch_id: this.$store.state.getBranchId,
      course_id: this.$route.params.course,
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
    },
    checkIsLoop: {
      get() {
        return this.newCalendars.is_loop;
      },
      set() {
        this.newCalendars.is_loop = this.newCalendars.is_loop == 0 ? 1 : 0;
      }
    },
  },
  components: {
    VuePerfectScrollbar,
    'v-select': vSelect,
    flatPickr
  },
  methods: {
    initData() {
      this.newCalendars = {
        room_id: null,
        title: '',
        start_at: null,
        end_at: null,
        from_date: null,
        to_date: null,
        is_loop: 0,
        except_date: [],
        monday: null,
        tuesday: null,
        wednesday: null,
        thursday: null,
        friday: null,
        saturday: null,
        sunday: null,
        joins: [],
        note: null,
      };
    },
    onSuggestSelectTeacher(suggest) {
      if (suggest) {
        if(!this.newCalendars.joins.includes(suggest.id)){
          this.newCalendars.joins.push(suggest.id);
          this.teachers.push({
            id: suggest.id,
            name: suggest.name
          });
        }
      }
    },
    getTeachers(search = '') {
      let vm = this;
      return new Promise((resolve, reject) => {
        this.$http.get(`branches/${this.branch_id}/courses/${this.course_id}/users`, {
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
    getRooms() {
      let vm = this;
      this.$http.get(`branches/${this.branch_id}/rooms`).then(function (response) {
        vm.rooms = response.data.data;
      }).catch(() => {
        this.$vs.notify({
          title: 'Error!',
          text: 'Có lỗi xảy ra',
          iconPack: 'feather',
          icon: 'fa fa-lg fa-exclamation-triangle',
          color: 'danger'
        });
      });
    },
    createSchedule() {
      this.$vs.loading({
        background: '#1E6DB5',
        color: '#fff',
        container: '#button-with-loading',
        scale: 0.45
      });
      this.$http.post(`branches/${this.branch_id}/courses/${this.course_id}/schedules`, {
        room_id: this.newCalendars.room_id,
        title: this.newCalendars.title,
        start_at: this.newCalendars.start_at,
        end_at: this.newCalendars.end_at,
        from_date: this.newCalendars.from_date,
        to_date: this.newCalendars.to_date || this.newCalendars.from_date,
        is_loop: this.newCalendars.is_loop,
        except_date: this.newCalendars.except_date.length ? this.newCalendars.except_date.split(', ') : [],
        monday: this.newCalendars.monday,
        tuesday: this.newCalendars.tuesday,
        wednesday: this.newCalendars.wednesday,
        thursday: this.newCalendars.thursday,
        friday: this.newCalendars.friday,
        saturday: this.newCalendars.saturday,
        sunday: this.newCalendars.sunday,
        joins: this.newCalendars.joins,
        note: this.newCalendars.note
      })
        .then(() => {
          this.$vs.notify({
            title: 'Đã thêm mới thành công',
            text: 'OK',
            iconPack: 'feather',
            icon: 'fa fa-lg fa-check-circle',
            color: 'success'
          });
          this.initData();
          this.callback();
          this.$emit('closeAdd',false);
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
    },
    removeTeacher(item) {
      event.preventDefault();
      this.teachers.splice(this.teachers.indexOf(item), 1);
      this.newCalendars.joins.splice(this.newCalendars.joins.indexOf(item), 1);
    }
  },
  created() {
    this.getRooms();
  },
  mounted() {
    this.getTeachers();
  }
};
</script>

<style lang="scss" scoped>
.vs-popup {
    width: 1000px;
}

.input.flatpickr-input {
    height: 38.3px !important;
}

input.flatpickr-input {
    width: 100%;
    border: 1px solid rgba(0, 0, 0, 0.2);
    padding: .7rem;
    font-size: 1rem;
    border-radius: 5px;
}

.group-chip{
  position: relative;

  .all-chip{
    position: absolute;
    z-index: 1;
    right: 3px;
    top: 50%;
    transform: translateY(-50%);

    .con-vs-chip{
      zoom: 0.85;
    }
  }
}
</style>

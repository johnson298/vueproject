<template>
    <vs-sidebar click-not-close position-right parent="body" default-index="1" color="primary" class="add-new-data-sidebar items-no-padding" spacer v-model="isSidebarActiveLocal">
        <div class="mt-6 flex items-center justify-between px-6">
            <h4>Chỉnh sửa lớp học</h4>
            <feather-icon icon="XIcon" @click.stop="isSidebarActiveLocal = false" class="cursor-pointer"></feather-icon>
        </div>
        <vs-divider class="mb-0"></vs-divider>

        <VuePerfectScrollbar class="scroll-area--data-list-add-new pt-4 pb-6" :settings="settings">
            <div class="p-6">
                <form>
                    <div>
                        <h4 class="text-center uppercase">Thông tin lớp học</h4>
                        <!--Ten chương trình-->
                        <div>
                            <vs-input label="Tên lớp học" name="name" type="text" v-model="coursesGetInfo.name" class="mt-5 w-full" />
                        </div>
                        <!--học phí-->
                        <div>
                            <vs-input label="Học phí" name="price" type="text" v-model="coursesGetInfo.price" class="mt-5 w-full" />
                        </div>
                        <!-- ngày bắt đầu học -->
                        <div class="mt-5">
                            <label for="" class="vs-input--label">Ngày bắt đầu</label>
                            <datepicker :fullMonthName="true" v-model="formatDateStartAt" :language="languages[language]" format="d MMMM yyyy" :value="courses.start_at" class="w-full picker-custom" placeholder="chọn ngày bắt đầu"></datepicker>
                        </div>
                        <!--Ngày kết thúc-->
                        <div class="mt-5">
                            <label for="" class="vs-input--label">Ngày kết thúc</label>
                            <datepicker :fullMonthName="true" v-model="formatDateEndAt" :language="languages[language]" format="d MMMM yyyy" :value="courses.end_at" class="w-full picker-custom" placeholder="chọn ngày kết thúc"></datepicker>
                        </div>
                        <!--trạng thái-->
                        <vs-select v-model="coursesGetInfo.status" label="Trạng thái" class="mt-5 w-full">
                            <vs-select-item :key="item.value" :value="item.value" :text="item.text" v-for="item in status" />
                        </vs-select>
                        <!--chương chình học-->
                        <div>
                            <div class="vs-component vs-con-input-label vs-input mt-5 w-full vs-input-primary">
                                <label class="vs-input--label">Chương trình học</label>
                                <vue-simple-suggest
                                        v-model="selectedProgram"
                                        mode="select"
                                        ref="suggestComponentPrograms"
                                        placeholder="Search information..."
                                        value-attribute="id"
                                        display-attribute="name"
                                        :list="getPrograms"
                                        :debounce="200"
                                        :filter-by-query="false"
                                        @select="onSuggestSelectProgram">
                                    <div class="g">
                                        <input type="text" :value="coursesGetInfo.program.name" placeholder="Search information...">
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
                        <!--chin nhánh-->
                        <div v-if="coursesGetInfo.id">
                            <div class="vs-component vs-con-input-label vs-input mt-5 w-full vs-input-primary">
                                <label class="vs-input--label">Chi nhánh</label>
                                <vue-simple-suggest v-model="selectedBranch"
                                                    mode="select"
                                                    ref="suggestComponentBranches"
                                                    placeholder="Search information..."
                                                    value-attribute="id"
                                                    display-attribute="name"
                                                    :list="getBranches"
                                                    :debounce="200"
                                                    :filter-by-query="false"
                                                    @select="onSuggestSelectBranch">
                                    <div class="g">
                                        <input type="text" :value="coursesGetInfo.branch.name" placeholder="Search information...">
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
                        <div>
                            <vs-input label="Thời lượng " name="number_of_lessons" v-model="coursesGetInfo.number_of_lessons" type="number" class="mt-5 w-full" />
                        </div>
                    </div>
                </form>
            </div>
        </VuePerfectScrollbar>

        <div class="flex flex-wrap items-center justify-center p-6" slot="footer">
            <vs-button class="mr-6 vs-con-loading__container" :disabled="errors.any()" id="button-with-loading" @click="updateCourse(coursesGetInfo)">Cập nhật</vs-button>
            <vs-button type="border" color="danger" @click="isSidebarActiveLocal = false">Hủy</vs-button>
        </div>
    </vs-sidebar>
</template>

<script>
import Datepicker from 'vuejs-datepicker';
import * as lang from 'vuejs-datepicker/src/locale';
import VuePerfectScrollbar from 'vue-perfect-scrollbar';

export default {
  props: {
    isSidebarEditActive: {
      type: Boolean,
      required: true
    },
    getData: {
      type: Function,
      required: true
    },
    coursesGetInfo: {
      required: false
    }
  },
  created (){
    this.onSuggestSelectProgram();
  },
  methods: {
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
    getBranches(search = ''){
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
    updateCourse(course) {
      this.$vs.loading({
        background: '#1E6DB5',
        color: '#fff',
        container: '#button-with-loading',
        scale: 0.45
      });
      this.$http.put(`branches/${this.branchId}/courses/${course.id}`, {
        name: course.name,
        price : course.price,
        start_at : course.start_at,
        status : course.status,
        end_at : course.end_at,
        program_id : this.courses.program_id || this.coursesGetInfo.program_id,
        branch_id : this.courses.branch_id || this.coursesGetInfo.branch_id,
        number_of_lessons : course.number_of_lessons
      }, {
      })
        .then(() => {
          this.isSidebarActiveLocal = false;
          this.$vs.notify({
            title: 'Đã sửa thành công',
            text: 'OK',
            iconPack: 'feather',
            icon: 'fa fa-lg fa-check-circle',
            color: 'success'
          });
          this.getData();
        })
        .catch((error) => {

          if (error.response.data.error.hasOwnProperty('validation')) {
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
              text: 'Sửa thất bại',
              iconPack: 'feather',
              icon: 'fa fa-lg fa-exclamation-triangle',
              color: 'danger'
            });
          }
        }).finally(() => {
          this.$vs.loading.close('#button-with-loading > .con-vs-loading');
        });
    },
  },
  mounted(){
    this.getPrograms();
    this.getBranches();
  },
  data() {
    return {
      language: "vi",
      languages: lang,
      disabled: true,
      settings: { // perfectscrollbar settings
        maxScrollbarLength: 60,
        wheelSpeed: .60,
      },
      status: this.$store.state.model.courses.status,
      selectedProgram : null,
      selectedBranch : null,
      loading: false,
      courses : {
        program_id : null,
        branch_id :null,
      }
    };
  },
  computed: {
    isSidebarActiveLocal: {
      get() {
        return this.isSidebarEditActive;
      },
      set(val) {
        if (!val) {
          this.$emit('closeSidebar');
        }
      }
    },
    formatDateStartAt: {
      get() {
        return this.coursesGetInfo.start_at;
      },
      set(val) {
        this.coursesGetInfo.start_at = this.formatDateUTC(val);
      }
    },
    formatDateEndAt: {
      get() {
        return this.coursesGetInfo.end_at;
      },
      set(val) {
        this.coursesGetInfo.end_at = this.formatDateUTC(val);
      }
    },
    branchId(){
      return this.$store.state.getBranchId;
    }
  },
  components: {
    VuePerfectScrollbar,
    Datepicker
  },
};
</script>

<style lang="scss" scoped>
    .add-new-data-sidebar {
        /deep/ .vs-sidebar--background {
            z-index: 52010;
        }

        /deep/ .vs-sidebar {
            z-index: 52010;
            width: 400px;
            max-width: 90vw;

            .img-upload {
                margin-top: 2rem;

                .con-img-upload {
                    padding: 0;
                }

                .con-input-upload {
                    width: 100%;
                    margin: 0;
                }
            }
        }
    }

    .scroll-area--data-list-add-new {
        height: calc(100% - 4.3rem);
    }
</style>

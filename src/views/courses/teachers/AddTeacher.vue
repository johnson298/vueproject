<template>
    <vs-sidebar click-not-close position-right parent="body" default-index="1" color="primary" class="add-new-data-sidebar items-no-padding" spacer v-model="isSidebarActiveLocal">
        <div class="mt-6 flex items-center justify-between px-6">
            <h4>Thêm Giáo viên</h4>
            <feather-icon icon="XIcon" @click.stop="isSidebarActiveLocal = false" class="cursor-pointer"></feather-icon>
        </div>
        <vs-divider class="mb-0"></vs-divider>

        <VuePerfectScrollbar class="scroll-area--data-list-add-new pt-4 pb-6" :settings="settings">

            <div class="p-6">
                <form>
                    <div>
                      <div>
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
                      </div>
                        <!--giá khóa học  -->
                        <vs-select v-model="teacher.role" label="Vai trò " class="mt-5 w-full">
                            <vs-select-item :key="item.value" :value="item.value" :text="item.text" v-for="item in role" />
                        </vs-select>
                        <div>
                            <div class="note mt-5"><label class="vs-input--label">Note</label></div>
                            <vs-textarea style="border: solid 1px #dddddd" name="note" type="text" v-model="teacher.note" class="w-full" :rows="5" />
                        </div>
                    </div>
                </form>
            </div>
        </VuePerfectScrollbar>

        <div class="flex flex-wrap items-center justify-center p-6" slot="footer">
            <vs-button class="mr-6 vs-con-loading__container" @click="addTeacher" :disabled="errors.any()" ref="addButton" id="button-with-loading">Thêm</vs-button>
            <vs-button type="border" color="danger" @click="isSidebarActiveLocal = false">Trở lại</vs-button>
        </div>
    </vs-sidebar>
</template>

<script>
import VuePerfectScrollbar from 'vue-perfect-scrollbar';

export default {
  props: {
    isSidebarActive: {
      type: Boolean,
      required: true
    },
    callback: {
      type: Function,
      required: true
    }
  },
  data() {
    return {
      branch_id: this.$store.state.getBranchId,
      course_id: this.$route.params.course,
      loading: false,
      selectedTeacher: null,
      teacher: {
        user_id : null,
        role : 1,
        note : ''
      },
      teachers: [],
      role : this.$store.state.model.teachers.role,
      disabled: true,
      settings: { // perfectscrollbar settings
        maxScrollbarLength: 60,
        wheelSpeed: .60,
      },
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
  },

  methods: {
    onSuggestSelectTeacher(suggest) {
      if (suggest) {
        this.teacher.user_id = suggest.id;
      }
    },
    getTeachers(search = ''){
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
    initValues() {
      this.teacher = {
        user_id : '',
        role : 1,
        note : ''
      };
      this.selectedTeacher = null;
    },
    addTeacher() {
      this.$vs.loading({
        background: '#1E6DB5',
        color: '#fff',
        container: '#button-with-loading',
        scale: 0.45
      });
      this.$http.post(`branches/${this.branch_id}/courses/${this.course_id}/teachers` , {
        user_id : this.teacher.user_id,
        role : this.teacher.role,
        note : this.teacher.note,
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

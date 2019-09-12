<template>
    <vs-sidebar click-not-close position-right parent="body" default-index="1" color="primary" class="add-new-data-sidebar items-no-padding" spacer v-model="isSidebarActiveLocal">
        <div class="mt-6 flex items-center justify-between px-6">
            <h4>Chỉnh sửa thông tin giảng viên</h4>
            <feather-icon icon="XIcon" @click.stop="isSidebarActiveLocal = false" class="cursor-pointer"></feather-icon>
        </div>
        <vs-divider class="mb-0"></vs-divider>

        <VuePerfectScrollbar class="scroll-area--data-list-add-new pt-4 pb-6" :settings="settings">
            <div class="p-6">
                <form>
                    <div>
                        <h4 class="text-center uppercase">Thông tin giảng viên</h4>

                        <div>
                            <vs-input label="Giáo viên" :value="teacherGetInfo.user.name" disabled class="mt-5 w-full" />
                        </div>
                        <vs-select v-model="teacherGetInfo.role" label="Vai trò" class="mt-5 w-full">
                            <vs-select-item :key="item.value" :value="item.value" :text="item.text" v-for="item in role" />
                        </vs-select>
                        <div>
                            <div class="note mt-5"><label class="vs-input--label">Note</label></div>
                            <vs-textarea style="border: solid 1px #dddddd" name="note" type="text" v-model="teacherGetInfo.note" class="w-full" :rows="5" />
                        </div>
                    </div>
                </form>
            </div>
        </VuePerfectScrollbar>

        <div class="flex flex-wrap items-center justify-center p-6" slot="footer">
            <vs-button class="mr-6 vs-con-loading__container" :disabled="errors.any()" id="button-with-loading" @click="updateTeacher(teacherGetInfo)">Chỉnh sửa</vs-button>
            <vs-button type="border" color="danger" @click="isSidebarActiveLocal = false">Hủy</vs-button>
        </div>
    </vs-sidebar>
</template>

<script>
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
    teacherGetInfo: {
      required: false
    }
  },
  data() {
    return {
      disabled: true,
      settings: { // perfectscrollbar settings
        maxScrollbarLength: 60,
        wheelSpeed: .60,
      },
      role : this.$store.state.model.teachers.role,
      branch_id: this.$store.state.getBranchId,
      course_id: this.$route.params.course,
    };
  },
  methods: {
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
    updateTeacher(teacher) {
      this.$vs.loading({
        background: '#1E6DB5',
        color: '#fff',
        container: '#button-with-loading',
        scale: 0.45
      });
      this.$http.put(`branches/${this.branch_id}/courses/${this.course_id}/teachers/${teacher.id}`, {
        user_id: teacher.user_id,
        role : teacher.role,
        note : teacher.note
      }, {
      })
        .then(() => {
          this.isSidebarActiveLocal = false;
          this.getData();
          this.$vs.notify({
            title: 'Đã sửa thành công',
            text: 'OK',
            iconPack: 'feather',
            icon: 'fa fa-lg fa-check-circle',
            color: 'success'
          });
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
    this.getTeachers();
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
    }
  },
  components: {
    VuePerfectScrollbar,
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
        input[disabled=disabled] {
            background: #e6e6e6 !important;
        }
    }

    .scroll-area--data-list-add-new {
        height: calc(100% - 4.3rem);
    }
</style>

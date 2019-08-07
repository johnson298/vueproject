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
                        <vs-select v-model="teacher.user_id" label="Tên giáo viên" class="mt-5 w-full">
                            <vs-select-item
                                    :key="item.id"
                                    :value="item.id"
                                    :text="item.name"
                                    v-for="item in teachers"
                            />
                        </vs-select>
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
    getTeachers(){
      this.$http.get('users')
        .then(function (response) {
          this.teachers=response.data.data;
        }.bind(this));
    },
    initValues() {
      this.teacher = {
        user_id : null,
        role : 1,
        note : ''
      };
    },
    addTeacher() {
      this.$vs.loading({
        background: 'primary',
        color: '#fff',
        container: '#button-with-loading',
        scale: 0.45
      });
      this.$http.post('courses/' + this.$route.params.course + '/teachers' , {
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

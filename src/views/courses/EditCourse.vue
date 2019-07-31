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
                            <vs-input label="Tên chương trình" name="name" type="text" v-model="coursesGetInfo.name" class="mt-5 w-full" />
                        </div>
                        <!--học phí-->
                        <div>
                            <vs-input label="Học phí" name="price" type="text" v-model="coursesGetInfo.price" class="mt-5 w-full" />
                        </div>
                        <div>
                            <vs-input label="Ngày bắt đầu " name="start_at" v-model="coursesGetInfo.start_at" type="date" class="mt-5 w-full"  />
                        </div>
                        <!--Ngày kết thúc-->
                        <div>
                            <vs-input label="Ngày kết thúc " name="end_at" v-model="coursesGetInfo.end_at" type="date" class="mt-5 w-full" />
                        </div>
                        <!--trạng thái-->
                        <vs-select v-model="coursesGetInfo.status" label="Trạng thái" class="mt-5 w-full">
                            <vs-select-item :key="item.value" :value="item.value" :text="item.text" v-for="item in status" />
                        </vs-select>
                        <!--chương chình học-->
                        <vs-select v-model="coursesGetInfo.program_id" label="Chương trình học" class="mt-5 w-full">
                            <vs-select-item
                                    :key="item.id"
                                    :value="item.id"
                                    :text="item.name"
                                    v-for="item in programs"
                            />
                        </vs-select>
                        <!--chin nhánh-->
                        <vs-select v-model="coursesGetInfo.branch_id" label="Chi nhánh" class="mt-5 w-full">
                            <vs-select-item
                                    :key="item.id"
                                    :value="item.id"
                                    :text="item.name"
                                    v-for="item in branches"
                            />
                        </vs-select>

                        <div>
                            <vs-input label="Thời lượng " name="number_of_lessons" v-model="coursesGetInfo.number_of_lessons" type="number" class="mt-5 w-full" />
                        </div>
                    </div>
                </form>
            </div>
        </VuePerfectScrollbar>

        <div class="flex flex-wrap items-center justify-center p-6" slot="footer">
            <vs-button class="mr-6 vs-con-loading__container" :disabled="errors.any()" id="button-with-loading" @click="updateCourse(coursesGetInfo)">Chỉnh sửa</vs-button>
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
    coursesGetInfo: {
      required: false
    }
  },
  methods: {
    getPrograms(){
      this.$http.get('/programs')
        .then(function (response) {
          this.programs=response.data.data;
        }.bind(this))
        .catch(function () {

        });
    },
    getBranches(){
      this.$http.get('branches')
        .then(function (response) {
          this.branches=response.data.data;
        }.bind(this))
        .catch(function () {

        });
    },
    updateCourse(course) {
      this.$vs.loading({
        background: 'primary',
        color: '#fff',
        container: '#button-with-loading',
        scale: 0.45
      });
      this.$http.put('courses/' + course.id, {
        name: course.name,
        price : course.price,
        start_at : course.start_at,
        status : course.status,
        end_at : course.end_at,
        program_id : course.program_id,
        branch_id : course.branch_id,
        number_of_lessons : course.number_of_lessons
      }, {
      })
        .then(() => {
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
    this.getPrograms();
    this.getBranches();
  },
  data() {
    return {
      disabled: true,
      settings: { // perfectscrollbar settings
        maxScrollbarLength: 60,
        wheelSpeed: .60,
      },
      status: this.$store.state.model.courses.status,
      programs: [],
      branches : [],
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
    }

    .scroll-area--data-list-add-new {
        height: calc(100% - 4.3rem);
    }
</style>

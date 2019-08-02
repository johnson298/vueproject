<template>
    <vs-sidebar click-not-close position-right parent="body" default-index="1" color="primary" class="add-new-data-sidebar items-no-padding" spacer v-model="isSidebarActiveLocal">
        <div class="mt-6 flex items-center justify-between px-6">
            <h4>Thêm Lớp học </h4>
            <feather-icon icon="XIcon" @click.stop="isSidebarActiveLocal = false" class="cursor-pointer"></feather-icon>
        </div>
        <vs-divider class="mb-0"></vs-divider>

        <VuePerfectScrollbar class="scroll-area--data-list-add-new pt-4 pb-6" :settings="settings">

            <div class="p-6">
                <form>
                    <div>
                        <h4 class="text-center uppercase">Thông tin lớp học</h4>
                        <!--tên chi nhánh-->
                        <div>
                            <vs-input label="Tên lớp học" name="name" v-model="courses.name" class="mt-5 w-full" v-validate="'required|max:255'" />
                        </div>
                        <!--giá khóa học  -->
                        <div>
                            <vs-input label="Học phí" name="price" v-model="courses.price" type="number" class="mt-5 w-full" v-validate="'required'" />
                        </div>
                        <!-- ngày bắt đầu học -->
                        <div>
                            <vs-input label="Ngày bắt đầu " name="start_at" v-model="courses.start_at" type="date" class="mt-5 w-full"  />
                        </div>
                        <!--Ngày kết thúc-->
                        <div>
                            <vs-input label="Ngày kết thúc " name="end_at" v-model="courses.end_at" type="date" class="mt-5 w-full" />
                        </div>
                        <!--trạng thái-->
                        <vs-select v-model="courses.status" label="Trạng thái" class="mt-5 w-full">
                            <vs-select-item :key="item.value" :value="item.value" :text="item.text" v-for="item in status" />
                        </vs-select>
                        <!--chương trình học-->
                        <vs-select v-model="courses.program_id" label="Chương trình học" class="mt-5 w-full">
                            <vs-select-item
                                    :key="item.id"
                                    :value="item.id"
                                    :text="item.name"
                                    v-for="item in programs"
                            />
                        </vs-select>
                        <!--chin nhánh-->
                        <vs-select v-model="courses.branch_id" label="Chi nhánh" class="mt-5 w-full">
                            <vs-select-item
                                    :key="item.id"
                                    :value="item.id"
                                    :text="item.name"
                                    v-for="item in branches"
                            />
                        </vs-select>

                        <div>
                            <vs-input label="Thời lượng" name="price" v-model="courses.number_of_lessons" type="number" class="mt-5 w-full" v-validate="'required'" />
                        </div>
                    </div>
                </form>
            </div>
        </VuePerfectScrollbar>

        <div class="flex flex-wrap items-center justify-center p-6" slot="footer">
            <vs-button class="mr-6 vs-con-loading__container" @click="createCourse" :disabled="errors.any()" ref="addButton" id="button-with-loading">Thêm</vs-button>
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
      courses: {
        name: '',
        program_id : null,
        branch_id : null,
        start_at : '',
        end_at : '',
        price : 0,
        status : 1,
        number_of_lessons : 0
      },
      programs: [],
      branches : [],
      status : this.$store.state.model.courses.status,
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
    getPrograms(){
      this.$http.get('programs')
        .then(function (response) {
          this.programs=response.data.data;
        }.bind(this));
    },
    getBranches(){
      this.$http.get('branches')
        .then(function (response) {
          this.branches=response.data.data;
        }.bind(this));
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
    this.getPrograms();
    this.getBranches();
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

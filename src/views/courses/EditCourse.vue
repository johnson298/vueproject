<template>
    <vs-sidebar click-not-close position-right parent="body" default-index="1" color="primary" class="add-new-data-sidebar items-no-padding" spacer v-model="isSidebarActiveLocal">
        <div class="mt-6 flex items-center justify-between px-6">
            <h4>Chỉnh sửa lớp học</h4>
            <feather-icon icon="XIcon" @click.stop="isSidebarActiveLocal = false" class="cursor-pointer"></feather-icon>
        </div>
        <vs-divider class="mb-0"></vs-divider>

        <VuePerfectScrollbar class="scroll-area--data-list-add-new pt-4 pb-6" :settings="settings">
            <div class="p-6">
              <h4 class="text-center uppercase">Thông tin lớp học</h4>
              <!--Ten chương trình-->
                  <vs-input label="Tên lớp học" name="name" type="text" v-model="coursesGetInfo.name" class="mb-5 w-full" />
              <!--học phí-->
                  <vs-input label="Học phí" name="price" type="text" v-model="coursesGetInfo.price" class="mb-5 w-full" />
              <!-- ngày bắt đầu học -->
                  <label class="vs-input--label mt-5">Ngày bắt đầu</label>
                  <datepicker :fullMonthName="true" v-model="formatDateStartAt" :language="languages[language]" format="d MMMM yyyy" :value="courses.start_at" class="w-full picker-custom mb-5" placeholder="chọn ngày bắt đầu"></datepicker>
              <!--Ngày kết thúc-->
                  <label class="vs-input--label mt-5">Ngày kết thúc</label>
                  <datepicker :fullMonthName="true" v-model="formatDateEndAt" :language="languages[language]" format="d MMMM yyyy" :value="courses.end_at" class="w-full picker-custom mb-5" placeholder="chọn ngày kết thúc"></datepicker>
              <!--trạng thái-->
              <vs-select v-model="coursesGetInfo.status" label="Trạng thái" class="mt-5 w-full">
                  <vs-select-item :key="item.value" :value="item.value" :text="item.text" v-for="item in status" />
              </vs-select>
              <!--chương chình học-->

              <vx-search-ajax
                class="mt-5"
                text="Chương trình học "
                :link-api="`branches/${branchId}/programs`"
                :change.sync="courses.program_id"
                get-attribute="id"
                :data="coursesGetInfo.program" />
              <vs-input label="Thời lượng " name="number_of_lessons" v-model="coursesGetInfo.number_of_lessons" type="number" class="mt-5 w-full" />
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
      loading: false,
      courses : {
        program_id : null,
        branch_id :null,
      }
    };
  },
  methods: {
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
          let thisIns = this;
          thisIns.checkResponRequest(error.response.data, null, () => {
            thisIns.$vs.notify({
              title: "Error!",
              text: "Chỉnh sửa thất bại",
              iconPack: "feather",
              icon: "fa fa-lg fa-exclamation-triangle",
              color: "danger"
            });
          });
        }).finally(() => {
          this.$vs.loading.close('#button-with-loading > .con-vs-loading');
        });
    },
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

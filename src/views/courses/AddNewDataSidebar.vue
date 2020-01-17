<template>
  <vs-sidebar
    click-not-close
    position-right
    parent="body"
    default-index="1"
    color="primary"
    class="add-new-data-sidebar items-no-padding"
    spacer
    v-model="isSidebarActiveLocal"
  >
    <div class="mt-6 flex items-center justify-between px-6">
      <h4>Thêm Lớp học</h4>
      <feather-icon icon="XIcon" @click.stop="isSidebarActiveLocal = false" class="cursor-pointer"></feather-icon>
    </div>
    <vs-divider class="mb-0"></vs-divider>

    <VuePerfectScrollbar class="scroll-area--data-list-add-new pt-4 pb-6" :settings="settings">
      <div class="p-6">
        <h4 class="text-center uppercase">Thông tin lớp học</h4>
        <!--tên chi nhánh-->
          <vs-input
            label="Tên lớp học *"
            name="name"
            v-model="courses.name"
            class="mb-5 w-full"
            v-validate="'required|max:255'"
            placeholder="nhập tên lớp học"
          />
        <!--giá khóa học  -->
          <vs-input
            label="Học phí *"
            name="price"
            v-model="courses.price"
            type="number"
            class="mb-5 ddda w-full"
            v-validate="'required'"
          />
        <!-- ngày bắt đầu học -->
          <label for class="vs-input--label">Ngày bắt đầu *</label>
          <datepicker
            :fullMonthName="true"
            v-model="formatDateStartAt"
            :language="languages[language]"
            format="d MMMM yyyy"
            :value="courses.start_at"
            class="w-full picker-custom mb-5"
            placeholder="chọn ngày bắt đầu"
          ></datepicker>
        <!--Ngày kết thúc-->
          <label for class="vs-input--label">Ngày kết thúc *</label>
          <datepicker
            :fullMonthName="true"
            v-model="formatDateEndAt"
            :language="languages[language]"
            format="d MMMM yyyy"
            :value="courses.end_at"
            class="w-full picker-custom mb-5"
            placeholder="chọn ngày kết thúc"
          ></datepicker>
        <!--trạng thái-->
        <vs-select v-model="courses.status" label="Trạng thái" class="mb-5 w-full">
          <vs-select-item
            :key="item.value"
            :value="item.value"
            :text="item.text"
            v-for="item in status"
          />
        </vs-select>
        <vx-search-ajax
          text="Chương trình học "
          :link-api="`branches/${branchId}/programs`"
          :change.sync="courses.program_id"
          get-attribute="id" />
        <vs-input
          label="Thời lượng *"
          name="price"
          v-model="courses.number_of_lessons"
          type="number"
          class="w-full"
          v-validate="'required'"
        />
      </div>
    </VuePerfectScrollbar>

    <div class="flex flex-wrap items-center justify-center p-6" slot="footer">
      <vs-button
        class="mr-6 vs-con-loading__container"
        @click="createCourse"
        :disabled="errors.any()"
        ref="addButton"
        id="button-with-loading"
      >Thêm</vs-button>
      <vs-button type="border" color="danger" @click="isSidebarActiveLocal = false">Trở lại</vs-button>
    </div>
  </vs-sidebar>
</template>

<script>
import Datepicker from "vuejs-datepicker";
import * as lang from "vuejs-datepicker/src/locale";
import VuePerfectScrollbar from "vue-perfect-scrollbar";

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
      language: "vi",
      languages: lang,
      courses: {
        id: "",
        name: "",
        program_id: null,
        branch_id: null,
        start_at: "",
        end_at: "",
        price: 0,
        status: 1,
        number_of_lessons: 0
      },
      selectedProgram: null,
      selectedBranch: null,
      status: this.$store.state.model.courses.status,
      disabled: true,
      settings: {
        // perfectscrollbar settings
        maxScrollbarLength: 60,
        wheelSpeed: 0.6
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
          this.$emit("closeSidebar");
          this.initValues();
        }
      }
    },
    formatDateStartAt: {
      get() {
        return this.courses.start_at;
      },
      set(val) {
        this.courses.start_at = this.formatDateUTC(val);
      }
    },
    formatDateEndAt: {
      get() {
        return this.courses.end_at;
      },
      set(val) {
        this.courses.end_at = this.formatDateUTC(val);
      }
    },
    branchId() {
      return this.$store.state.getBranchId;
    }
  },
  components: {
    VuePerfectScrollbar,
    Datepicker
  },

  methods: {
    initValues() {
      this.courses = {
        name: "",
        program_id: null,
        branch_id: null,
        start_at: "",
        end_at: "",
        price: 0,
        status: 1,
        number_of_lessons: 0
      };
      this.selectedProgram = null;
      this.selectedBranch = null;
    },
    createCourse() {
      this.$vs.loading({
        background: "#1E6DB5",
        color: "#fff",
        container: "#button-with-loading",
        scale: 0.45
      });
      this.$http
        .post(`branches/${this.branchId}/courses`, {
          name: this.courses.name,
          program_id: this.courses.program_id,
          branch_id: this.courses.branch_id,
          status: this.courses.status,
          start_at: this.courses.start_at,
          end_at: this.courses.end_at,
          price: this.courses.price,
          number_of_lessons: this.courses.number_of_lessons
        })
        .then(() => {
          this.$vs.notify({
            title: "Đã thêm mới thành công",
            text: "OK",
            iconPack: "feather",
            icon: "fa fa-lg fa-check-circle",
            color: "success"
          });
          this.callback();
          this.initValues();
          this.isSidebarActiveLocal = false;
          this.$emit('closePopupAdd', false);
        })
        .catch(error => {
          this.checkResponRequest(error.response.data, null, null, "Thêm mới thất bại");
        })
        .finally(() => {
          this.$vs.loading.close("#button-with-loading > .con-vs-loading");
        });
    }
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

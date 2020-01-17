<template>
  <div class="min-h-300 relative">
    <vs-row vs-w="12">
      <vs-col vs-w="12">
        <div
          class="vs-component vs-con-input-label vs-input w-full vs-input-primary"
        >
          <vx-search-ajax
            text="Lớp học "
            :link-api="`branches/${branchId}/programs/${studentInfo.program_id}/courses`"
            :change.sync="selectedCourses"
            get-attribute="id"
          />
        </div>
      </vs-col>
      <p class="text-center text-danger mt-5 px-5">
        <font-awesome-icon icon="exclamation-triangle"/> Lưu ý: Chỉ được chuyển học viên sang lớp có cùng chương trình học cũ !
      </p>

      <vs-col
        class="mt-5 absolute bottom-0"
        vs-w="12"
        vs-type="flex"
        vs-justify="flex-end" >
        <vs-button
          class="ml-3 vs-con-loading__container"
          type="filled"
          color="primary"
          ref="addButton"
          @click="update()"
          id="button-loading-join"
          >Chuyển lớp</vs-button
        >
        <vs-button
          class="ml-3"
          type="filled"
          color="danger"
          @click="$emit('update:active', false)"
          >Hủy</vs-button
        >
      </vs-col>
    </vs-row>
  </div>
</template>

<script>
export default {
  props: {
    getData: {
      type: Function,
      required: false
    },
    studentInfo: {
      required: true
    },
    reserveId: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      loading: false,
      selectedCourses: null,
      disabled: "disabled"
    };
  },
  computed: {
    branchId() {
      return this.$store.state.getBranchId;
    }
  },
  methods: {
    changeStatusStudent() {
      this.$vs.loading({
        background: "#1E6DB5",
        color: "#fff",
        container: "#button-loading-join",
        scale: 0.45
      });
      this.$http
        .put(`branches/${this.branchId}/reserves/${this.reserveId}`, {
          type: 2,
          course_new_id: this.selectedCourses
        })
        .then(() => {
          this.$emit("closePopup", false);
          this.getData();
        })
        .catch(() => {
          this.$vs.notify({
            title: "Lỗi !",
            text: "Chuyển trạng thái học viên lỗi !",
            iconPack: "feather",
            icon: "fa fa-lg fa-exclamation-triangle",
            color: "danger"
          });
        })
        .finally(() => {
          this.$vs.loading.close("#button-loading-join > .con-vs-loading");
        });
    },
    async update() {
      await new Promise(resolve => {
        this.$vs.loading({
          background: "#1E6DB5",
          color: "#fff",
          container: "#button-loading-join",
          scale: 0.45
        });
        this.$http
          .post(
            `branches/${this.branchId}/courses/${this.selectedCourses}/registers`,
            {
              student_id: this.studentInfo.id,
              coupon_id: null,
              status: 1
            }
          )
          .then(() => {
            this.$vs.notify({
              title: "Chuyển học viên thành công",
              text: "OK",
              iconPack: "feather",
              icon: "fa fa-lg fa-check-circle",
              color: "success"
            });
            resolve(true);
          })
          .catch(error => {
            this.checkResponRequest(
              error.response.data,
              null,
              null,
              "Thêm học viên vào lớp thất bại"
            );
          })
          .finally(() => {
            this.$vs.loading.close("#button-loading-join > .con-vs-loading");
          });
      });

      this.changeStatusStudent();
    }
  }
};
</script>

<style lang="scss" scoped>
.table-border {
  .vs-table--tbody {
    border: none;

    table {
      th {
        border: 1px solid #ccc;
      }

      td {
        border: 1px solid #ccc;
      }
    }
  }
}

.d-flex {
  display: flex;
}

.d-block {
  display: block;
}

.pl-0 {
  padding-left: 0;
}

.border {
  border: 1px solid #ccc;
}
.min-h-300 {
  min-height: 300px;
}
.bottom-0 {
  bottom: 0;
}
</style>

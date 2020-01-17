<template>
  <div>
    <vs-textarea
      label="Ghi chú lý do"
      height="200"
      class="w-100 mb-2"
      v-model="note"
    />
    <p class="text-center text-danger mb-5">
      <font-awesome-icon icon="exclamation-triangle"/> Lưu ý: khi bảo lưu học viên <strong>{{ courseInfo.name }}</strong> sẽ bị xóa ở lớp học này !
    </p>
    <div class="flex flex-wrap items-center flex-row-reverse">
      <vs-button
        color="danger"
        class="vs-con-loading__container"
        @click="$emit('update:active', false)"
        >hủy</vs-button
      >
      <vs-button
        id="button-with-loading-new"
        class="mr-6 vs-con-loading__container"
        @click="addNewReverse"
        >Bảo lưu</vs-button
      >
    </div>
  </div>
</template>

<script>
export default {
  props: {
    courseInfo: {
      required: true
    },
    callback: {
      type: Function
    }
  },
  data() {
    return {
      note: null,
      branchId: this.$store.state.getBranchId
    };
  },
  methods: {
    addNewReverse() {
      this.$vs.loading({
        background: "#1E6DB5",
        color: "#fff",
        container: "#button-with-loading-new",
        scale: 0.45
      });
      this.$http
        .post(`branches/${this.branchId}/reserves`, {
          course_id: this.courseInfo.course_id,
          student_id: this.courseInfo.student_id,
          progress: this.courseInfo.progress,
          note: this.note,
          branch_id: this.branchId
        })
        .then(() => {
          this.$vs.notify({
            color: "success",
            title: "Thêm học viên bảo lưu",
            text: "Bảo lưu thành công",
            icon: "verified_user"
          });
          this.$emit("closePopupReverses", false);
          this.callback();
        })
        .catch(error => {
          this.checkResponRequest(
            error.response.data,
            null,
            null,
            "Bảo lưu thất bại"
          );
        })
        .finally(() => {
          this.$vs.loading.close("#button-with-loading-new > .con-vs-loading");
        });
    }
  }
};
</script>

<style lang="scss" scoped></style>

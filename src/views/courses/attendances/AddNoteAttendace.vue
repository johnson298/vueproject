<template>
  <div>
    <vs-row vs-w="12">
      <vs-col vs-w="12">
        <div class="note">
          <label class="vs-input--label">Ghi chú</label>
        </div>
        <vs-textarea
          v-model="attendaceNote"
          style="border: solid 1px #dddddd"
          name="note"
          placeholder="Ghi chú"
          type="text"
          class="w-full"
          :rows="5"
        />
      </vs-col>

      <vs-col class="mt-5" vs-w="12" vs-type="flex" vs-justify="flex-end">
        <vs-button
          class="ml-3 vs-con-loading__container"
          type="filled"
          color="primary"
          ref="addButton"
          @click="addNoteAttendance"
          id="btn-loading"
        >Thêm ghi chú</vs-button>
        <vs-button
          class="ml-3"
          type="filled"
          color="danger"
          @click="$emit('update:active',false), attendaceNote=null"
        >Hủy</vs-button>
      </vs-col>
    </vs-row>
  </div>
</template>

<script>
import "@/assets/css/flatpickr.css";
export default {
  props: {
    callback: {
      type: Function,
      required: false
    },
    getInfo: {
      type: Object,
      required: false,
      default: null
    }
  },
  data() {
    return {
      attendaceNote: null,
      branchId: this.$store.state.getBranchId,
      courseID: this.$route.params.course,
      attendanceId: this.$route.params.attendance
    };
  },
  methods: {
    addNoteAttendance() {
      this.$vs.loading({
        background: "#1E6DB5",
        color: "#fff",
        container: "#btn-loading",
        scale: 0.45
      });
      const url = `branches/${this.branchId}/courses/${this.courseID}/attendances/${this.attendanceId}/items/${this.getInfo.idStudentAttendace}`;
      this.$http
        .put(url, {
          note: this.attendaceNote
        })
        .then(() => {
          this.$vs.notify({
            title: "Thêm ghi chú thành công",
            text: "OK",
            iconPack: "feather",
            icon: "fa fa-lg fa-check-circle",
            color: "success"
          });
          this.callback();
          this.$emit("closePopupAdd", false);
        })
        .catch(error => {
          if (
            error.response.status === 500 &&
            error.response.data.error.hasOwnProperty("validation")
          ) {
            let message =
              error.response.data.error.validation[
                Object.keys(error.response.data.error.validation)[0]
              ][0];
            this.$vs.notify({
              title: "Validation error!",
              text: message,
              iconPack: "feather",
              icon: "fa fa-lg fa-exclamation-triangle",
              color: "danger"
            });
          } else {
            this.$vs.notify({
              title: "Error!",
              text: "Thêm ghi chú thất bại",
              iconPack: "feather",
              icon: "fa fa-lg fa-exclamation-triangle",
              color: "danger"
            });
          }
        })
        .finally(() => {
          this.$vs.loading.close("#btn-loading > .con-vs-loading");
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.vs-popup {
  width: 1000px;
}

.input.flatpickr-input {
  height: 38.3px !important;
}

input.flatpickr-input {
  width: 100%;
  border: 1px solid rgba(0, 0, 0, 0.2);
  padding: 0.7rem;
  font-size: 1rem;
  border-radius: 5px;
}

.group-chip {
  position: relative;

  .all-chip {
    position: absolute;
    z-index: 1;
    right: 3px;
    top: 50%;
    transform: translateY(-50%);

    .con-vs-chip {
      zoom: 0.85;
    }
  }
}
</style>

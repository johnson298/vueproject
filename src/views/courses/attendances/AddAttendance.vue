<template>
  <div>
    <vs-row vs-w="12">
      <vs-col vs-w="12">
        <label class="vs-input--label">Ngày điểm danh</label>
        <div class="columns">
          <div class="column w-full is-3">
            <flat-pickr v-model="currentDate" placeholder="chọn ngày điểm danh" disabled="true" />
          </div>
        </div>
      </vs-col>

      <vs-col class="mt-5" vs-w="12" vs-type="flex" vs-justify="flex-end">
        <vs-button
          class="ml-3 vs-con-loading__container"
          type="filled"
          color="primary"
          ref="addButton"
          @click="createAttendance"
          id="btn-loading"
        >Tạo điểm danh</vs-button>
        <vs-button
          class="ml-3"
          type="filled"
          color="danger"
          @click="$emit('update:active',false)"
        >Hủy</vs-button>
      </vs-col>
    </vs-row>
  </div>
</template>

<script>
import flatPickr from "vue-flatpickr-component";
import "@/assets/css/flatpickr.css";
export default {
  props: {
    callback: {
      type: Function,
      required: false
    }
  },
  data() {
    return {
      currentDate: new Date()
        .toJSON()
        .slice(0, 10)
        .replace(/-/g, "-"),
      branchId: this.$store.state.getBranchId,
      courseID: this.$route.params.course
    };
  },
  components: {
    flatPickr
  },
  methods: {
    createAttendance() {
      this.$vs.loading({
        background: "#1E6DB5",
        color: "#fff",
        container: "#btn-loading",
        scale: 0.45
      });
      this.$http
        .post(
          `/branches/${this.branchId}/courses/${this.courseID}/attendances`,
          {
            date: this.currentDate
          }
        )
        .then(() => {
          this.$vs.notify({
            title: "Đã thêm mới thành công",
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
              text: "Thêm mới thất bại",
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

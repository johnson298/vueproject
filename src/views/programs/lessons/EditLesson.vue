<template>
  <div>
    <vs-row vs-w="12">
      <vs-col vs-w="12">
        <vs-row class="mt-5">
          <vs-col vs-w="12" class="p-0 mb-5">
            <vs-input
              label="Tên bài học"
              placeholder="Nhập tên bài học"
              class="w-full"
              v-model="lessonData.name"
            />
          </vs-col>
          <vs-col vs-w="12" class="p-0 mb-5">
            <vs-input
              label="Đường dẫn khóa học"
              placeholder="Nhập đường dẫn video"
              class="w-full"
              v-model="lessonData.url"
            />
          </vs-col>
          <vs-col vs-w="12" class="p-0 mb-5">
            <div class="note">
              <label class="vs-input--label">Mô tả bài học</label>
            </div>
            <vs-textarea
              style="border: solid 1px #dddddd"
              name="description"
              type="text"
              class="w-full"
              :rows="5"
              placeholder="Nhập mô tả cho bài học"
              v-model="lessonData.description"
            />
          </vs-col>
        </vs-row>
      </vs-col>
      <vs-col class="mt-5" vs-w="12" vs-type="flex" vs-justify="flex-end">
        <vs-button
          class="mr-6 vs-con-loading__container"
          @click="updateLesson"
          type="filled"
          color="primary"
          id="btn-loading"
        >chỉrnh sửa</vs-button>
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
export default {
  props: {
    callback: {
      type: Function,
      required: true
    },
    lessonData: {
      type: Object,
      required: true
    }
  },
  computed: {
    branchId() {
      return this.$store.state.getBranchId;
    }
  },
  data() {
    return {
      programId: this.$route.params.program
    };
  },
  methods: {
    formData() {
      let formData = new FormData();
      Object.keys(this.lessonData).map(val => {
        formData.append(val, this.lessonData[val]);
      });
      formData.append("_method", "PUT");
      return formData;
    },
    updateLesson() {
      let url = `branches/${this.branchId}/programs/${this.programId}/lessons/${this.lessonData.id}`;
      this.$vs.loading({
        background: "#1E6DB5",
        color: "#fff",
        container: "#btn-loading",
        scale: 0.45
      });
      this.$http
        .post(url, this.formData())
        .then(() => {
          this.$vs.notify({
            title: "Chỉnh sửa",
            text: "Chỉnh sửa thành công",
            iconPack: "feather",
            icon: "fa fa-lg fa-check-circle",
            color: "success"
          });
          this.$emit("closePopupUpdateLesson", false);
          this.callback();
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
              title: "Lỗi thông tin!",
              text: message,
              iconPack: "feather",
              icon: "fa fa-lg fa-exclamation-triangle",
              color: "danger"
            });
          } else {
            this.$vs.notify({
              title: "Có lỗi!",
              text: "Chỉnh sửa thất bại",
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
</style>

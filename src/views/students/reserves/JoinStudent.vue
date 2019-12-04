<template>
  <div class="min-h-300 relative">
    <vs-row vs-w="12">
      <vs-col vs-w="12">
        <div
          class="vs-component vs-con-input-label vs-input mt-5 w-full vs-input-primary"
        >
          <label class="vs-input--label">Lớp học</label>
          <vue-simple-suggest
            v-model="selectedCourses"
            mode="select"
            ref="suggestComponentCourses"
            placeholder="Search information..."
            value-attribute="id"
            display-attribute="name"
            :list="getCourses"
            :debounce="200"
            :filter-by-query="false"
            @select="onSuggestSelectCourses"
          >
            <div class="g">
              <input type="text" placeholder="Search information..." />
            </div>
            <template
              slot="misc-item-above"
              slot-scope="{ suggestions, query }"
            >
              <div class="misc-item">
                <span>You're searching for '{{ query }}'.</span>
              </div>

              <template v-if="suggestions.length > 0">
                <div class="misc-item">
                  <span>{{ suggestions.length }} suggestions are shown...</span>
                </div>
                <hr />
              </template>

              <div class="misc-item" v-else-if="!loading">
                <span>No results</span>
              </div>
            </template>

            <div slot="suggestion-item" slot-scope="{ suggestion, query }">
              <div class="text">
                <span>{{ suggestion.name | truncate(40) }}</span>
              </div>
            </div>

            <div
              class="misc-item"
              slot="misc-item-below"
              slot-scope="{ suggestions }"
              v-if="loading"
            >
              <span>Loading...</span>
            </div>
          </vue-simple-suggest>
        </div>
      </vs-col>

      <vs-col
        class="mt-5 absolute bottom-0"
        vs-w="12"
        vs-type="flex"
        vs-justify="flex-end"
      >
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
      selectedCourses: {
        id: null
      },
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
          course_new_id: this.selectedCourses.id
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
            `branches/${this.branchId}/courses/${this.selectedCourses.id}/registers`,
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
    },
    onSuggestSelectCourses(suggest) {
      if (suggest) {
        this.selectedCourses = suggest;
      }
    },
    getCourses(search = "") {
      let vm = this;
      return new Promise((resolve, reject) => {
        this.$http
          .get(`branches/${this.branchId}/programs/${this.studentInfo.program_id}/courses`, {
            params: {
              search: search
            }
          })
          .then(function(response) {
            resolve(response.data.data);
          })
          .catch(e => {
            vm.loading = false;
            reject(e);
          });
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
.min-h-300 {
  min-height: 300px;
}
.bottom-0 {
  bottom: 0;
}
</style>

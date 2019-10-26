<template>
  <div class="vs-component con-vs-popup holamundo vs-popup-primary">
    <div class="vs-popup--background" @click="$emit('update:active', false)"></div>
    <div class="vs-popup" style="background: rgb(255, 255, 255);">
      <header class="vs-popup--header">
        <div class="vs-popup--title">
          <h3>Chỉnh sửa lịch học</h3>
        </div>
        <i
          class="vs-icon icon-scale vs-popup--close vs-popup--close--icon material-icons"
          style="background: rgb(255, 255, 255);"
          @click="$emit('update:active',false)"
        >close</i>
      </header>
      <div class="vs-popup--content">
        <div class="vx-row">
          <div class="vx-col sm:w-1/2 w-full mb-2">
            <vs-input
              label="Tên lịch học"
              v-model="dataInfo.title"
              class="w-full"
              placeholder="nhập tên lịch học..."
            />
          </div>
          <div class="vx-col sm:w-1/2 w-full mb-2">
            <div class="vs-component vs-con-input-label vs-input w-full vs-input-primary">
              <label class="vs-input--label">Giáo viên</label>
              <v-select multiple v-model="selected" :options="teachersOptions" value="k"></v-select>
            </div>
          </div>
          <div class="vx-col sm:w-1/2 w-full mb-2">
            <div v-if="rooms.length!=0" key="check-room">
              <vs-select
                v-model="dataInfo.room_id"
                label="Chọn phòng học"
                placeholder="Chọn phòng"
                class="w-full"
              >
                <vs-select-item
                  :key="item.value"
                  :value="item.id"
                  :text="item.name"
                  v-for="item in rooms"
                />
              </vs-select>
            </div>
            <p v-else key="check-room" class="pt-8 text-danger">Chi nhánh này chưa có phòng học !</p>
          </div>
          <div class="vx-col sm:w-1/2 w-full mb-2">
            <label class="vs-input--label">Ngày bắt đầu</label>
            <div class="columns">
              <div class="column w-full is-3">
                <flat-pickr v-model="dataInfo.from_date" placeholder="chọn ngày bắt đầu" />
              </div>
            </div>
          </div>
          <div class="vx-col sm:w-1/2 w-full mb-2">
            <div class="vs-component vs-con-input-label vs-input w-full vs-input-primary">
              <label for class="vs-input--label">Giờ bắt đầu</label>
              <flat-pickr
                :config="configTimePicker"
                v-model="dataInfo.start_at"
                placeholder="Chọn giờ bắt đầu"
              />
            </div>
          </div>
          <div class="vx-col sm:w-1/2 w-full mb-2">
            <div class="vs-component vs-con-input-label vs-input w-full vs-input-primary">
              <label for class="vs-input--label">Giờ kết thúc</label>
              <flat-pickr
                :config="configTimePicker"
                v-model="dataInfo.end_at"
                placeholder="Chọn giờ kết thúc"
              />
            </div>
          </div>
        </div>

        <div class="mt-5 w-100">
          <vs-row>
            <vs-col class="p-0" vs-w="3">
              <vs-checkbox v-model="checkIsLoop" :checked="dataInfo.is_loop==1?true:false">
                <span v-if="checkIsLoop" key="loop-date">Không lặp lại</span>
                <span v-else key="loop-date">Lặp lại</span>
              </vs-checkbox>
            </vs-col>
          </vs-row>
        </div>
        <div v-if="dataInfo.is_loop" class="mt-5">
          <div>
            <div class="vx-row">
              <div class="vx-col sm:w-1/4 w-full mb-3" v-for="(item, key) in weekdays" :key="key">
                <vs-checkbox v-model="dataInfo[item.name]" vs-value="1">{{ item.title }}</vs-checkbox>
              </div>
            </div>
            <div class="vx-row">
              <div class="vx-col sm:w-1/2 w-full mb-2">
                <div class="mt-5">
                  <label class="vs-input--label">Ngày nghỉ</label>
                  <div class="columns">
                    <div class="column w-full is-3">
                      <flat-pickr
                        v-model="dataInfo.except_date"
                        :config="configMulti"
                        placeholder="chọn ngày nghỉ"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div class="vx-col sm:w-1/2 w-full mb-2">
                <div class="mt-5">
                  <label class="vs-input--label">Ngày kết thúc</label>
                  <div class="columns">
                    <div class="column w-full is-3">
                      <flat-pickr v-model="dataInfo.to_date" placeholder="chọn ngày kết thúc" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="mt-5">
          <div class="note">
            <label class="vs-input--label">Nhi chú</label>
          </div>
          <vs-textarea
            style="border: solid 1px #dddddd"
            name="note"
            type="text"
            v-model="dataInfo.note"
            class="w-full"
            :rows="5"
          />
        </div>
      </div>
      <div class="footer">
        <div class="p-6" style="text-align: right" slot="footer">
          <vs-button
            class="mr-6 vs-con-loading__container"
            ref="addButton"
            id="button-with-loading"
            @click="editSchedule"
          >Chỉnh sửa</vs-button>
          <vs-button type="border" color="danger" @click.prevent="$emit('update:active',false)">Hủy</vs-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import flatPickr from "vue-flatpickr-component";
import "@/assets/css/flatpickr.css";
import VuePerfectScrollbar from "vue-perfect-scrollbar";
import vSelect from "vue-select";

export default {
  props: {
    callback: {
      type: Function,
      required: true
    },
    dataInfo: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      selected: [],
      teachersOptions: [],
      infoTeachers: [],
      idsTeachers: [],
      weekdays: [
        {
          id: 1,
          title: "Thứ 2",
          name: "monday"
        },
        {
          id: 2,
          title: "Thứ 3",
          name: "tuesday"
        },
        {
          id: 3,
          title: "Thứ 4",
          name: "wednesday"
        },
        {
          id: 4,
          title: "Thứ 5",
          name: "thursday"
        },
        {
          id: 5,
          title: "Thứ 6",
          name: "friday"
        },
        {
          id: 6,
          title: "Thứ 7",
          name: "saturday"
        },
        {
          id: 7,
          title: "Chủ nhật",
          name: "sunday"
        }
      ],
      teachers: [],
      configTimePicker: {
        enableTime: true,
        enableSeconds: true,
        noCalendar: true
      },
      configMulti: {
        altFormat: "F j, Y",
        altInput: false,
        inline: false,
        enableTime: false,
        mode: "multiple"
      },
      selectedTeacher: null,
      rooms: [],
      loading: false,
      branch_id: this.$store.state.getBranchId,
      course_id: this.$route.params.course
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
    checkIsLoop: {
      get() {
        return this.dataInfo.is_loop;
      },
      set() {
        this.dataInfo.is_loop = this.dataInfo.is_loop == 0 ? 1 : 0;
      }
    }
  },
  components: {
    VuePerfectScrollbar,
    "v-select": vSelect,
    flatPickr
  },
  methods: {
    getIdsTeacher() {
      let arrName = this.infoTeachers.map(item => item.name);
      let arrId = this.infoTeachers.map(item => item.id);
      let selected = this.selected;
      for (let key in selected) {
        if (arrName.includes(selected[key])) {
          for (let i in arrName) {
            arrName[i] === selected[key]
              ? this.idsTeachers.push(arrId[i])
              : false;
          }
        }
      }
      return this.idsTeachers;
    },
    getAllTeachers() {
      let vm = this;
      this.$http
        .get(`branches/${this.branch_id}/courses/${this.course_id}/teachers`)
        .then(function(response) {
          vm.teachersOptions.push(
            ...response.data.data.map(item => item.user.name)
          );
          vm.infoTeachers.push(
            ...response.data.data.map(item => ({
              name: item.user.name,
              id: item.user.id
            }))
          );
        })
        .catch(() => {
          this.$vs.notify({
            title: "Error!",
            text: "Có lỗi xảy ra",
            iconPack: "feather",
            icon: "fa fa-lg fa-exclamation-triangle",
            color: "danger"
          });
        });
    },
    getRooms() {
      let vm = this;
      this.$http
        .get(`branches/${this.branch_id}/rooms`)
        .then(function(response) {
          vm.rooms = response.data.data;
        })
        .catch(() => {
          this.$vs.notify({
            title: "Error!",
            text: "Có lỗi xảy ra",
            iconPack: "feather",
            icon: "fa fa-lg fa-exclamation-triangle",
            color: "danger"
          });
        });
    },
    formData() {
      let formData = new FormData();
      Object.keys(this.dataInfo).map(key => {
        formData.append(key, this.dataInfo[key]);
      });
      return formData;
    },
    editSchedule() {
      let joinsData = this.dataInfo.joins;
      let joinsEdit = [];
      Object.keys(joinsData).forEach(key => {
        if (typeof joinsData[key] == "object") {
          joinsEdit.push(joinsData[key].id);
        } else {
          joinsEdit.push(joinsData[key]);
        }
      });
      this.$vs.loading({
        background: "#1E6DB5",
        color: "#fff",
        container: "#button-with-loading",
        scale: 0.45
      });
      this.$http
        .put(
          `branches/${this.branch_id}/courses/${this.course_id}/schedules/${this.dataInfo.id}`,
          {
            room_id: this.dataInfo.room_id,
            title: this.dataInfo.title,
            start_at: this.dataInfo.start_at,
            end_at: this.dataInfo.end_at,
            from_date: this.dataInfo.from_date,
            to_date: this.dataInfo.to_date || this.dataInfo.from_date,
            is_loop: this.dataInfo.is_loop,
            except_date:
              typeof this.dataInfo.except_date == "string"
                ? this.dataInfo.except_date.split(", ")
                : this.dataInfo.except_date,
            monday: this.dataInfo.monday,
            tuesday: this.dataInfo.tuesday,
            wednesday: this.dataInfo.wednesday,
            thursday: this.dataInfo.thursday,
            friday: this.dataInfo.friday,
            saturday: this.dataInfo.saturday,
            sunday: this.dataInfo.sunday,
            joins: this.getIdsTeacher(),
            note: this.dataInfo.note
          }
        )
        .then(() => {
          this.$vs.notify({
            title: "Đã sửa mới thành công",
            text: "OK",
            iconPack: "feather",
            icon: "fa fa-lg fa-check-circle",
            color: "success"
          });
          this.callback();
          this.$emit("closeEdit", false);
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
          this.$vs.loading.close("#button-with-loading > .con-vs-loading");
        });
    }
  },
  created() {
    this.getRooms();
    this.selected.push(...this.dataInfo.joins.map(item => item.user.name));
  },
  mounted() {
    this.getAllTeachers();
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
.vs--searchable .vs__dropdown-toggle {
  height: 38px !important;
}
</style>

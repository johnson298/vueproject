<template>
  <div id="data-list-list-view" class="data-list-container">
    <vs-popup class="popup-custom-768" title="Tạo mới điểm danh" :active.sync="popupAddNote">
      <add-not-attendance
        v-if="popupAddNote"
        :callback="getData"
        :getInfo="attendanceInfomation"
        :active.sync="popupAddNote"
        @closePopupAdd="popupAddNote = $event"
      />
    </vs-popup>
    <vs-table-custom
      :sst="true"
      ref="table"
      multiple
      v-model="selected"
      @search="handleSearch"
      @sort="handleSort"
      :data="registersAttendance"
      search
      id="table"
      maxItems="10"
    >
      <div slot="header" class="flex flex-wrap-reverse items-center flex-grow justify-between">
        <div class="flex flex-wrap-reverse items-center">
          <!-- ACTION - DROPDOWN -->
          <vs-dropdown vs-trigger-click class="cursor-pointer mr-4 mb-4">
            <div
              class="p-4 shadow-drop rounded-lg d-theme-dark-bg cursor-pointer flex items-center justify-center text-lg font-medium w-32"
            >
              <span class="mr-2">Actions</span>
              <feather-icon icon="ChevronDownIcon" svgClasses="h-4 w-4" />
            </div>

            <vs-dropdown-menu>
              <vs-dropdown-item>
                <span>Delete</span>
              </vs-dropdown-item>
              <vs-dropdown-item>
                <span>Archive</span>
              </vs-dropdown-item>
              <vs-dropdown-item>
                <span>Print</span>
              </vs-dropdown-item>
              <vs-dropdown-item>
                <span>Another Action</span>
              </vs-dropdown-item>
            </vs-dropdown-menu>
          </vs-dropdown>

          <!-- ACTION - DROPDOWN -->
          <vs-dropdown class="cursor-pointer mr-4 mb-4">
            <div
              class="p-4 shadow-drop rounded-lg d-theme-dark-bg cursor-pointer flex items-center justify-center text-lg font-medium w-32"
            >
              <span class="mr-2">Views</span>
              <feather-icon icon="ChevronDownIcon" svgClasses="h-4 w-4" />
            </div>

            <vs-dropdown-menu>
              <div class="col p-2">
                <div v-for="(value, index) in views" :key="index" class="p-1">
                  <vs-checkbox
                    :value="value.viewable"
                    @change="updateViews(index, $event)"
                  >{{ value.text }}</vs-checkbox>
                </div>
              </div>
            </vs-dropdown-menu>
          </vs-dropdown>
        </div>
      </div>

      <template slot="thead">
        <vs-th
          :sort-key="value.sortKey"
          v-for="(value, index) in views"
          :key="index"
          v-if="value.viewable"
        >{{ value.text }}</vs-th>
      </template>
      <template slot-scope="{data}">
        <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data" class="col">
          <vs-td v-if="views.code.viewable">
            <p class="product-name font-medium">{{ tr.student.code }}</p>
          </vs-td>
          <vs-td v-if="views.avatar.viewable">
            <vs-avatar size="55px" :src="tr.student.avatar" :alt="tr.student.avatar" />
          </vs-td>

          <vs-td v-if="views.name.viewable">
            <p class="product-name font-medium">{{ tr.student.name }}</p>
          </vs-td>

          <vs-td v-if="views.note.viewable">
            <p class="product-category">{{ tr.note }}</p>
          </vs-td>

          <vs-td v-if="views.updated_at.viewable">
            <p class="product-category">{{ tr.updated_at }}</p>
          </vs-td>

          <vs-td v-if="views.created_at.viewable">
            <p class="product-category">{{ tr.created_at }}</p>
          </vs-td>

          <vs-td v-if="views.action.viewable" class="d-flex-span">
            <label class="vs-component con-vs-radio mr-5 vs-radio-success" checked="true">
              <input
                :name="tr.id"
                type="radio"
                :data-id="tr.id"
                :data-name="tr.student.name"
                class="vs-radio--input"
                value="1"
                :checked="tr.status==1?true:false"
                @change="changeStatus"
              />
              <span class="vs-radio">
                <span class="vs-radio--borde" style="border: 2px solid rgb(200, 200, 200);"></span>
                <span class="vs-radio--circle"></span>
              </span>
              <span class="vs-radio--label">Có mặt</span>
            </label>
            <label class="vs-component con-vs-radio mr-5 vs-radio-warning">
              <input
                :name="tr.id"
                type="radio"
                :data-id="tr.id"
                :data-name="tr.student.name"
                class="vs-radio--input"
                value="2"
                :checked="tr.status==2?true:false"
                @change="changeStatus"
              />
              <span class="vs-radio">
                <span class="vs-radio--borde" style="border: 2px solid rgb(200, 200, 200);"></span>
                <span class="vs-radio--circle"></span>
              </span>
              <span class="vs-radio--label">Đi trễ</span>
            </label>
            <label class="vs-component con-vs-radio mr-5 vs-radio-danger">
              <input
                :name="tr.id"
                type="radio"
                :data-id="tr.id"
                :data-name="tr.student.name"
                class="vs-radio--input"
                value="3"
                :checked="tr.status==3?true:false"
                @change="changeStatus"
              />
              <span class="vs-radio">
                <span class="vs-radio--borde" style="border: 2px solid rgb(200, 200, 200);"></span>
                <span class="vs-radio--circle"></span>
              </span>
              <span class="vs-radio--label">Vắng mặt</span>
            </label>
          </vs-td>
          <vs-td class="d-flex-span">
            <vx-tooltip text="Ghi chú">
              <vs-button
                radius
                color="success"
                size="small"
                @click="getInfo(tr.id, tr.note)"
                class="vs-component vs-button vs-button-filled includeIcon includeIconOnly small"
              >
                <i class="feather icon-message-circle"></i>
              </vs-button>
            </vx-tooltip>
          </vs-td>
        </vs-tr>
      </template>
    </vs-table-custom>
  </div>
</template>

<script>
import AddNoteAttendace from "./AddNoteAttendace";
import { mapState } from "vuex";

export default {
  components: {
    "add-not-attendance": AddNoteAttendace
  },
  data() {
    return {
      attendanceInfomation: null,
      popupAddNote: false,
      rboAttendance: 1,
      attendanceId: this.$route.params.attendance,
      courseId: this.$route.params.course,
      popupAllstudent: false,
      activeConfirm: false,
      timer: null,
      selected: [],
      isMounted: false,
      addNewDataSidebar: false,
      checked: true,
      radioTest: null,
      prev:
        '<button class="vs-pagination--buttons btn-prev-pagination vs-pagination--button-prev"><i class="vs-icon notranslate icon-scale material-icons null">chevron_left</i></button>',
      next:
        '<button class="vs-pagination--buttons btn-prev-pagination vs-pagination--button-next"><i class="vs-icon notranslate icon-scale material-icons null">chevron_right</i></button>'
    };
  },
  computed: {
    ...mapState("registersAttendance", [
      "registersAttendance",
      "pagination",
      "searchTerm",
      "order",
      "views",
      "needReload"
    ]),
    branch_id() {
      return this.$store.state.getBranchId;
    }
  },
  created() {
    this.getData();
  },
  methods: {
    getInfo(id, note) {
      this.popupAddNote = true;
      this.attendanceInfomation = {
        idStudentAttendace: id,
        noteStudentAttendace: note
      };
    },
    changeStatus(event) {
      let idItem = event.target.getAttribute("data-id");
      let StatusItem = event.target.value;
      const url = `branches/${this.branch_id}/courses/${this.courseId}/attendances/${this.attendanceId}/items/${idItem}`;
      const thisIns = this;
      this.$http
        .put(url, {
          _method: "PUT",
          status: StatusItem
        })
        .then(() => {
          this.$vs.notify({
            title: "Cập nhật",
            text: `Học viên ${event.target.getAttribute("data-name")} ${
              StatusItem == 1
                ? "có mặt"
                : StatusItem == 2
                  ? "đi trễ"
                  : StatusItem == 3
                    ? "vắng mặt"
                    : ""
            }`,
            iconPack: "feather",
            icon: "fa fa-lg fa-check-circle",
            color: `${
              StatusItem == 1
                ? "success"
                : StatusItem == 2
                  ? "warning"
                  : StatusItem == 3
                    ? "danger"
                    : ""
            }`
          });
        })
        .catch(error => {
          thisIns.$vs.notify({
            title: "Đã xảy ra lỗi",
            text: error,
            color: "danger",
            iconPack: "feather",
            icon: "icon-alert-circle"
          });
          thisIns.getData();
        });
    },
    updateViews(index, e) {
      this.$store.dispatch("registersAttendance/updateViews", {
        index: index,
        viewable: e.target.checked
      });
    },
    formatData(data) {
      return data;
    },
    getData(page = 1) {
      const thisIns = this;
      thisIns.$store.dispatch("registersAttendance/updateTable", {
        registersAttendance: [],
        pagination: null
      });
      const url = `branches/${this.branch_id}/courses/${this.courseId}/attendances/${this.attendanceId}`;
      thisIns.$vs.loading({ color: "#7367F0", text: "Loading..." });
      this.$http
        .get(url, {
          params: {
            page: page,
            search: this.searchTerm,
            orderBy: this.order.orderBy,
            sortedBy: this.order.orderType
          }
        })
        .then(function(response) {
          thisIns.$store.dispatch("registersAttendance/updateTable", {
            registersAttendance: thisIns.formatData(response.data.data.items),
            pagination: null
          });
        })
        .catch(function(error) {
          thisIns.$vs.notify({
            title: "Đã xảy ra lỗi",
            text: error,
            color: "danger",
            iconPack: "feather",
            icon: "icon-alert-circle"
          });
        })
        .finally(function() {
          thisIns.$vs.loading.close();
        });
    },
    handleSearch(searching) {
      if (!this.needReload) {
        this.$store.dispatch("registersAttendance/updateNeedReload", true);
        return false;
      }
      let thisInt = this;
      this.$store.dispatch("registersAttendance/updateSearch", {
        searchTerm: searching
      });
      clearTimeout(this.timer);
      this.timer = setTimeout(function() {
        thisInt.getData();
      }, 500);
    },
    handleSort(key, active) {
      this.$store.dispatch("registersAttendance/updateOrder", {
        order: {
          orderBy: key,
          orderType: active ? "desc" : "asc"
        }
      });
      this.getData(this.pagination.currentPage);
    }
  },
  mounted() {
    this.$refs.table.searchx = this.searchTerm;
    this.isMounted = true;
    if (this.registersAttendance.length === 0) {
      this.getData();
    }
  },
  destroyed() {
    this.$store.dispatch("registersAttendance/updateNeedReload", false);
  }
};
</script>

<style lang="scss">
#data-list-list-view {
  .vs-con-table {
    .vs-table--header {
      display: flex;
      flex-wrap: wrap-reverse;
      margin-left: 1.5rem;
      margin-right: 1.5rem;
      > span {
        display: flex;
        flex-grow: 1;
      }

      .vs-table--search {
        padding-top: 0;

        .vs-table--search-input {
          padding: 0.9rem 2.5rem;
          font-size: 1rem;

          & + i {
            left: 1rem;
          }

          &:focus + i {
            left: 1rem;
          }
        }
      }
    }

    .vs-table {
      border-collapse: separate;
      border-spacing: 0 1.3rem;
      padding: 0 1rem;

      tr {
        box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.05);
        td {
          padding: 20px;
          &:first-child {
            border-top-left-radius: 0.5rem;
            border-bottom-left-radius: 0.5rem;
          }
          &:last-child {
            border-top-right-radius: 0.5rem;
            border-bottom-right-radius: 0.5rem;
          }
        }
        td.td-check {
          padding: 20px !important;
        }
      }
    }

    .vs-table--thead {
      th {
        padding-top: 0;
        padding-bottom: 0;

        .vs-table-text {
          text-transform: uppercase;
          font-weight: 600;
        }
      }
      th.td-check {
        padding: 0 15px !important;
      }
      tr {
        background: none;
        box-shadow: none;
      }
    }

    .vs-table--pagination {
      justify-content: center;
    }
  }
}
.d-flex-span {
  span {
    display: flex;
    button {
      margin: 3px;
    }
  }
}
.active.vs-radio-success {
  .vs-radio--circle {
    background: rgba(var(--vs-success), 1);
    box-shadow: 0 3px 12px 0 rgba(var(--vs-success), 0.4);
    transform: scale(1);
    opacity: 1;
  }
}
.active.vs-radio-warning {
  .vs-radio--circle {
    background: rgba(var(--vs-warning), 1);
    box-shadow: 0 3px 12px 0 rgba(var(--vs-warning), 0.4);
    transform: scale(1);
    opacity: 1;
  }
}
.active.vs-radio-danger {
  .vs-radio--circle {
    background: rgba(var(--vs-danger), 1);
    box-shadow: 0 3px 12px 0 rgba(var(--vs-danger), 0.4);
    transform: scale(1);
    opacity: 1;
  }
}
</style>

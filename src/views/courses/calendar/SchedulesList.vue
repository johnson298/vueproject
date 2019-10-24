<template>
  <div id="data-list-list-view" class="data-list-container">
    <edit-calendar
      v-if="editCalendar"
      :active.sync="editCalendar"
      :callback="getData"
      @closeEdit="editCalendar = $event"
      :dataInfo="scheduleGetInfo"
    />
    <add-calendar
      v-if="addCalendar"
      :active.sync="addCalendar"
      :callback="getData"
      @closeAdd="addCalendar = $event"
    />
    <vs-table-custom
      :sst="true"
      ref="table"
      multiple
      v-model="selected"
      @search="handleSearch"
      @sort="handleSort"
      :data="calendarList"
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
          <!-- ADD NEW -->
          <div
            class="p-3 mb-4 mr-4 rounded-lg cursor-pointer flex items-center justify-between text-lg font-medium text-base text-primary border border-solid border-primary"
            @click="addCalendar = true"
          >
            <feather-icon icon="PlusIcon" svgClasses="h-4 w-4" />
            <span class="ml-2 text-base text-primary">Thêm lịch học</span>
          </div>
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
          <vs-td v-if="views.name.viewable">
            <p class="product-name">{{ tr.title }}</p>
          </vs-td>

          <vs-td v-if="views.joins.viewable">
            <ul class="users-liked user-list">
              <li v-for="(teachers, userIndex) in tr.joins" :key="userIndex">
                <vx-tooltip
                  :text="`${teachers.user.name} (${teachers.user.email})`"
                  position="bottom"
                >
                  <vs-avatar
                    :src="teachers.user.avatar"
                    size="30px"
                    class="border-2 border-white border-solid -m-1"
                  ></vs-avatar>
                </vx-tooltip>
              </li>
            </ul>
          </vs-td>

          <vs-td v-if="views.start_and_end.viewable">
            <p>Từ {{ tr.start_at }}</p>
            <p>Đến {{ tr.end_at }}</p>
          </vs-td>

          <vs-td v-if="views.date.viewable">
            <p>Từ {{ tr.from_date }}</p>
            <p>Đến {{ tr.to_date }}</p>
          </vs-td>

          <vs-td v-if="views.except_date.viewable">
            <p class="product-category" v-for="item in tr.except_date" :key="item">{{ item }},&nbsp;</p>
          </vs-td>

          <vs-td v-if="views.weekdays.viewable">
            <span
              v-for="item in weekdays"
              :key="item"
            >{{ tr[item]? convertWeekdays(item) + ',' : '' }}</span>
          </vs-td>

          <vs-td v-if="views.note.viewable">
            <p class="product-category">{{ tr.note }}</p>
          </vs-td>

          <vs-td v-if="views.created_at.viewable">
            <p class="product-category">{{ tr.created_at }}</p>
          </vs-td>

          <vs-td v-if="views.updated_at.viewable">
            <p class="product-category">{{ tr.updated_at }}</p>
          </vs-td>

          <vs-td v-if="views.action.viewable" class="d-flex-span">
            <vs-button
              radius
              color="primary"
              size="small"
              @click="detailSchedule(tr.id)"
              class="vs-component vs-button vs-button-primary vs-button-filled includeIcon includeIconOnly small"
            >
              <i class="feather icon-edit"></i>
            </vs-button>
            <vs-button
              radius
              color="danger"
              size="small"
              @click="deleteSchedule(tr)"
              icon="delete_forever"
            ></vs-button>
          </vs-td>
        </vs-tr>
      </template>
    </vs-table-custom>
  </div>
</template>

<script>
import EditCalendar from "./EditCalendar.vue";
import AddCalendar from "./AddCalendar.vue";
import { mapState } from "vuex";

export default {
  components: {
    "edit-calendar": EditCalendar,
    AddCalendar
  },
  data: function() {
    return {
      addCalendar: false,
      courseId: this.$route.params.course,
      scheduleGetInfo: null,
      editCalendar: false,
      weekdays: [
        "monday",
        "tuesday",
        "wednesday",
        "thursday",
        "friday",
        "saturday",
        "sunday"
      ],
      timer: null,
      selected: [],
      isMounted: false
    };
  },
  computed: {
    ...mapState("calendar", [
      "calendarList",
      "pagination",
      "searchTerm",
      "order",
      "views",
      "needReload"
    ]),
    branchId() {
      return this.$store.state.getBranchId;
    }
  },
  methods: {
    detailSchedule(id) {
      var vm = this;
      vm.$vs.loading({ color: "#1E6DB5", text: "Loading..." });
      this.$http
        .get(
          `branches/${this.branchId}/courses/${this.courseId}/schedules/${id}`
        )
        .then(function(response) {
          if (response.data.data.id) {
            vm.scheduleGetInfo = response.data.data;
          }
        })
        .finally(function() {
          vm.editCalendar = true;
          vm.$vs.loading.close();
        });
    },
    deleteSchedule(sche) {
      this.$vs.dialog({
        type: "confirm",
        color: "danger",
        title: `Xóa lịch học`,
        text: "Bạn có chắc muốn xóa lịch " + sche.title,
        accept: this.scheduleAlert,
        parameters: [sche.id]
      });
    },
    scheduleAlert(id) {
      this.$http
        .delete(
          `branches/${this.branchId}/courses/${this.courseId}/schedules/${id}`
        )
        .then(() => {
          this.$vs.notify({
            color: "success",
            title: "Xóa lịch",
            text: "Xóa thành công",
            icon: "verified_user"
          });
          this.getData();
        })
        .catch(() => {
          this.$vs.notify({
            title: "Error!",
            text: "Bạn không xóa thành công",
            iconPack: "feather",
            icon: "fa fa-lg fa-exclamation-triangle",
            color: "danger"
          });
        });
    },
    updateViews(index, e) {
      this.$store.dispatch("calendar/updateViews", {
        index: index,
        viewable: e.target.checked
      });
    },
    formatData(data) {
      return data;
    },
    getData(page = 1) {
      const thisIns = this;
      thisIns.$vs.loading({ color: "#1E6DB5", text: "Loading..." });
      this.$http
        .get(`branches/${this.branchId}/courses/${this.courseId}/schedules`, {
          params: {
            page: page,
            search: this.searchTerm,
            orderBy: this.order.orderBy,
            sortedBy: this.order.orderType
          }
        })
        .then(function(response) {
          thisIns.$store.dispatch("calendar/updateTable", {
            calendarList: thisIns.formatData(response.data.data),
            pagination: response.data.pagination
          });
        })
        .catch(function(error) {
          thisIns.$vs.notify({
            title: "Error",
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
        this.$store.dispatch("calendar/updateNeedReload", true);
        return false;
      }
      let thisInt = this;
      this.$store.dispatch("calendar/updateSearch", {
        searchTerm: searching
      });
      clearTimeout(this.timer);
      this.timer = setTimeout(function() {
        thisInt.getData();
      }, 500);
    },
    handleSort(key, active) {
      this.$store.dispatch("calendar/updateOrder", {
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
    if (this.calendarList.length === 0) {
      this.getData();
    }
  },
  created() {
    this.getData();
  },
  destroyed() {
    this.$store.dispatch("calendar/updateNeedReload", false);
  },
  watch: {
    branchId() {
      this.getData();
      this.$store.dispatch("calendar/updateNeedReload", true);
    }
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
.vdp-datepicker.picker-custom input {
  width: 100% !important;
}
header.header-table.vs-table--header {
  margin-left: 2px !important;
}
</style>

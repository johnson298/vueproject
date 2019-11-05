<template>
  <div id="data-list-list-view" class="data-list-container">
    <ul class="d-flex my-5">
      <li class="ml-5">
        <vs-radio v-model="emp" vs-value="Lớp hoạt động">Lớp đang hoạt động</vs-radio>
      </li>
      <li class="ml-5">
        <vs-radio v-model="emp" vs-value="Lớp hoạt động">Lớp chờ mở</vs-radio>
      </li>
      <li class="ml-5">
        <vs-radio v-model="emp" vs-value="Đã nghỉ">Đã nghỉ</vs-radio>
      </li>
    </ul>
    <vs-table-custom
      :sst="true"
      ref="table"
      multiple
      v-model="selected"
      @search="handleSearch"
      @sort="handleSort"
      :data="courses1"
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
              <span class="mr-2">Xem</span>
              <feather-icon icon="ChevronDownIcon" svgClasses="h-4 w-4" />
            </div>

            <vs-dropdown-menu>
              <div class="col p-2">
                <div v-for="(value, index) in viewsCourses" :key="index" class="p-1">
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
          v-for="(value, index) in viewsCourses"
          :key="index"
          v-if="value.viewable"
        >{{ value.text }}</vs-th>
      </template>

      <template slot-scope="{data}">
        <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data" class="col">
          <vs-td v-if="viewsCourses.name.viewable">
            <p class="product-name font-medium">{{ tr.name }}</p>
          </vs-td>

          <vs-td v-if="viewsCourses.price.viewable">
            <p class="product-category">{{ formatPrice(tr.price) }}</p>
          </vs-td>

          <vs-td v-if="viewsCourses.program_id.viewable">
            <p class="product-category">{{ tr.program_id }}</p>
          </vs-td>

          <vs-td v-if="viewsCourses.start_at.viewable">
            <p class="product-category">{{ tr.start_at }}</p>
          </vs-td>

          <vs-td v-if="viewsCourses.end_at.viewable">
            <p class="product-category">{{ tr.end_at }}</p>
          </vs-td>

          <vs-td v-if="viewsCourses.progress.viewable">
            <span>{{ tr.progress }}/{{ tr.number_of_lessons }}</span>
            <vs-progress
              :percent="tr.progress*100/tr.number_of_lessons"
              :color="(tr.progress*100/tr.number_of_lessons<100)?'primary':'success'"
            ></vs-progress>
          </vs-td>

          <vs-td v-if="viewsCourses.status.viewable">
            <p class="product-category">
              <vs-chip
                :color="checkStatus(statusCourse,tr.status)=='Mở' ? 'warning'
                      : checkStatus(statusCourse,tr.status)=='Hoạt động' ? 'primary'
                      : checkStatus(statusCourse,tr.status)=='Hoàn thành' ? 'success'
                      : 'danger'"
              >{{ checkStatus(statusCourse,tr.status) }}</vs-chip>
            </p>
          </vs-td>

          <vs-td v-if="viewsCourses.created_at.viewable">
            <p class="product-category">{{ tr.created_at }}</p>
          </vs-td>

          <vs-td v-if="viewsCourses.updated_at.viewable">
            <p class="product-category">{{ tr.updated_at }}</p>
          </vs-td>
        </vs-tr>
      </template>
    </vs-table-custom>
    <div class="con-vs-pagination vs-pagination-primary">
      <nav class="vs-pagination--nav">
        <paginate
          :page-count="paginationCourses.totalPages"
          :page-range="3"
          :margin-pages="2"
          :active-class="'is-current'"
          :container-class="'vs-pagination--ul'"
          :page-class="'item-pagination vs-pagination--li'"
          :prev-text="prev"
          :next-text="next"
          :click-handler="getData"
          :value="paginationCourses.currentPage"
          ref="paginate"
        />
      </nav>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      itemsPerPage: "Tuần",
      emp: "Lớp đang mở",
      statusCourse: this.$store.state.model.courses.status,
      activeConfirm: false,
      timer: null,
      selected: [],
      isMounted: false,
      addNewDataSidebar: false,
      prev:
        '<button class="vs-pagination--buttons btn-prev-pagination vs-pagination--button-prev"><i class="vs-icon notranslate icon-scale material-icons null">chevron_left</i></button>',
      next:
        '<button class="vs-pagination--buttons btn-prev-pagination vs-pagination--button-next"><i class="vs-icon notranslate icon-scale material-icons null">chevron_right</i></button>',
      courses1: [
        {
          id: 1,
          program_id: 1,
          branch_id: 1,
          name: "Et enim nihil incidunt.",
          start_at: "2019-11-03",
          end_at: "2019-12-03",
          price: 3760000,
          status: 1,
          progress: 0,
          number_of_lessons: 31,
          created_at: "2019-11-03 22:04:42",
          updated_at: "2019-11-03 22:04:42"
        }
      ]
    };
  },
  computed: {
    ...mapState("reports", [
      "courses",
      "paginationCourses",
      "searchTermCourses",
      "orderCourses",
      "viewsCourses",
      "needReloadCourses"
    ])
  },
  methods: {
    deleteEmployee(user) {
      this.$vs.dialog({
        type: "confirm",
        color: "danger",
        title: `Xóa nhân viên`,
        text: "Bạn có chắc muốn xóa " + user.name,
        accept: this.employeeAlert,
        parameters: [user.id]
      });
    },
    employeeAlert(user_id) {
      this.$http
        .delete("users/" + user_id)
        .then(() => {
          this.$vs.notify({
            color: "success",
            title: "Xóa nhân viên",
            text: "Bạn đã xóa thành công",
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
      this.$store.dispatch("reports/updateViewsCourses", {
        index: index,
        viewable: e.target.checked
      });
    },
    formatData(data) {
      return data;
    },
    getData(page = 1) {
      const thisIns = this;
      thisIns.$vs.loading({
        color: "#7367F0",
        text: "Loading..."
      });
      this.$http
        .get("users", {
          params: {
            page: page,
            search: this.searchTerm,
            orderBy: this.order.orderBy,
            sortedBy: this.order.orderType
          }
        })
        .then(function(response) {
          thisIns.$store.dispatch("reports/updateTableCourses", {
            courses: thisIns.formatData(response.data.data),
            paginationCourses: response.data.pagination
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
        this.$store.dispatch("reports/updateNeedReloadCourses", true);
        return false;
      }
      let thisInt = this;
      this.$store.dispatch("reports/updateSearchCourses", {
        searchTerm: searching
      });
      clearTimeout(this.timer);
      this.timer = setTimeout(function() {
        thisInt.getData();
      }, 500);
    },
    handleSort(key, active) {
      this.$store.dispatch("reports/updateOrderCourses", {
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
  },
  destroyed() {
    this.$store.dispatch("reports/updateNeedReloadCourses", false);
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
        vertical-align: middle;

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
</style>

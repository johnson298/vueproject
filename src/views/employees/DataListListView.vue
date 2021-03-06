<template>
  <div id="data-list-list-view" class="data-list-container">
    <add-new-data-sidebar
      :isSidebarActive="addNewDataSidebar"
      @closeSidebar="addNewDataSidebar = false"
      :callback="getData"
    />

    <vs-table-custom
      :sst="true"
      ref="table"
      multiple
      v-model="selected"
      @search="handleSearch"
      @sort="handleSort"
      :data="users"
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
            @click="addNewDataSidebar = true"
          >
            <feather-icon icon="Upload" svgClasses="h-4 w-4" />
            <span class="ml-2 text-base text-primary">Thêm nhân viên</span>
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
          <vs-td v-if="views.code.viewable">{{ tr.code }}</vs-td>
          <vs-td v-if="views.avatar.viewable">
            <vs-avatar size="55px" :src="tr.avatar" :alt="tr.name" />
          </vs-td>
          <vs-td v-if="views.name.viewable">{{ tr.name }}</vs-td>
          <vs-td v-if="views.position.viewable">
              <vs-chip
                :color="checkStatus(positions,tr.position)==='Giáo viên' ? 'primary'
                      : checkStatus(positions,tr.position)==='Marketing' ? 'warning'
                      : checkStatus(positions,tr.position)==='Kế toán' ? '#34495e'
                      : checkStatus(positions,tr.position)==='Quản lý' ? 'success'
                      : ''"
              >{{ checkStatus(positions,tr.position) }}</vs-chip>
          </vs-td>
          <vs-td v-if="views.email.viewable">{{ tr.email }}</vs-td>
          <vs-td v-if="views.birthday.viewable">{{ tr.birthday }}</vs-td>
          <vs-td v-if="views.phone.viewable">{{ tr.phone }}</vs-td>
          <vs-td v-if="views.facebook.viewable"><a :href="tr.facebook" target="_blank">Link</a></vs-td>
          <vs-td v-if="views.address.viewable">{{ tr.address }}</vs-td>
          <vs-td v-if="views.status.viewable">
            <vs-chip
              :color="checkStatusFrom0(statusEmployee,tr.status)==='Hoạt động' ? 'success'
                      : 'danger'"
            >{{ checkStatusFrom0(statusEmployee,tr.status) }}</vs-chip>
          </vs-td>
          <vs-td v-if="views.updated_at.viewable">{{ tr.updated_at }}</vs-td>
          <vs-td v-if="views.created_at.viewable">{{ tr.created_at }}</vs-td>
          <vs-td v-if="views.action.viewable" class="d-flex-span">
            <router-link
              tag="button"
              :to="'/employees/' + tr.id "
              class="vs-component vs-button vs-button-primary vs-button-filled includeIcon includeIconOnly vs-radius small"
            >
              <i class="feather icon-eye"></i>
            </router-link>
            <!-- <vs-button
              radius
              color="danger"
              size="small"
              @click="deleteEmployee(tr)"
              icon="delete_forever"
            ></vs-button> -->
          </vs-td>
        </vs-tr>
      </template>
    </vs-table-custom>
    <div class="con-vs-pagination vs-pagination-primary">
      <nav class="vs-pagination--nav">
        <paginate
          :page-count="pagination.totalPages"
          :page-range="3"
          :margin-pages="2"
          :active-class="'is-current'"
          :container-class="'vs-pagination--ul'"
          :page-class="'item-pagination vs-pagination--li'"
          :prev-text="prev"
          :next-text="next"
          :click-handler="getData"
          :value="pagination.currentPage"
          ref="paginate"
        />
      </nav>
    </div>
  </div>
</template>

<script>
import AddNewDataSidebar from "./AddNewDataSidebar.vue";
import { mapState } from "vuex";

export default {
  components: {
    AddNewDataSidebar
  },
  data() {
    return {
      positions: this.$store.state.model.employees.positions,
      activeConfirm: false,
      timer: null,
      selected: [],
      isMounted: false,
      addNewDataSidebar: false,
      prev:
        '<button class="vs-pagination--buttons btn-prev-pagination vs-pagination--button-prev"><i class="vs-icon notranslate icon-scale material-icons null">chevron_left</i></button>',
      next:
        '<button class="vs-pagination--buttons btn-prev-pagination vs-pagination--button-next"><i class="vs-icon notranslate icon-scale material-icons null">chevron_right</i></button>'
    };
  },
  computed: {
    ...mapState("employees", [
      "users",
      "pagination",
      "searchTerm",
      "order",
      "views",
      "needReload"
    ]),
    statusEmployee() {
      return this.$store.state.model.employees.status;
    },
    branchId() {
      return this.$store.state.getBranchId;
    }
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
        .delete(`branches/${this.branchId}/users/` + user_id)
        .then(() => {
          this.$vs.notify({
            color: "success",
            title: "Xóa nhân viên",
            text: "Bạn đã xóa thành công",
            icon: "verified_user"
          });
          this.getData();
        })
        .catch(error => {
          let thisIns = this;
          thisIns.checkResponRequest(error.response.data, null, null, 'Xóa không thành công');
        });
    },
    updateViews(index, e) {
      this.$store.dispatch("employees/updateViews", {
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
        color: "#1E6DB5",
        text: "Loading..."
      });
      this.$http
        .get(`branches/${this.branchId}/users`, {
          params: {
            page: page,
            search: this.searchTerm,
            orderBy: this.order.orderBy,
            sortedBy: this.order.orderType
          }
        })
        .then(function(response) {
          thisIns.$store.dispatch("employees/updateTable", {
            users: thisIns.formatData(response.data.data),
            pagination: response.data.pagination
          });
        })
        .catch(function(error) {
          thisIns.checkResponRequest(error.response.data);
        })
        .finally(function() {
          thisIns.$vs.loading.close();
        });
    },
    handleSearch(searching) {
      if (!this.needReload) {
        this.$store.dispatch("employees/updateNeedReload", true);
        return false;
      }
      let thisInt = this;
      this.$store.dispatch("employees/updateSearch", {
        searchTerm: searching
      });
      clearTimeout(this.timer);
      this.timer = setTimeout(function() {
        thisInt.getData();
      }, 500);
    },
    handleSort(key, active) {
      this.$store.dispatch("employees/updateOrder", {
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
  created() {
    this.getData();
  },
  destroyed() {
    this.$store.dispatch("employees/updateNeedReload", false);
  },
  watch: {
    branchId() {
      this.getData();
      this.$store.dispatch("courses/updateNeedReload", true);
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

.import-file {
  .custom-file-upload {
    border: 1px solid #ccc;
    display: inline-block;
    padding: 6px 12px;
    cursor: pointer;
  }

  input[type="file"] {
    display: none;
  }
}
</style>

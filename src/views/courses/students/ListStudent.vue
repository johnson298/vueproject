<template>
  <div id="data-list-list-view" class="data-list-container">
    <vs-popup
      fullscreen
      classContent="popup-example"
      title="Thêm học viên vào lớp học"
      :active.sync="popupAllstudent"
    >
      <GetAllStudents :active.sync="popupAllstudent" :callback="getData" />
    </vs-popup>
    <vs-table-custom
      :sst="true"
      ref="table"
      multiple
      v-model="selected"
      @search="handleSearch"
      @sort="handleSort"
      :data="registers"
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
            @click="popupAllstudent=true"
          >
            <feather-icon icon="PlusIcon" svgClasses="h-4 w-4" />
            <span class="ml-2 text-base text-primary">Thêm học viên</span>
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
            <p class="product-category">{{ tr.student.note }}</p>
          </vs-td>

          <vs-td v-if="views.updated_at.viewable">
            <p class="product-category">{{ tr.student.updated_at }}</p>
          </vs-td>

          <vs-td v-if="views.created_at.viewable">
            <p class="product-category">{{ tr.student.created_at }}</p>
          </vs-td>

          <vs-td v-if="views.action.viewable" class="d-flex-span">
            <router-link
              tag="button"
              :to="'/students/' + tr.student.id "
              class="vs-component vs-button vs-button-primary vs-button-filled includeIcon includeIconOnly vs-radius small"
            >
              <i class="feather icon-eye"></i>
            </router-link>
            <vs-button radius color="danger" size="small" @click="deleteStudent(tr)" icon="delete_forever"></vs-button>
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
import GetAllStudents from "./GetAllStudents";
import { mapState } from "vuex";

export default {
  components: {
    GetAllStudents
  },
  data() {
    return {
      popupAllstudent: false,
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
    ...mapState("registers", [
      "registers",
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
    deleteStudent(user) {
      this.$vs.dialog({
        type: "confirm",
        color: "danger",
        title: `Xóa học viên`,
        text: "Bạn có chắc muốn xóa " + user.student.name,
        accept: this.studentAlert,
        parameters: [user.id]
      });
    },
    studentAlert(user_id) {
      this.$http
        .delete(
          `branches/${this.branch_id}/courses/${this.$route.params.course}/registers/${user_id}`
        )
        .then(() => {
          this.$vs.notify({
            color: "success",
            title: "Xóa học viên",
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
      this.$store.dispatch("registers/updateViews", {
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
        .get(
          `branches/${this.branch_id}/courses/${this.$route.params.course}/registers`,
          {
            params: {
              page: page,
              search: this.searchTerm,
              orderBy: this.order.orderBy,
              sortedBy: this.order.orderType
            }
          }
        )
        .then(function(response) {
          thisIns.$store.dispatch("registers/updateTable", {
            registers: thisIns.formatData(response.data.data),
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
        this.$store.dispatch("registers/updateNeedReload", true);
        return false;
      }
      let thisInt = this;
      this.$store.dispatch("registers/updateSearch", {
        searchTerm: searching
      });
      clearTimeout(this.timer);
      this.timer = setTimeout(function() {
        thisInt.getData();
      }, 500);
    },
    handleSort(key, active) {
      this.$store.dispatch("registers/updateOrder", {
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
    if (this.registers.length === 0) {
      this.getData();
    }
  },
  destroyed() {
    this.$store.dispatch("registers/updateNeedReload", false);
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
</style>

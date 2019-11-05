<template>
  <div id="data-list-list-view" class="data-list-container">
    <ul class="d-flex my-5">
      <li class="ml-5">
        <vs-radio v-model="emp" vs-value="Đang hoạt động">Thu</vs-radio>
      </li>
      <li class="ml-5">
        <vs-radio v-model="emp" vs-value="Đã nghỉ">Chi</vs-radio>
      </li>
    </ul>
    <vs-table-custom
      :sst="true"
      ref="table"
      multiple
      v-model="selected"
      @search="handleSearch"
      @sort="handleSort"
      :data="invoices"
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
                <div v-for="(value, index) in viewsMoney" :key="index" class="p-1">
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
          v-for="(value, index) in viewsMoney"
          :key="index"
          v-if="value.viewable"
        >{{ value.text }}</vs-th>
      </template>
      <template slot-scope="{data}">
        <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data" class="col">
          <vs-td v-if="viewsMoney.id.viewable">
            <p class="product-category">{{ tr.id }}</p>
          </vs-td>

          <vs-td v-if="viewsMoney.student_id.viewable">
            <p class="product-category">{{ tr.student_id }}</p>
          </vs-td>

          <vs-td v-if="viewsMoney.student_avatar.viewable">
            <vs-avatar size="55px" :src="tr.student.avatar" :alt="tr.student.name" />
          </vs-td>

          <vs-td v-if="viewsMoney.student_name.viewable">
            <p class="product-category">{{ tr.student.name }}</p>
          </vs-td>

          <vs-td v-if="viewsMoney.amount.viewable">
            <p class="product-category">{{ formatPrice(tr.amount) }}</p>
          </vs-td>

          <vs-td v-if="viewsMoney.note.viewable">
            <p class="product-category">{{ tr.note }}</p>
          </vs-td>

          <vs-td v-if="viewsMoney.source.viewable">
            <p class="product-category">
              <vs-chip
                :color="checkStatus(sourceInvoices,tr.source)=='Momo' ? 'primary'
                              : checkStatus(sourceInvoices,tr.source)=='Tiền mặt' ? 'success'
                              : checkStatus(sourceInvoices,tr.source)=='Chuyển khoản' ? 'warning'
                              : ''"
              >{{ checkStatus(sourceInvoices,tr.source) }}</vs-chip>
            </p>
          </vs-td>

          <vs-td v-if="viewsMoney.updated_at.viewable">
            <p class="product-category">{{ tr.updated_at }}</p>
          </vs-td>

          <vs-td v-if="viewsMoney.created_at.viewable">
            <p class="product-category">{{ tr.created_at }}</p>
          </vs-td>
        </vs-tr>
      </template>
    </vs-table-custom>
    <div class="con-vs-pagination vs-pagination-primary">
      <nav class="vs-pagination--nav">
        <paginate
          :page-count="paginationMoney.totalPages"
          :page-range="3"
          :margin-pages="2"
          :active-class="'is-current'"
          :container-class="'vs-pagination--ul'"
          :page-class="'item-pagination vs-pagination--li'"
          :prev-text="prev"
          :next-text="next"
          :click-handler="getData"
          :value="paginationMoney.currentPage"
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
      emp: "Được thêm mới",
      sourceInvoices: this.$store.state.model.invoices.source,
      activeConfirm: false,
      timer: null,
      selected: [],
      isMounted: false,
      addNewDataSidebar: false,
      prev:
        '<button class="vs-pagination--buttons btn-prev-pagination vs-pagination--button-prev"><i class="vs-icon notranslate icon-scale material-icons null">chevron_left</i></button>',
      next:
        '<button class="vs-pagination--buttons btn-prev-pagination vs-pagination--button-next"><i class="vs-icon notranslate icon-scale material-icons null">chevron_right</i></button>',
      invoices: [
        {
          id: 1,
          type: 1,
          branch_id: 1,
          user_id: 1,
          course_id: 474,
          student_id: 1814,
          amount: 1000000,
          note: null,
          source: 3,
          date: "2019-11-04",
          created_at: "2019-11-04 11:29:56",
          updated_at: "2019-11-04 11:29:56",
          deleted_at: null,
          student: {
            id: 1814,
            user_id: null,
            branch_id: 6,
            code: "HV-01814",
            name: "Thịnh Hạ",
            status: null,
            email: "huyen33@example.org",
            birthday: "2009-06-21",
            gender: 0,
            facebook:
              "http://dong.pro.vn/voluptas-ullam-tenetur-sunt-doloribus-non-incidunt",
            phone: "0122-259-4338",
            address:
              "091 Phố Đào Dân Việt, Phường Hà, Quận Kính Nhuận\nHồ Chí Minh",
            school: "Khương and Sons",
            class: "and Sons",
            source: 3,
            note:
              "Sunt commodi possimus aperiam ipsam facere iusto. Mollitia sit inventore provident esse quo blanditiis. Voluptates autem non et quidem voluptate. Aperiam ducimus nisi sunt iste delectus.",
            metadata: null,
            email_verified_at: "2019-11-03 22:04:33",
            total_amount: 10157000,
            paid: 9883000,
            created_at: "2019-11-03 22:04:42",
            updated_at: "2019-11-05 10:15:48",
            deleted_at: null,
            avatar: "http://apiedu.itsvnweb.com/images/default.png"
          },
          course: {
            id: 474,
            program_id: 24,
            branch_id: 1,
            name: "Aliquid ut temporibus fugit autem omnis aut.",
            start_at: "2019-11-03",
            end_at: "2019-12-03",
            price: 5274000,
            status: 1,
            progress: 5,
            number_of_lessons: 27,
            created_at: "2019-11-03 22:04:42",
            updated_at: "2019-11-05 11:25:19",
            deleted_at: null
          },
          user: {
            id: 1,
            branch_id: null,
            code: "00001",
            name: "Administrator",
            email: "admin@crm.local",
            status: 1,
            birthday: null,
            gender: 0,
            facebook: null,
            phone: null,
            address: null,
            major: 0,
            level: 1,
            note: null,
            metadata: null,
            position: 5,
            email_verified_at: "2019-11-03 22:04:11",
            created_at: "2019-11-03 22:04:11",
            updated_at: "2019-11-03 22:04:11",
            deleted_at: null,
            avatar: "http://apiedu.itsvnweb.com/images/default.png"
          }
        }
      ]
    };
  },
  computed: {
    ...mapState("reports", [
      "money",
      "paginationMoney",
      "searchTermMoney",
      "orderMoney",
      "viewsMoney",
      "needReloadMoney"
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
      this.$store.dispatch("reports/updateViewsMoney", {
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
          thisIns.$store.dispatch("reports/updateTableMoney", {
            users: thisIns.formatData(response.data.data),
            paginationMoney: response.data.pagination
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
        this.$store.dispatch("reports/updateNeedReloadMoney", true);
        return false;
      }
      let thisInt = this;
      this.$store.dispatch("reports/updateSearchMoney", {
        searchTerm: searching
      });
      clearTimeout(this.timer);
      this.timer = setTimeout(function() {
        thisInt.getData();
      }, 500);
    },
    handleSort(key, active) {
      this.$store.dispatch("reports/updateOrderMoney", {
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
    this.$store.dispatch("reports/updateNeedReloadMoney", false);
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

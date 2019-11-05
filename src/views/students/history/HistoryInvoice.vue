<template>
  <div id="data-list-list-view" class="data-list-container">
    <vs-table-custom
      :sst="true"
      ref="table"
      multiple
      v-model="selected"
      @search="handleSearch"
      @sort="handleSort"
      :data="studentsInvoice"
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
                <div v-for="(value, index) in viewsInvoice" :key="index" class="p-1">
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
          v-for="(value, index) in viewsInvoice"
          :key="index"
          v-if="value.viewable"
        >{{ value.text }}</vs-th>
      </template>
      <template slot-scope="{data}">
        <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data" class="col">
          <vs-td v-if="viewsInvoice.course.viewable">
            <p class="product-category">{{ tr.course.name }}</p>
          </vs-td>

          <vs-td v-if="viewsInvoice.amount.viewable">
            <p class="product-category">{{ formatPrice(tr.amount) }}</p>
          </vs-td>

          <vs-td v-if="viewsInvoice.source.viewable">
            <p class="product-category">
              <vs-chip
                :color="checkStatus(sourceInvoices,tr.source)=='Momo' ? 'primary'
                              : checkStatus(sourceInvoices,tr.source)=='Tiền mặt' ? 'success'
                              : checkStatus(sourceInvoices,tr.source)=='Chuyển khoản' ? 'warning'
                              : ''"
              >{{ checkStatus(sourceInvoices,tr.source) }}</vs-chip>
            </p>
          </vs-td>

          <vs-td v-if="viewsInvoice.note.viewable">
            <p class="product-category">{{ tr.note }}</p>
          </vs-td>

          <vs-td v-if="viewsInvoice.updated_at.viewable">
            <p class="product-category">{{ tr.updated_at }}</p>
          </vs-td>

          <vs-td v-if="viewsInvoice.created_at.viewable">
            <p class="product-category">{{ tr.created_at }}</p>
          </vs-td>
        </vs-tr>
      </template>
    </vs-table-custom>
    <div class="con-vs-pagination vs-pagination-primary">
      <nav class="vs-pagination--nav">
        <paginate
          :page-count="paginationInvoice.totalPages"
          :page-range="3"
          :margin-pages="2"
          :active-class="'is-current'"
          :container-class="'vs-pagination--ul'"
          :page-class="'item-pagination vs-pagination--li'"
          :prev-text="prev"
          :next-text="next"
          :click-handler="getData"
          :value="paginationInvoice.currentPage"
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
      studentId: this.$route.params.student,
      sourceInvoices: this.$store.state.model.invoices.source,
      addBill: false,
      invoiceGetInfo: {},
      timer: null,
      selected: [],
      isMounted: false,
      prev:
        '<button class="vs-pagination--buttons btn-prev-pagination vs-pagination--button-prev"><i class="vs-icon notranslate icon-scale material-icons null">chevron_left</i></button>',
      next:
        '<button class="vs-pagination--buttons btn-prev-pagination vs-pagination--button-next"><i class="vs-icon notranslate icon-scale material-icons null">chevron_right</i></button>'
    };
  },
  computed: {
    ...mapState("students", [
      "studentsInvoice",
      "paginationInvoice",
      "searchTermInvoice",
      "orderInvoice",
      "viewsInvoice",
      "needReloadInvoice"
    ]),
    branchId() {
      return this.$store.state.getBranchId;
    }
  },
  created() {
    this.getData();
  },
  methods: {
    updateViews(index, e) {
      this.$store.dispatch("students/updateViewsInvoice", {
        index: index,
        viewableInvoice: e.target.checked
      });
    },
    formatData(data) {
      return data;
    },
    getData() {
      const thisIns = this;
      thisIns.$vs.loading({
        color: "#1E6DB5",
        text: "Loading..."
      });
      this.$http
        .get(
          `branches/${this.branchId}/invoices?type=1&search=student_id:${this.studentId}`
        )
        .then(function(response) {
          thisIns.$store.dispatch("students/updateTableInvoice", {
            studentsInvoice: thisIns.formatData(response.data.data),
            paginationInvoice: response.data.pagination
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
      if (!this.needReloadInvoice) {
        this.$store.dispatch("students/updateNeedReloadInvoice", true);
        return false;
      }
      let thisInt = this;
      this.$store.dispatch("students/updateSearchInvoice", {
        searchTermInvoice: searching
      });
      clearTimeout(this.timer);
      this.timer = setTimeout(function() {
        thisInt.getData();
      }, 500);
    },
    handleSort(key, active) {
      this.$store.dispatch("students/updateOrderInvoice", {
        orderInvoice: {
          orderBy: key,
          orderType: active ? "desc" : "asc"
        }
      });
      this.getData(this.paginationInvoice.currentPage);
    }
  },
  mounted() {
    this.$refs.table.searchx = this.searchTermInvoice;
    this.isMounted = true;
    if (this.studentsInvoice.length === 0) {
      this.getData();
    }
  },
  destroyed() {
    this.$store.dispatch("students/updateNeedReloadInvoice", false);
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

.popup-custom-768 > .vs-popup {
  width: 768px !important;
}
</style>

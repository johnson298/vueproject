<template>
  <div id="data-list-list-view" class="data-list-container">
    <vs-popup
      class="popup-custom-968"
      title="Thêm mới hóa đơn"
      :active.sync="addBill"
      v-if="addBill"
    >
      <AddInvoice :callback="getData" :active.sync="addBill" @closeInvoice="addBill = $event" />
    </vs-popup>

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
            @click="addBill=true"
          >
            <feather-icon icon="PlusIcon" svgClasses="h-4 w-4" />
            <span class="ml-2 text-base text-primary">Thêm hóa đơn</span>
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
          <vs-td v-if="views.id.viewable">{{ tr.id }}</vs-td>
          <vs-td v-if="views.student_id.viewable">{{ tr.student_id }}</vs-td>
          <vs-td v-if="views.student_avatar.viewable">
            <vs-avatar size="55px" :src="tr.student.avatar" :alt="tr.student.name" />
          </vs-td>
          <vs-td v-if="views.student_name.viewable">{{ tr.student.name }}</vs-td>
          <vs-td v-if="views.amount.viewable">{{ formatPrice(tr.amount) }}</vs-td>
          <vs-td v-if="views.total.viewable">{{ formatPrice(tr.total) }}</vs-td>
          <vs-td v-if="views.coupon.viewable">
            {{ tr.coupon ? `Mã: ${tr.coupon.coupons_code} - ${formatPrice(tr.amount_coupon)} vnđ` : 'Không có KM' }}
          </vs-td>
          <vs-td v-if="views.course.viewable">
            <router-link tag="a" :to="`/courses/${tr.course.id}`">
              {{ tr.course.name }}
            </router-link>
          </vs-td>
          <vs-td v-if="views.source.viewable">
              <vs-chip
                :color="checkStatus(sourceInvoices,tr.source)==='Momo' ? 'primary'
                              : checkStatus(sourceInvoices,tr.source)==='Tiền mặt' ? 'success'
                              : checkStatus(sourceInvoices,tr.source)==='Chuyển khoản' ? 'warning'
                              : ''"
              >{{ checkStatus(sourceInvoices,tr.source) }}</vs-chip>
          </vs-td>
          <vs-td v-if="views.note.viewable">{{ tr.note }}</vs-td>
          <vs-td v-if="views.updated_at.viewable">{{ tr.updated_at }}</vs-td>
          <vs-td v-if="views.created_at.viewable">{{ tr.created_at }}</vs-td>
          <vs-td v-if="views.action.viewable" class="d-flex-span">
            <vx-tooltip text="Gửi mail" position="top">
              <button
                @click="sendMail(tr.id)"
                name="button"
                class="vs-component vs-button vs-button-primary vs-button-filled includeIcon includeIconOnly vs-radius small" >
                <font-awesome-icon icon="envelope" />
              </button>
            </vx-tooltip>
            <vx-tooltip text="Hóa đơn (web)" position="top">
              <vs-button
                radius
                color="success"
                size="small"
                @click="printInvoice('html', tr.id)"
                icon="print"
              ></vs-button>
            </vx-tooltip>
            <vx-tooltip text="Xuất PDF" position="top">
              <button
                @click="printInvoice('pdf', tr.id)"
                name="button"
                class="vs-component vs-button vs-button-warning vs-button-filled includeIcon includeIconOnly vs-radius small"
              >
                <font-awesome-icon icon="file-pdf" />
              </button>
            </vx-tooltip>
            <vs-button
              radius
              color="danger"
              size="small"
              @click="deleteInvoice(tr)"
              icon="delete_forever"
            ></vs-button>
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
import AddInvoice from "./AddInvoice";
import { mapState } from "vuex";
const baseUrl = process.env.VUE_APP_URL;

export default {
  components: {
    AddInvoice
  },
  data() {
    return {
      idInvoice: 0,
      urlIframe: "",
      sourceInvoices: this.$store.state.model.invoices.source,
      bill: null,
      infoBill: false,
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
    ...mapState("invoices", [
      "invoices",
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
  watch: {
    branchId() {
      this.getData();
    }
  },
  created() {
    this.getData();
  },
  methods: {
    sendMail(id) {
      this.$vs.loading({
        color: "#1E6DB5",
        text: "Loading..."
      });
      this.$http
        .post(`branches/${this.branchId}/invoices/${id}/mail`)
        .then(() => {
          this.$vs.notify({
            title: "Gửi thành công",
            text: "OK",
            iconPack: "feather",
            icon: "fa fa-lg fa-check-circle",
            color: "success"
          });
          this.$emit("closePopupInfo", false);
        })
        .catch(() => {
          this.$vs.notify({
            title: "Error!",
            text: "Gửi mail thất bại",
            iconPack: "feather",
            icon: "fa fa-lg fa-exclamation-triangle",
            color: "danger"
          });
        })
        .finally(() => {
          this.$vs.loading.close();
        });
    },
    printInvoice(type, invoiceId) {
      let token = localStorage.getItem("access_token");
      let vm = this;
      let url = "";
      if (type == "html") {
        url = `${baseUrl}branches/${vm.branchId}/invoices/${invoiceId}/pdf?mode=html&token=${token}`;
      }
      if (type == "pdf") {
        url = `${baseUrl}branches/${vm.branchId}/invoices/${invoiceId}/pdf?mode=pdf&token=${token}`;
      }
      vm.$vs.loading({
        color: "#1E6DB5",
        text: "Loading..."
      });
      vm.$http
        .get(url)
        .then(() => {
          window.open(url, "_blank");
        })
        .catch(() => {
          vm.$vs.notify({
            title: "Lỗi!",
            text: "Vui lòng thử lại !",
            iconPack: "feather",
            icon: "fa fa-lg fa-exclamation-triangle",
            color: "danger"
          });
        })
        .finally(function() {
          vm.$vs.loading.close();
        });
    },
    deleteInvoice(invoice) {
      this.$vs.dialog({
        type: "confirm",
        color: "danger",
        title: `Xóa hóa đơn`,
        text: "Bạn có chắc muốn xóa hóa đơn này",
        accept: this.invoiceAlert,
        parameters: [invoice.id]
      });
    },
    invoiceAlert(invoice_id) {
      this.$http
        .delete(`branches/${this.branchId}/invoices/${invoice_id}?type=1`)
        .then(() => {
          this.$vs.notify({
            color: "success",
            title: "Xóa hóa đơn",
            text: "Xóa thành công",
            icon: "verified_user"
          });
          this.getData();
        })
        .catch((error) => {
          this.checkResponRequest(error.response.data, null, null, 'Xóa thất bại');
        });
    },
    updateViews(index, e) {
      this.$store.dispatch("invoices/updateViews", {
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
        .get(`branches/${this.branchId}/invoices?type=1`, {
          params: {
            page: page,
            search: this.searchTerm,
            orderBy: this.order.orderBy,
            sortedBy: this.order.orderType
          }
        })
        .then(function(response) {
          thisIns.$store.dispatch("invoices/updateTable", {
            invoices: thisIns.formatData(response.data.data),
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
        this.$store.dispatch("invoices/updateNeedReload", true);
        return false;
      }
      let thisInt = this;
      this.$store.dispatch("invoices/updateSearch", {
        searchTerm: searching
      });
      clearTimeout(this.timer);
      this.timer = setTimeout(function() {
        thisInt.getData();
      }, 500);
    },
    handleSort(key, active) {
      this.$store.dispatch("invoices/updateOrder", {
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
    this.$store.dispatch("invoices/updateNeedReload", false);
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

<template>
  <div id="data-list-list-view" class="data-list-container">
    <vs-popup class="popup-custom-968" title="Thêm mới thông báo" :active.sync="addNew">
      <add-notification :active.sync="addNew" @closePopupInvoice="addNew = $event"></add-notification>
    </vs-popup>
    <vs-table-custom
      :sst="true"
      ref="table"
      multiple
      v-model="selected"
      @search="handleSearch"
      @sort="handleSort"
      :data="campaigns"
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
            @click="addNew = true"
          >
            <feather-icon icon="PlusIcon" svgClasses="h-4 w-4" />
            <span
              class="ml-2 text-base text-primary"
              style="color: #636363 !important;"
            >Thêm thông báo</span>
          </div>
        </div>
      </div>

      <template style="padding-left: 10px" slot="thead">
        <vs-th>Mã</vs-th>
        <vs-th>Tên thông báo</vs-th>
        <vs-th>Người tạo</vs-th>
        <vs-th>Ngày triển khai</vs-th>
        <vs-th>Phạm vi gửi</vs-th>
        <vs-th>Hành động</vs-th>
      </template>

      <template slot-scope="{data}">
        <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data" class="col">
          <vs-td v-if="data[indextr].code">
            <p class="product-name font-medium">{{ tr.code }}</p>
          </vs-td>
          <vs-td v-if="data[indextr].name">
            <p class="product-name font-medium">{{ tr.name }}</p>
          </vs-td>
          <vs-td v-if="data[indextr].name">
            <p class="product-name font-medium">{{ tr.memCreate }}</p>
          </vs-td>
          <vs-td v-if="data[indextr].schedule">
            <p class="product-name font-medium">{{ tr.schedule }}</p>
          </vs-td>
          <vs-td v-if="data[indextr].range_send">
            <p class="product-name font-medium">
              <vs-chip
                :color="checkStatus(range_send,tr.range_send)=='Toàn bộ trung tâm' ? 'warning'
                      : checkStatus(range_send,tr.range_send)=='Theo chi nhánh' ? 'success'
                      : checkStatus(range_send,tr.range_send)=='Theo chương trình học' ? 'primary'
                      : checkStatus(range_send,tr.range_send)=='Theo lớp học' ? 'danger'
                      : ''"
              >{{ checkStatus(range_send,tr.range_send) }}</vs-chip>
            </p>
          </vs-td>
          <vs-td v-if="data[indextr].updated_at">
            <p class="product-name font-medium">{{ tr.updated_at }}</p>
          </vs-td>
          <vs-td v-if="data[indextr].created_at">
            <p class="product-name font-medium">{{ tr.created_at }}</p>
          </vs-td>
          <vs-td class="d-flex-span">
            <router-link
              tag="button"
              to="/campaigns/1111"
              class="vs-component vs-button vs-button-primary vs-button-filled includeIcon includeIconOnly small vs-radius"
            >
              <i class="feather icon-eye"></i>
            </router-link>
            <vs-button
              radius
              color="danger"
              size="small"
              @click="deleteCampaign(tr)"
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
import { mapState } from "vuex";
import AddNotification from "./AddNotification.vue";

export default {
  components: {
    "add-notification": AddNotification
  },
  data() {
    return {
      addNew: false,
      campaigns: [
        {
          code: "KH-001",
          memCreate: "John Smith",
          name: "thông báo nghỉ lễ",
          schedule: "21-08-2019",
          position: 1,
          range_send: 1
        },
        {
          code: "KH-002",
          memCreate: "John Smith",
          name: "Nghỉ mùng 2/9",
          schedule: "21-08-2019",
          position: 2,
          range_send: 2
        }
      ],
      range_send: this.$store.state.model.campaign.range_send,
      position: this.$store.state.model.campaign.position,
      activeConfirm: false,
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
    ...mapState("campaign", [
      "users",
      "pagination",
      "searchTerm",
      "order",
      "views",
      "needReload"
    ])
  },
  methods: {
    deleteCampaign(user) {
      this.$vs.dialog({
        type: "confirm",
        color: "danger",
        title: `Xóa nhân viên`,
        text: "Bạn có chắc muốn xóa " + user.name,
        accept: this.campaignAlert,
        parameters: [user.id]
      });
    },
    campaignAlert(user_id) {
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
      this.$store.dispatch("campaign/updateViews", {
        index: index,
        viewable: e.target.checked
      });
    },
    formatData(data) {
      return data;
    },
    getData(page = 1) {
      const thisIns = this;
      thisIns.$vs.loading({ color: "#7367F0", text: "Loading..." });
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
          thisIns.$store.dispatch("campaign/updateTable", {
            users: thisIns.formatData(response.data.data),
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
        this.$store.dispatch("campaign/updateNeedReload", true);
        return false;
      }
      let thisInt = this;
      this.$store.dispatch("campaign/updateSearch", {
        searchTerm: searching
      });
      clearTimeout(this.timer);
      this.timer = setTimeout(function() {
        thisInt.getData();
      }, 500);
    },
    handleSort(key, active) {
      this.$store.dispatch("campaign/updateOrder", {
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
    if (this.users.length === 0) {
      this.getData();
    }
  },
  destroyed() {
    this.$store.dispatch("campaign/updateNeedReload", false);
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
<style>
#add_campaign {
  height: 46px;
  background: #ffffff;
  border-style: none !important;
  box-shadow: 2px 2px 2px 2px #dddddd;
  color: #636363 !important;
}
</style>

<template>
  <div id="data-list-list-view" class="data-list-container">

    <vs-popup class="popup-custom-968" title="Thêm mới thông báo" :active.sync="addNew">
      <add-notification
        :active.sync="addNew"
        @closePopupAdd="addNew = $event"
        v-if="addNew"
        :callback="getData" />
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
            @click="addNew = true"
          >
            <feather-icon icon="Upload" svgClasses="h-4 w-4" />
            <span class="ml-2 text-base text-primary">Thêm thông báo</span>
          </div>
        </div>
        <div class="import-file">
          <vx-tooltip text="Thêm dữ liệu" position="top">
            <label for="file-upload" class="custom-file-upload rounded-full mb-3 mr-2">
              <i class="feather icon-upload-cloud"></i>
            </label>
            <input id="file-upload" type="file" />
          </vx-tooltip>
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
          <vs-td v-if="views.title.viewable">
            <p class="font-medium">{{ tr.title }}</p>
          </vs-td>
          <vs-td v-if="views.target_id.viewable">
            <p class="font-medium">{{ tr.target_id }}</p>
          </vs-td>
          <vs-td v-if="views.user.viewable">
            <p class="font-medium">{{ tr.user.name }}</p>
          </vs-td>
          <vs-td v-if="views.schedule_at.viewable">
            <p class="font-medium">{{ tr.schedule_at }}</p>
          </vs-td>
          <vs-td v-if="views.via.viewable">
            <p class="font-medium">{{ tr.via ? tr.via.join(', ') : tr.via }}</p>
          </vs-td>
          <vs-td v-if="views.focus_on.viewable">
            <p class="font-medium">{{ tr.focus_on === 1 ? "Học viên" : "Giáo viên" }}</p>
          </vs-td>
          <vs-td v-if="views.content.viewable">
            <div v-html="tr.content"></div>
          </vs-td>
          <vs-td v-if="views.perform_at.viewable">
            <p class="font-medium">{{ tr.perform_at }}</p>
          </vs-td>
          <vs-td v-if="views.created_at.viewable">
            <p class="font-medium">{{ tr.created_at }}</p>
          </vs-td>
          <vs-td v-if="views.updated_at.viewable">
            <p class="font-medium">{{ tr.updated_at }}</p>
          </vs-td>
          <vs-td class="d-flex-span">
            <vs-button
              radius
              color="danger"
              size="small"
              @click="deleteCampaign(tr)"
              icon="delete_forever"
              v-if="!tr.perform_at"
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
  data() {
    return {
      activeConfirm: false,
      timer: null,
      selected: [],
      isMounted: false,
      addNew: false,
      prev:
        '<button class="vs-pagination--buttons btn-prev-pagination vs-pagination--button-prev"><i class="vs-icon notranslate icon-scale material-icons null">chevron_left</i></button>',
      next:
        '<button class="vs-pagination--buttons btn-prev-pagination vs-pagination--button-next"><i class="vs-icon notranslate icon-scale material-icons null">chevron_right</i></button>'
    };
  },
  components: {
    "add-notification": AddNotification
  },
  computed: {
    ...mapState("campaigns", [
      "campaigns",
      "pagination",
      "searchTerm",
      "order",
      "views",
      "needReload"
    ]),
    statusEmployee() {
      return this.$store.state.model.employees.status;
    }
  },
  methods: {
    deleteCampaign(campaign) {
      this.$vs.dialog({
        type: "confirm",
        color: "danger",
        title: `Xóa thông báo`,
        text: "Bạn có chắc muốn xóa " + campaign.title,
        accept: this.campaignAlert,
        parameters: [campaign.id]
      });
    },
    campaignAlert(id) {
      // this.$http
      //   .delete("campaigns/" + id)
      //   .then(() => {
      //     this.$vs.notify({
      //       color: "success",
      //       title: "Xóa thông báo",
      //       text: "Bạn đã xóa thành công",
      //       icon: "verified_user"
      //     });
      //     this.getData();
      //   })
      //   .catch(error => {
      //     let thisIns = this;
      //     thisIns.checkResponRequest(error.response.data, null, null, 'Xóa không thành công');
      //   });
    },
    updateViews(index, e) {
      this.$store.dispatch("campaigns/updateViews", {
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
        .get("campaigns", {
          params: {
            page: page,
            search: this.searchTerm,
            orderBy: this.order.orderBy,
            sortedBy: this.order.orderType
          }
        })
        .then(function(response) {
          thisIns.$store.dispatch("campaigns/updateTable", {
            campaigns: thisIns.formatData(response.data.data),
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
        this.$store.dispatch("campaigns/updateNeedReload", true);
        return false;
      }
      let thisInt = this;
      this.$store.dispatch("campaigns/updateSearch", {
        searchTerm: searching
      });
      clearTimeout(this.timer);
      this.timer = setTimeout(function() {
        thisInt.getData();
      }, 500);
    },
    handleSort(key, active) {
      this.$store.dispatch("campaigns/updateOrder", {
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
    this.$store.dispatch("campaigns/updateNeedReload", false);
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

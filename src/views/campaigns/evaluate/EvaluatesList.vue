<template>
  <div id="data-list-list-view" class="data-list-container">
    <vs-popup class="popup-custom-968" title="Thêm mới đánh giá" :active.sync="addNew">
      <add-evaluate
        :active.sync="addNew"
        @closePopupAdd="addNew = $event"
        v-if="addNew"
        :getInfoEvaluate="evaluateInfo"
        :callback="getData"></add-evaluate>
    </vs-popup>
    <vs-popup class="popup-custom-768" title="Chi tiết đánh giá" :active.sync="detailValuate" v-if="detailValuate">
      <detail-evaluate
        :active.sync="detailValuate"
        @closePopupDetail="detailValuate = $event"
        :getInfoEvaluate="evaluateInfo"></detail-evaluate>
    </vs-popup>
    <vs-table-custom
      :sst="true"
      ref="table"
      multiple
      v-model="selected"
      @search="handleSearch"
      @sort="handleSort"
      :data="evaluates"
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
                <div v-for="(value, index) in viewsEvaluate" :key="index" class="p-1">
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
            @click="addNew = true; evaluateInfo = null"
          >
            <feather-icon icon="Upload" svgClasses="h-4 w-4" />
            <span class="ml-2 text-base text-primary">+ Thêm đánh giá</span>
          </div>
        </div>
        <div class="d-flex">
          <div class="mr-3 d-flex"><div class="h-3 w-3 rounded-full mr-2 bg-success" ></div> <span>Rất hài lòng</span></div>
          <div class="mr-3 d-flex"><div class="h-3 w-3 rounded-full mr-2 bg-primary" ></div> <span>Hài lòng</span></div>
          <div class="mr-3 d-flex"><div class="h-3 w-3 rounded-full mr-2 bg-danger" ></div> <span>Không hài lòng</span></div>
          <div class="mr-3 d-flex"><div class="h-3 w-3 rounded-full mr-2 bg-warning" ></div> <span>Khác</span></div>
        </div>
      </div>
      <template slot="thead">
        <vs-th
          :sort-key="value.sortKey"
          v-for="(value, index) in viewsEvaluate"
          :key="index"
          v-if="value.viewable"
        >{{ value.text }}</vs-th>
      </template>
      <template slot-scope="{data}">
        <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data" class="col">
          <vs-td v-if="viewsEvaluate.code.viewable">{{ tr.code }}</vs-td>
          <vs-td v-if="viewsEvaluate.name.viewable">{{ tr.name }}</vs-td>
          <vs-td v-if="viewsEvaluate.count_question.viewable">{{ tr.count_question ? tr.count_question : 0 }}</vs-td>
          <vs-td v-if="viewsEvaluate.course_name.viewable">
            <router-link tag="a" :to="{name: 'studentregisters', params: {course: tr.course.id}}">{{ tr.course.name }}</router-link>
          </vs-td>
          <vs-td v-if="viewsEvaluate.date.viewable">{{ $helpers.dateDMY(tr.date) }}</vs-td>
          <vs-td v-if="viewsEvaluate.user_name.viewable">
            <router-link tag="a" :to="{name: 'infoEmployee', params: {employee: tr.user.id}}">{{ tr.user.name }}</router-link>
          </vs-td>
          <vs-td v-if="viewsEvaluate.ratio.viewable">
            <div class="d-flex justify-start">
              <vx-tooltip text="Rất hài lòng">
                <span class="flex items-center px-2 py-1 rounded">
                  {{ $helpers.toPersent(tr.very_pleased, (tr.very_pleased+tr.satisfied+tr.unsatisfied+tr.further)) }}
                  <div class="h-3 w-3 rounded-full ml-2 bg-success" ></div>
                </span>
              </vx-tooltip> -
              <vx-tooltip text="Hài lòng">
                <span class="flex items-center px-2 py-1 rounded">
                  {{ $helpers.toPersent(tr.satisfied, (tr.very_pleased+tr.satisfied+tr.unsatisfied+tr.further)) }}
                  <div class="h-3 w-3 rounded-full ml-2 bg-primary" ></div>
                </span>
              </vx-tooltip> -
              <vx-tooltip text="Không hài lòng">
                <span class="flex items-center px-2 py-1 rounded">
                  {{ $helpers.toPersent(tr.unsatisfied, (tr.very_pleased+tr.satisfied+tr.unsatisfied+tr.further)) }}
                  <div class="h-3 w-3 rounded-full ml-2 bg-danger" ></div>
                </span>
              </vx-tooltip> -
              <vx-tooltip text="Khác">
                <span class="flex items-center px-2 py-1 rounded">
                  {{ $helpers.toPersent(tr.further, (tr.very_pleased+tr.satisfied+tr.unsatisfied+tr.further)) }}
                  <div class="h-3 w-3 rounded-full ml-2 bg-warning" ></div>
                </span>
              </vx-tooltip>
            </div>
          </vs-td>
          <vs-td v-if="viewsEvaluate.status.viewable">
            <vx-tooltip text="Đang gửi" v-if="tr.status === 0" key="checkStatus" position="left">
              <font-awesome-icon icon="spinner" class="text-warning" />
            </vx-tooltip>
            <vx-tooltip text="Đã gửi" key="checkStatus" v-else position="left">
              <font-awesome-icon icon="check-circle" class="text-success" />
            </vx-tooltip>
          </vs-td>
          <vs-td v-if="viewsEvaluate.branch_name.viewable">{{ tr.branch.name }}</vs-td>
          <vs-td v-if="viewsEvaluate.content.viewable">{{ tr.content }}</vs-td>
          <vs-td v-if="viewsEvaluate.created_at.viewable">{{ tr.created_at }}</vs-td>
          <vs-td v-if="viewsEvaluate.updated_at.viewable">{{ tr.updated_at }}</vs-td>
          <vs-td v-if="viewsEvaluate.action.viewable" class="d-flex-span">
            <vx-tooltip text="copy sang bản mới">
              <button class="mt-1 mr-1 vs-component vs-button vs-button-primary vs-button-filled includeIcon includeIconOnly small vs-radius"
                @click="getInfoEvaluate(tr.id, 'copy')" >
                <i class="feather icon-copy"></i>
              </button>
            </vx-tooltip>
            <vx-tooltip text="Chi tiết các câu hỏi">
              <button class="mt-1 vs-component vs-button vs-button-success vs-button-filled includeIcon includeIconOnly small vs-radius" @click="getInfoEvaluate(tr.id, 'create')" >
                <i class="feather icon-eye"></i>
              </button>
            </vx-tooltip>
          </vs-td>
        </vs-tr>
      </template>
    </vs-table-custom>
    <div class="con-vs-pagination vs-pagination-primary">
      <nav class="vs-pagination--nav">
        <paginate
          :page-count="paginationEvaluate.totalPages"
          :page-range="3"
          :margin-pages="2"
          :active-class="'is-current'"
          :container-class="'vs-pagination--ul'"
          :page-class="'item-pagination vs-pagination--li'"
          :prev-text="prev"
          :next-text="next"
          :click-handler="getData"
          :value="paginationEvaluate.currentPage"
          ref="paginate"
        />
      </nav>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import AddEvaluate from "./AddEvaluate";
import DetailEvalute from "./DetailEvalute";

export default {
  components: {
    "add-evaluate": AddEvaluate,
    "detail-evaluate": DetailEvalute
  },
  data() {
    return {
      addNew: false,
      detailValuate: false,
      evaluateInfo: null,
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
  created(){
    this.getData();
  },
  computed: {
    ...mapState("campaigns", [
      "evaluates",
      "paginationEvaluate",
      "searchTermEvaluate",
      "orderEvaluate",
      "viewsEvaluate",
      "needReloadEvaluate"
    ]),
    branchId(){
      return this.$store.state.getBranchId;
    }
  },
  methods: {
    getInfoEvaluate(id, type){
      const thisIns = this;
      thisIns.$vs.loading({ color: "#1E6DB5", text: "Loading..." });
      this.$http
        .get(`branches/${thisIns.branchId}/evaluates/${id}`)
        .then((response) => {
          this.evaluateInfo = response.data.data;
          if (type === 'create'){
            thisIns.detailValuate = true;
          } else {
            thisIns.addNew = true;
          }
        })
        .catch(function(error) {
          thisIns.checkResponRequest(error.response.data);
        })
        .finally(function() {
          thisIns.$vs.loading.close();
        });
    },
    updateViews(index, e) {
      this.$store.dispatch("campaigns/updateViewsEvaluate", {
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
        .get(`branches/${thisIns.branchId}/evaluates`, {
          params: {
            page: page,
            search: this.searchTerm,
            orderBy: this.orderEvaluate.orderBy,
            sortedBy: this.orderEvaluate.orderType
          }
        })
        .then(function(response) {
          thisIns.$store.dispatch("campaigns/updateTableEvaluate", {
            data: thisIns.formatData(response.data.data),
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
        this.$store.dispatch("campaigns/updateNeedReloadEvaluate", true);
        return false;
      }
      let thisInt = this;
      this.$store.dispatch("campaigns/updateSearchEvaluate", {
        searchTerm: searching
      });
      clearTimeout(this.timer);
      this.timer = setTimeout(function() {
        thisInt.getData();
      }, 500);
    },
    handleSort(key, active) {
      this.$store.dispatch("campaigns/updateOrderEvaluate", {
        order: {
          orderBy: key,
          orderType: active ? "desc" : "asc"
        }
      });
      this.getData(this.paginationEvaluate.currentPage);
    }
  },
  mounted() {
    this.$refs.table.searchx = this.searchTerm;
    this.isMounted = true;
  },
  destroyed() {
    this.$store.dispatch("campaigns/updateNeedReloadEvaluate", false);
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

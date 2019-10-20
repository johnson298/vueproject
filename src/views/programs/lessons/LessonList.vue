<template>
  <div id="data-list-list-view" class="data-list-container">
    <vs-popup class="popup-custom-768" title="Thêm mới bài học" :active.sync="addLesson">
      <add-lesson
        :callback="getData"
        :lessonData="lessonGetInfo"
        :active.sync="addLesson"
        @closePopupAddLesson="addLesson = $event"
      />
    </vs-popup>
    <vs-popup class="popup-custom-768" title="Chỉnh sửa bài học" :active.sync="editLesson">
      <update-lesson
        :callback="getData"
        :lessonData="lessonGetInfo"
        :active.sync="editLesson"
        @closePopupUpdateLesson="editLesson = $event"
      />
    </vs-popup>

    <vs-table-custom
      :sst="true"
      ref="table"
      multiple
      v-model="selected"
      @search="handleSearch"
      @sort="handleSort"
      :data="lessons"
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
            @click="addLesson=true"
          >
            <feather-icon icon="PlusIcon" svgClasses="h-4 w-4" />
            <span class="ml-2 text-base text-primary">Thêm bài học</span>
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
            <p class="product-name font-medium">{{ tr.name }}</p>
          </vs-td>

          <vs-td v-if="views.description.viewable">
            <p class="product-category">{{ tr.description }}</p>
          </vs-td>

          <vs-td v-if="views.url.viewable">
            <button
              type="button"
              class="vs-component vs-button vs-button-danger vs-button-filled includeIcon includeIconOnly vs-radius small"
            >
              <a :href="tr.url">
                <font-awesome-icon icon="play-circle" color="white" />
              </a>
            </button>
            <p class="product-category pl-6"></p>
          </vs-td>

          <vs-td v-if="views.updated_at.viewable">
            <p class="product-category">{{ tr.updated_at }}</p>
          </vs-td>

          <vs-td v-if="views.created_at.viewable">
            <p class="product-category">{{ tr.created_at }}</p>
          </vs-td>

          <vs-td v-if="views.action.viewable" class="d-flex-span">
            <vs-button
              color="primary"
              size="small"
              @click="getInfoLesson(tr.id)"
              class="vs-component vs-button vs-button-filled includeIcon includeIconOnly vs-radius"
            >
              <i class="feather icon-edit"></i>
            </vs-button>
            <vs-button radius @click="deleteLesson(tr)" color="danger" size="small" icon="delete"></vs-button>
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
import AddLesson from "./AddLesson";
import EditLesson from "./EditLesson";
import { mapState } from "vuex";

export default {
  components: {
    "add-lesson": AddLesson,
    "update-lesson": EditLesson
  },
  data() {
    return {
      editLesson: false,
      programId: this.$route.params.program,
      addLesson: false,
      lessonGetInfo: {},
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
    ...mapState("lessons", [
      "lessons",
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
    getInfoLesson(id) {
      let url = `branches/${this.branchId}/programs/${this.programId}/lessons/${id}`;
      const thisIns = this;
      thisIns.$vs.loading({
        color: "#1e6db5",
        text: "Loading..."
      });
      this.$http
        .get(url)
        .then(response => {
          thisIns.lessonGetInfo = response.data.data;
        })
        .catch(function(error) {
          thisIns.$vs.notify({
            title: "Có lỗi",
            text: error,
            color: "danger",
            iconPack: "feather",
            icon: "icon-alert-circle"
          });
        })
        .finally(function() {
          thisIns.editLesson = true;
          thisIns.$vs.loading.close();
        });
    },
    deleteLesson(lessons) {
      this.$vs.dialog({
        type: "confirm",
        color: "danger",
        title: `Xóa bài học`,
        text: "Bạn có chắc muốn xóa bài học này",
        accept: this.lessonsAlert,
        parameters: [lessons.id]
      });
    },
    lessonsAlert(lesson_id) {
      let url = `branches/${this.branchId}/programs/${this.programId}/lessons/${lesson_id}`;
      this.$http
        .delete(url)
        .then(() => {
          this.$vs.notify({
            color: "success",
            title: "Xóa bài học",
            text: "Bạn đã xóa thành công",
            icon: "verified_user"
          });
          this.getData();
        })
        .catch(() => {
          this.$vs.notify({
            title: "Có lỗi!",
            text: "Bạn không xóa thành công",
            iconPack: "feather",
            icon: "fa fa-lg fa-exclamation-triangle",
            color: "danger"
          });
        });
    },
    updateViews(index, e) {
      this.$store.dispatch("lessons/updateViews", {
        index: index,
        viewable: e.target.checked
      });
    },
    formatData(data) {
      return data;
    },
    getData(page = 1) {
      let url = `branches/${this.branchId}/programs/${this.programId}/lessons`;
      const thisIns = this;
      thisIns.$vs.loading({
        color: "#1e6db5",
        text: "Loading..."
      });
      this.$http
        .get(url, {
          params: {
            page: page,
            search: this.searchTerm,
            orderBy: this.order.orderBy,
            sortedBy: this.order.orderType
          }
        })
        .then(function(response) {
          thisIns.$store.dispatch("lessons/updateTable", {
            lessons: thisIns.formatData(response.data.data),
            pagination: response.data.pagination
          });
        })
        .catch(function(error) {
          thisIns.$vs.notify({
            title: "Có lỗi",
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
        this.$store.dispatch("lessons/updateNeedReload", true);
        return false;
      }
      let thisInt = this;
      this.$store.dispatch("lessons/updateSearch", {
        searchTerm: searching
      });
      clearTimeout(this.timer);
      this.timer = setTimeout(function() {
        thisInt.getData();
      }, 500);
    },
    handleSort(key, active) {
      this.$store.dispatch("lessons/updateOrder", {
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
    if (this.lessons.length === 0) {
      this.getData();
    }
  },
  destroyed() {
    this.$store.dispatch("lessons/updateNeedReload", false);
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

<template>
  <div id="data-list-list-view" class="data-list-container">

    <vs-popup class="popup-custom-768" title="Chuyển học viên vào lớp mới" :active.sync="joinPopup" v-if="joinPopup">
      <join-student
        :active.sync="joinPopup"
        :isSidebarActive="joinPopup"
        @closePopup="joinPopup = $event"
        :getData="getData"
        :studentInfo="studentInfo"
        :reserveId="reserveId"
      />
    </vs-popup>
    <vs-table-custom
      :sst="true"
      ref="table"
      multiple
      v-model="selected"
      @search="handleSearch"
      @sort="handleSort"
      :data="students"
      search
      id="table"
      maxItems="10"
    >
      <div
        slot="header"
        class="flex flex-wrap-reverse items-center flex-grow justify-between"
      >
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
                <div
                  v-for="(value, index) in views"
                  :key="index"
                  class="p-1"
                  :class="{ hidden: !value.active.includes('reserves') }"
                >
                  <vs-checkbox
                    :value="value.viewable"
                    @change="updateViews(index, $event)"
                    v-if="value.active.includes('reserves')"
                    >{{ value.text }}</vs-checkbox
                  >
                </div>
              </div>
            </vs-dropdown-menu>
          </vs-dropdown>
        </div>
      </div>

      <template slot="thead">
        <vs-th
          :sort-key="value.sortKey"
          v-for="(value, index) in views"
          :key="index"
          v-if="value.viewable && value.active.includes('reserves')"
          >{{ value.text }}</vs-th
        >
      </template>

      <template slot-scope="{ data }">
        <vs-tr
          :data="tr"
          :key="indextr"
          v-for="(tr, indextr) in data"
          class="col"
        >
          <vs-td v-if="views.code.viewable">{{ tr.student.code }}</vs-td>
          <vs-td v-if="views.avatar.viewable">
            <vs-avatar size="55px" :src="tr.student.avatar" />
          </vs-td>
          <vs-td v-if="views.name.viewable">{{ tr.student.name }}</vs-td>
          <vs-td v-if="views.user_create.viewable">
            <router-link tag="a" :to="`employees/${tr.user.id}`">
              {{ tr.user.name }}
            </router-link>
          </vs-td>
          <vs-td v-if="views.email.viewable">{{ tr.student.email }}</vs-td>
          <vs-td v-if="views.birthday.viewable">{{ tr.student.birthday }}</vs-td>
          <vs-td v-if="views.phone.viewable">{{ tr.student.phone }}</vs-td>
          <vs-td v-if="views.facebook.viewable">
              <a :href="tr.student.facebook" target="_blank">Link</a>
          </vs-td>
          <vs-td v-if="views.address.viewable">{{ tr.student.address }}</vs-td>
          <vs-td v-if="views.progress.viewable">{{ tr.progress }}</vs-td>
          <vs-td v-if="views.class.viewable">{{ tr.student.class }}</vs-td>
          <vs-td v-if="views.school.viewable">{{ tr.student.school }}</vs-td>
          <vs-td v-if="views.reason.viewable">{{ tr.note }}</vs-td>
          <vs-td v-if="views.course.viewable">
              {{ tr.course.name }} ({{ checkStatus(statusCourse, tr.course.status) }})
          </vs-td>
          <vs-td v-if="views.status.viewable">
            <span class="flex items-center px-2 py-1 rounded"
              ><div
                class="h-3 w-3 rounded-full mr-2"
                :class="`bg-${ tr.type == 1 ? 'warning' : tr.type == 2 ? 'success' : 'danger' }`"
              ></div>
              {{ checkStatus(statusReserves, tr.type) }}</span>
          </vs-td>
          <vs-td v-if="views.course_new.viewable">
            <router-link
            tag="a"
            v-if="tr.course_new"
            :to="`/courses/${tr.course_new.id}`"
            key="course_new">
                {{ tr.course_new.name }}</router-link>
            <p v-else key="course_new">Chưa có lớp mới</p>
          </vs-td>
          <vs-td v-if="views.updated_at.viewable">{{ tr.updated_at }}</vs-td>
          <vs-td v-if="views.created_at.viewable">{{ tr.created_at }}</vs-td>
          <vs-td v-if="views.action.viewable" class="d-flex-span">
            <vx-tooltip text="Chuyển lớp học viên" v-if="tr.type == 1">
              <vs-button
                radius
                color="primary"
                size="small"
                @click="joinStudentToCourse(tr)"
                icon="cached"
              ></vs-button>
            </vx-tooltip>
            <vx-tooltip text="Hủy bảo lưu học viên" v-if="tr.type == 1">
              <vs-button
                radius
                color="danger"
                size="small"
                @click="unReserve(tr)"
                icon="not_interested"
              ></vs-button>
            </vx-tooltip>
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
import JoinStudent from './JoinStudent';
import { mapState } from "vuex";

export default {
  components: {
    "join-student": JoinStudent
  },
  data() {
    return {
      reserveId: 0,
      studentInfo: null,
      joinPopup: false,
      statusCourse: this.$store.state.model.courses.status,
      statusReserves: this.$store.state.model.students.reserves,
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
    ...mapState("students", [
      "students",
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
    joinStudentToCourse(info){
      this.joinPopup = true;
      this.reserveId = info.id;
      this.studentInfo = {
        id: info.student.id,
        name: info.student.name,
        progress: info.progress,
        note: info.note,
        branch_id: info.branch_id,
        course_id: info.course_id,
        program_id: info.course.program_id
      };
    },
    unReserve(info) {
      this.$vs.dialog({
        type: "confirm",
        color: "danger",
        title: `Hủy bảo lưu học viên`,
        text: "Bạn có chắc muốn hủy bảo lưu học viên " + info.student.name,
        accept: this.studentAlert,
        parameters: [info.id]
      });
    },
    studentAlert(id) {
      this.$http
        .put(`branches/${this.branchId}/reserves/${id}`, {
          type: 2
        })
        .then(() => {
          this.$vs.notify({
            title: 'Hủy bảo lưu thành công',
            text: 'OK',
            iconPack: 'feather',
            icon: 'fa fa-lg fa-check-circle',
            color: 'success'
          });
          this.getData();
        })
        .catch((error) => {
          this.checkResponRequest(error.response.data, null, null, "Thêm thất bại");
        });
    },
    updateViews(index, e) {
      this.$store.dispatch("students/updateViews", {
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
        .get(`branches/${this.branchId}/reserves`, {
          params: {
            page: page,
            search: this.searchTerm,
            orderBy: this.order.orderBy,
            sortedBy: this.order.orderType
          }
        })
        .then(function(response) {
          thisIns.$store.dispatch("students/updateTable", {
            students: thisIns.formatData(response.data.data),
            pagination: response.data.pagination
          });
        })
        .catch(function(error) {
          let errorData = error.response.data;
          thisIns.checkResponRequest(errorData);
        })
        .finally(function() {
          thisIns.$vs.loading.close();
        });
    },
    handleSearch(searching) {
      if (!this.needReload) {
        this.$store.dispatch("students/updateNeedReload", true);
        return false;
      }
      let thisInt = this;
      this.$store.dispatch("students/updateSearch", {
        searchTerm: searching
      });
      clearTimeout(this.timer);
      this.timer = setTimeout(function() {
        thisInt.getData();
      }, 500);
    },
    handleSort(key, active) {
      this.$store.dispatch("students/updateOrder", {
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
    this.$store.dispatch("students/updateNeedReload", false);
  },
  created() {
    this.getData();
  },
  watch: {
    branchId(){
      this.getData();
    }
  },
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

.vdp-datepicker.picker-custom input {
  width: 100% !important;
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

<template>
  <div id="data-list-list-view" class="data-list-container">

    <vs-table-custom :sst="true" ref="table" multiple v-model="selected" @search="handleSearch" @sort="handleSort" :data="students" search id="table" maxItems="10">

      <template slot="thead">
        <vs-th :sort-key="value.sortKey" v-for="(value, index) in views" :key="index" v-if="value.viewable">{{ value.text }}</vs-th>
      </template>
      <div slot="header" class="flex flex-wrap-reverse items-center flex-grow justify-between">

        <div class="flex flex-wrap-reverse items-center">

          <!-- ACTION - DROPDOWN -->
          <vs-dropdown vs-trigger-click class="cursor-pointer mr-4 mb-4">

            <div class="p-4 shadow-drop rounded-lg d-theme-dark-bg cursor-pointer flex items-center justify-center text-lg font-medium w-32">
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

            <div class="p-4 shadow-drop rounded-lg d-theme-dark-bg cursor-pointer flex items-center justify-center text-lg font-medium w-32">
              <span class="mr-2">Xem</span>
              <feather-icon icon="ChevronDownIcon" svgClasses="h-4 w-4" />
            </div>

            <vs-dropdown-menu>
              <div class="col p-2">
                <div v-for="(value, index) in views" :key="index" class="p-1">
                  <vs-checkbox :value="value.viewable" @change="updateViews(index, $event)">{{ value.text }}</vs-checkbox>
                </div>
              </div>
            </vs-dropdown-menu>
          </vs-dropdown>

          <!-- ADD NEW -->
          <div class="p-3 mb-4 mr-4 rounded-lg cursor-pointer flex items-center justify-between text-lg font-medium text-base text-primary border border-solid border-primary" @click="addLessonOnline = true">
            <feather-icon icon="PlusIcon" svgClasses="h-4 w-4" />
            <span class="ml-2 text-base text-primary">Thêm lớp học</span>
          </div>
          <vs-popup class="holamundo popup-custom-768" title="Thêm bài học online" :active.sync="addLessonOnline">
              <AddLesson :active.sync="addLessonOnline"/>
          </vs-popup>
        </div>
      </div>

      <template slot-scope="{data}">
        <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data" class="col" @click="registers.course_id = idCourse">
          <vs-td v-if="views.index.viewable">
            <p class="product-name font-medium">{{ tr.index }}</p>
          </vs-td>

          <vs-td v-if="views.name.viewable">
            <p class="product-name font-medium">{{ tr.name }}</p>
          </vs-td>

          <vs-td v-if="views.description.viewable">
            <p class="product-category">{{ tr.description }}</p>
          </vs-td>

          <vs-td v-if="views.link.viewable">
            <p class="product-category pl-6">
              <a :href="tr.link"><font-awesome-icon icon="play-circle"/></a>
            </p>
          </vs-td>

          <vs-td v-if="views.updated_at.viewable">
            <p class="product-category">{{ tr.updated_at }}</p>
          </vs-td>

          <vs-td v-if="views.created_at.viewable">
            <p class="product-category">{{ tr.created_at }}</p>
          </vs-td>

          <vs-td v-if="views.action.viewable" class="d-flex-span">
            <vs-button color="danger" size="small" icon="delete"></vs-button>
          </vs-td>
        </vs-tr>
      </template>
    </vs-table-custom>
    <div class="con-vs-pagination vs-pagination-primary">
      <nav class="vs-pagination--nav">
        <paginate :page-count="pagination.totalPages" :page-range="3" :margin-pages="2" :active-class="'is-current'" :container-class="'vs-pagination--ul'" :page-class="'item-pagination vs-pagination--li'" :prev-text="prev" :next-text="next" :click-handler="getData" :value="pagination.currentPage" ref="paginate" />
      </nav>
    </div>
  </div>
</template>

<script>
import AddLesson from './AddLesson.vue';
export default {
  components: {
    AddLesson,
  },
  created(){
    this.getData();
  },
  data() {
    return {
      branch_id: this.$store.state.getBranchId,
      students: [
        {
          id: 1,
          index: 'Bài 1',
          name: 'Từ vựng cơ bản',
          description: 'Các từ vựng liên quan đến đời sống',
          link: '',
          created_at: '2020-10-10 09:09:09',
          updated_at: '2020-10-10 09:09:09'
        },
        {
          id: 1,
          index: 'Bài 2',
          name: 'Từ vựng cơ bản',
          description: 'Các từ vựng liên quan đến đời sống',
          link: '',
          created_at: '2020-10-10 09:09:09',
          updated_at: '2020-10-10 09:09:09'
        },
      ],
      pagination: {
        count: 0,
        total: 0,
        perPage: 0,
        currentPage: 0,
        totalPages: 0,
        links: []
      },
      searchTerm: '',
      order: {
        orderBy: 'id',
        orderType: 'desc'
      },
      views: {
        index: { text: 'STT', viewable: true, sortKey: 'index' },
        name: { text: 'tên bài học', viewable: true, sortKey: 'name' },
        description: { text: 'mô tả', viewable: true, sortKey: 'description' },
        link: { text: 'video', viewable: true, sortKey: 'link' },
        created_at: { text: 'ngày tạo', viewable: true, sortKey: 'created_at' },
        updated_at: { text: 'ngày cập nhật', viewable: false, sortKey: 'updated_at' },
        action: { text: 'Action', viewable: true, sortKey: '' },
      },
      show: false,
      timer: null,
      selected: [],
      isMounted: false,
      addLessonOnline: false,
      prev: "<button class=\"vs-pagination--buttons btn-prev-pagination vs-pagination--button-prev\"><i class=\"vs-icon notranslate icon-scale material-icons null\">chevron_left</i></button>",
      next: "<button class=\"vs-pagination--buttons btn-prev-pagination vs-pagination--button-next\"><i class=\"vs-icon notranslate icon-scale material-icons null\">chevron_right</i></button>"
    };
  },
  methods: {
    formatData(data) {
      return data;
    },
    updateViews(index,e){
      this.views[index] = {
        text: index,
        viewable: e.target.checked,
        sortKey: index
      };
    },
    getData() {
      
    },
    handleSearch(searching) {
      let thisInt = this;
      this.searchTerm = searching;
      clearTimeout(this.timer);
      this.timer = setTimeout(function () {
        thisInt.getData();
      }, 500);
    },
    handleSort(key, active) {
      this.order = {
        orderBy: key,
        orderType: active ? 'desc' : 'asc',
      };
      this.getData(this.pagination.currentPage);
    },
  },
  mounted() {
    this.$refs.table.searchx = this.searchTerm;
    this.isMounted = true;
    if (this.students.length === 0) {
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

        >span {
          display: flex;
          flex-grow: 1;
        }

        .vs-table--search {
          padding-top: 0;

          .vs-table--search-input {
            padding: 0.9rem 2.5rem;
            font-size: 1rem;

            &+i {
              left: 1rem;
            }

            &:focus+i {
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
          box-shadow: 0 4px 20px 0 rgba(0, 0, 0, .05);

          td {
            padding: 20px;

            &:first-child {
              border-top-left-radius: .5rem;
              border-bottom-left-radius: .5rem;
            }

            &:last-child {
              border-top-right-radius: .5rem;
              border-bottom-right-radius: .5rem;
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
.flex.action-footer {
    position: sticky;
    bottom: 8px;
    z-index: 990;
    background: #fff;
    transform: translateY(25px);
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

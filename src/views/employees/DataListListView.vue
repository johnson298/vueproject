<!-- =========================================================================================
  File Name: DataListListView.vue
  Description: Data List - List View
  ----------------------------------------------------------------------------------------
  Item Name: Vuesax Admin - VueJS Dashboard Admin Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->

<template>
  <div id="data-list-list-view" class="data-list-container">

    <add-new-data-sidebar :isSidebarActive="addNewDataSidebar" @closeSidebar="addNewDataSidebar = false" />

    <vs-table ref="table" multiple v-model="selected" :data="users">

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

          <!-- ADD NEW -->
          <div class="p-3 mb-4 mr-4 rounded-lg cursor-pointer flex items-center justify-between text-lg font-medium text-base text-primary border border-solid border-primary" @click="addNewDataSidebar = true">
              <feather-icon icon="PlusIcon" svgClasses="h-4 w-4" />
              <span class="ml-2 text-base text-primary">Add New</span>
          </div>
        </div>

      </div>

      <template slot="thead">
        <vs-th sort-key="name">Name</vs-th>
        <vs-th sort-key="category">Email</vs-th>
        <vs-th sort-key="popularity">Created at</vs-th>
        <vs-th sort-key="order_status">Updated at</vs-th>
        <vs-th sort-key="price">Action</vs-th>
      </template>

      <template slot-scope="{data}">
          <tbody>
            <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">

              <vs-td>
                <p class="product-name font-medium">{{ tr.name }}</p>
              </vs-td>

              <vs-td>
                <p class="product-category">{{ tr.email }}</p>
              </vs-td>

              <vs-td>
                <p class="product-category">{{ tr.created_at }}</p>
              </vs-td>

              <vs-td>
                <p class="product-category">{{ tr.created_at }}</p>
              </vs-td>

              <vs-td>

              </vs-td>

            </vs-tr>
          </tbody>
        </template>
    </vs-table>
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
        />
      </nav>
    </div>
  </div>
</template>

<script>
import AddNewDataSidebar from './AddNewDataSidebar.vue';

export default {
  components: {
    AddNewDataSidebar
  },
  data() {
    return {
      selected: [],
      users: [],
      pagination: {
        count: 0,
        total: 0,
        perPage: 0,
        currentPage: 0,
        totalPages: 0,
        links: []
      },
      isMounted: false,
      addNewDataSidebar: false,
      prev: "<button class=\"vs-pagination--buttons btn-prev-pagination vs-pagination--button-prev\"><i class=\"vs-icon notranslate icon-scale material-icons null\">chevron_left</i></button>",
      next: "<button class=\"vs-pagination--buttons btn-prev-pagination vs-pagination--button-next\"><i class=\"vs-icon notranslate icon-scale material-icons null\">chevron_right</i></button>"
    };
  },
  computed: {
    currentPage() {
      if(this.isMounted) {
        return this.$refs.table.currentx;
      }
      return 0;
    },
  },
  methods: {
    formatData(data) {
      return data;
    },
    getData(page = 1) {
      const thisIns = this;
      thisIns.$vs.loading({ color: '#7367F0' });
      this.$http.get('users', {
        params: {
          page: page
        }
      }).then(function (response) {
        thisIns.users = thisIns.formatData(response.data.data);
        thisIns.pagination = response.data.pagination;
      })
        .catch(function (error) {
          thisIns.$vs.notify({
            title:'Error',
            text: error,
            color:'danger',
            iconPack: 'feather',
            icon:'icon-alert-circle'});
        }).finally(function () {
          thisIns.$vs.loading.close();
        });
    }
  },
  created() {
    this.getData();
  },
  mounted() {
    this.isMounted = true;
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

      .vs-table--search{
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

      tr{
          box-shadow: 0 4px 20px 0 rgba(0,0,0,.05);
          td{
            padding: 20px;
            &:first-child{
              border-top-left-radius: .5rem;
              border-bottom-left-radius: .5rem;
            }
            &:last-child{
              border-top-right-radius: .5rem;
              border-bottom-right-radius: .5rem;
            }
          }
          td.td-check{
            padding: 20px !important;
          }
      }
    }

    .vs-table--thead{
      th {
        padding-top: 0;
        padding-bottom: 0;

        .vs-table-text{
          text-transform: uppercase;
          font-weight: 600;
        }
      }
      th.td-check{
        padding: 0 15px !important;
      }
      tr{
        background: none;
        box-shadow: none;
      }
    }

    .vs-table--pagination {
      justify-content: center;
    }
  }
}
</style>

<template>
  <div id="data-list-list-view" class="data-list-container">

    <vs-table-custom :sst="true" ref="table" multiple v-model="selected" @search="handleSearch" @sort="handleSort" :data="students" search id="table" maxItems="10">

      <template slot="thead">
        <vs-th :sort-key="value.sortKey" v-for="(value, index) in views" :key="index" v-if="value.viewable">{{ value.text }}</vs-th>
      </template>

      <template slot-scope="{data}">
        <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data" class="col" @click="registers.course_id = idCourse">
          <vs-td v-if="views.code.viewable">
            <p class="product-name font-medium">{{ tr.code }}</p>
          </vs-td>
          <vs-td v-if="views.avatar.viewable">
            <vs-avatar size="55px" :src="tr.avatar" :alt="tr.name" />
          </vs-td>

          <vs-td v-if="views.name.viewable">
            <p class="product-name font-medium">{{ tr.name }}</p>
          </vs-td>

          <vs-td v-if="views.email.viewable">
            <p class="product-category">{{ tr.email }}</p>
          </vs-td>

          <vs-td v-if="views.birthday.viewable">
            <p class="product-category">{{ tr.birthday }}</p>
          </vs-td>

          <vs-td v-if="views.phone.viewable">
            <p class="product-category">{{ tr.phone }}</p>
          </vs-td>

          <vs-td v-if="views.facebook.viewable">
            <p class="product-category"><a :href="tr.facebook" target="_blank">Link</a></p>
          </vs-td>

          <vs-td v-if="views.address.viewable">
            <p class="product-category">{{ tr.address }}</p>
          </vs-td>

          <vs-td v-if="views.source.viewable">
            <p class="product-category">{{ tr.source }}</p>
          </vs-td>

          <vs-td v-if="views.class.viewable">
            <p class="product-category">{{ tr.class }}</p>
          </vs-td>

          <vs-td v-if="views.school.viewable">
            <p class="product-category">{{ tr.school }}</p>
          </vs-td>

          <vs-td v-if="views.updated_at.viewable">
            <p class="product-category">{{ tr.updated_at }}</p>
          </vs-td>

          <vs-td v-if="views.created_at.viewable">
            <p class="product-category">{{ tr.created_at }}</p>
          </vs-td>

          <vs-td v-if="views.action.viewable" class="d-flex-span">
            <vs-button color="primary" size="small" icon="add" @click="addStudentsCourse(tr.id)"></vs-button>
          </vs-td>
        </vs-tr>
      </template>
    </vs-table-custom>
    <div class="con-vs-pagination vs-pagination-primary">
      <nav class="vs-pagination--nav">
        <paginate :page-count="pagination.totalPages" :page-range="3" :margin-pages="2" :active-class="'is-current'" :container-class="'vs-pagination--ul'" :page-class="'item-pagination vs-pagination--li'" :prev-text="prev" :next-text="next" :click-handler="getData" :value="pagination.currentPage" ref="paginate" />
      </nav>
    </div>
    <div class="flex flex-wrap items-center flex-row-reverse p-6 action-footer">
      <vs-button color="danger" class="mr-6 vs-con-loading__container" @click="$emit('update:active', false)">hủy</vs-button>
      <vs-button class="mr-6 vs-con-loading__container" @click="addStudentsCourse()">Thêm</vs-button>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    callback: {
      type: Function,
      required: true
    }
  },
  created(){
    this.getData();
  },
  data() {
    return {
      branch_id: this.$store.state.getBranchId,
      students: [],
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
        code: { text: 'Code', viewable: true, sortKey: 'code' },
        avatar: { text: 'Avatar', viewable: true, sortKey: '' },
        name: { text: 'Name', viewable: true, sortKey: 'name' },
        email: { text: 'Email', viewable: true, sortKey: 'email' },
        birthday: { text: 'Birthday', viewable: false, sortKey: 'birthday' },
        phone: { text: 'Phone', viewable: true, sortKey: 'phone' },
        facebook: { text: 'Facebook', viewable: false, sortKey: '' },
        address: { text: 'Address', viewable: false, sortKey: '' },
        source: { text: 'Source', viewable: false, sortKey: 'source' },
        class: { text: 'Class', viewable: false, sortKey: '' },
        school: { text: 'School', viewable: false, sortKey: '' },
        created_at: { text: 'Created at', viewable: true, sortKey: 'created_at' },
        updated_at: { text: 'Updated at', viewable: false, sortKey: 'updated_at' },
        action: { text: 'Action', viewable: true, sortKey: '' },
      },
      show: false,
      timer: null,
      selected: [],
      isMounted: false,
      addNewDataSidebar: false,
      prev: "<button class=\"vs-pagination--buttons btn-prev-pagination vs-pagination--button-prev\"><i class=\"vs-icon notranslate icon-scale material-icons null\">chevron_left</i></button>",
      next: "<button class=\"vs-pagination--buttons btn-prev-pagination vs-pagination--button-next\"><i class=\"vs-icon notranslate icon-scale material-icons null\">chevron_right</i></button>"
    };
  },
  methods: {
    formatData(data) {
      return data;
    },
    getData(page = 1) {
      const thisIns = this;
      thisIns.$vs.loading({
        color: '#7367F0',
        text: 'Loading...'
      });
      this.$http.get(`students`, {
        params: {
          page: page,
          search: this.searchTerm,
          orderBy: this.order.orderBy,
          sortedBy: this.order.orderType,
        }
      }).then(function (response) {
        thisIns.students = thisIns.formatData(response.data.data);
        thisIns.pagination = response.data.pagination;
      })
        .catch(function (error) {
          thisIns.$vs.notify({
            title: 'Error',
            text: error,
            color: 'danger',
            iconPack: 'feather',
            icon: 'icon-alert-circle'
          });
        }).finally(function () {
          thisIns.$vs.loading.close();
        });
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
    addStudentsCourse(idStudent) {
      this.$http.post(`branches/${this.branch_id}/courses/` + this.$route.params.course + '/registers', {
        student_id: idStudent || this.selected[0].id,
        coupon_id: null,
        status: 1
      })
        .then(() => {
          this.$vs.notify({
            title: 'Đã thêm thành công',
            text: 'OK',
            iconPack: 'feather',
            icon: 'fa fa-lg fa-check-circle',
            color: 'success'
          });
          this.getData();
          this.callback();
        })
        .catch((error) => {
          if (error.response.data.error.hasOwnProperty('validation')) {
            let message = error.response.data.error.validation[Object.keys(error.response.data.error.validation)[0]][0];
            this.$vs.notify({
              title: 'Validation error!',
              text: message,
              iconPack: 'feather',
              icon: 'fa fa-lg fa-exclamation-triangle',
              color: 'danger'
            });
          } else {
            this.$vs.notify({
              title: 'Error!',
              text: 'Thêm thất bại',
              iconPack: 'feather',
              icon: 'fa fa-lg fa-exclamation-triangle',
              color: 'danger'
            });
          }
          this.selected = [];
        }).finally(() => {
          this.$vs.loading.close('#button-with-loading > .con-vs-loading');
        });
    }
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

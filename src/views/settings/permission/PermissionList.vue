<template>
    <div id="data-list-list-view" class="data-list-container">
        <vs-popup fullscreen title="Sửa phân quyền" :active.sync="popupEditRole">
            <edit-permission
              v-if="popupEditRole"
              :callback="getData"
              :active.sync="popupEditRole"
              :permission="roleGetInfo.permission"
              :rolePermission="roleGetInfo.rolePermission"
              :role="roleGetInfo.role"
              :idRole="idRole"
              :rolePermissionComit.sync="roleGetInfo.rolePermission"
              @closePopup="popupEditRole = $event"/>
        </vs-popup>

        <vs-table-custom :sst="true" ref="table" multiple v-model="selected" @sort="handleSort" :data="roles" id="table" maxItems="10">

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
                            <span class="mr-2">Views</span>
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
                </div>
            </div>

            <template slot="thead">
                <vs-th :sort-key="value.sortKey" v-for="(value, index) in views" :key="index" v-if="value.viewable">{{ value.text }}</vs-th>
            </template>

            <template slot-scope="{data}">
                <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data" class="col">
                    <vs-td v-if="views.name.viewable">{{ tr.name === "consultant" ? "marketing" : tr.name  }}</vs-td>
                    <vs-td v-if="views.display_name.viewable">{{ tr.display_name === "Tư vấn viên" ? "Marketing" : tr.display_name }}</vs-td>
                    <vs-td v-if="views.action.viewable" class="d-flex-span text-center">
                        <vs-button
                         radius color="success" size="small"
                         @click="getInfoRole(tr.id)"
                         class="vs-component vs-button vs-button-success vs-button-filled includeIcon includeIconOnly small">
                          <i class="feather icon-edit"></i>
                        </vs-button>
                        <!-- <vs-button radius color="danger" size="small" @click="deleteCustomer(tr)" icon="delete_forever"></vs-button> -->
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
import EditPermission from './EditPermission.vue';

import {
  mapState
} from 'vuex';

export default {
  components: {
    'edit-permission': EditPermission,
  },
  data() {
    return {
      idRole: null,
      roleGetInfo: null,
      activeConfirm: false,
      timer: null,
      selected: [],
      isMounted: false,
      popupAddCustomer: false,
      popupEditRole: false,
      prev: "<button class=\"vs-pagination--buttons btn-prev-pagination vs-pagination--button-prev\"><i class=\"vs-icon notranslate icon-scale material-icons null\">chevron_left</i></button>",
      next: "<button class=\"vs-pagination--buttons btn-prev-pagination vs-pagination--button-next\"><i class=\"vs-icon notranslate icon-scale material-icons null\">chevron_right</i></button>"
    };
  },
  computed: {
    ...mapState('roles', ['roles', 'pagination', 'searchTerm', 'order', 'views', 'needReload']),
  },
  methods: {
    getInfoRole(id) {
      this.idRole = id;
      const thisIns = this;
      thisIns.$vs.loading({
        color: "#1E6DB5",
        text: "Loading..."
      });
      thisIns.$http
        .get(`roles/${id}`)
        .then(res => {
          thisIns.roleGetInfo = res.data.data;
        })
        .catch(function (error) {
          thisIns.$vs.notify({
            title: "Error",
            text: error,
            color: "danger",
            iconPack: "feather",
            icon: "icon-alert-circle"
          });
        })
        .finally(function () {
          thisIns.popupEditRole = true;
          thisIns.$vs.loading.close();
        });
    },
    updateViews(index, e) {
      this.$store.dispatch('roles/updateViews', {
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
        color: '#1E6DB5',
        text: 'Loading...'
      });
      this.$http.get(`roles`, {
        params: {
          page: page,
          search: this.searchTerm,
          orderBy: this.order.orderBy,
          sortedBy: this.order.orderType,
        }
      }).then(function (response) {
        thisIns.$store.dispatch('roles/updateTable', {
          roles: thisIns.formatData(response.data.data),
          pagination: response.data.pagination
        });
      })
        .catch(function (error) {
          thisIns.checkResponRequest(error.response.data);
        }).finally(function () {
          thisIns.$vs.loading.close();
        });
    },
    handleSort(key, active) {
      this.$store.dispatch('roles/updateOrder', {
        order: {
          orderBy: key,
          orderType: active ? 'desc' : 'asc',
        }
      });
      this.getData(this.pagination.currentPage);
    }
  },
  mounted() {
    this.$refs.table.searchx = this.searchTerm;
    this.isMounted = true;
    if (this.roles.length === 0) {
      this.getData();
    }
  },
  destroyed() {
    this.$store.dispatch('roles/updateNeedReload', false);
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

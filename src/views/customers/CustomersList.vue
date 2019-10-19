<template>
<div id="data-list-list-view" class="data-list-container">
    <vs-popup class="popup-custom-768" title="Thêm mới khách hàng" :active.sync="popupAddCustomer">
        <add-customer :callback="getData" :active.sync="popupAddCustomer" @closePopup="popupAddCustomer = $event" />
    </vs-popup>
    
    <vs-popup class="popup-custom-768" title="chuyển khách hàng thành học viên" :active.sync="popupConvertCustomer">
        <convert-customer :callback="getData" :active.sync="popupConvertCustomer" :customerInfo="customerGetInfo" @closePopupConvert="popupConvertCustomer = $event"/>
    </vs-popup>

    <vs-popup class="popup-custom-768" title="Sửa khách hàng" :active.sync="popupEditCustomer">
        <edit-customer :callback="getData" :active.sync="popupEditCustomer" :customerInfo="customerGetInfo" @closePopup="popupEditCustomer = $event"/>
    </vs-popup>

    <vs-table-custom :sst="true" ref="table" multiple v-model="selected" @search="handleSearch" @sort="handleSort" :data="customers" search id="table" maxItems="10">

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

                <!-- ADD NEW -->
                <div class="p-3 mb-4 mr-4 rounded-lg cursor-pointer flex items-center justify-between text-lg font-medium text-base text-primary border border-solid border-primary" @click="popupAddCustomer = true">
                    <feather-icon icon="PlusIcon" svgClasses="h-4 w-4" />
                    <span class="ml-2 text-base text-primary">Thêm khách hàng</span>
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
            <vs-th :sort-key="value.sortKey" v-for="(value, index) in views" :key="index" v-if="value.viewable">{{ value.text }}</vs-th>
        </template>

        <template slot-scope="{data}">
            <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data" class="col">
                <vs-td v-if="views.code.viewable">
                    <p class="product-name font-medium">{{ tr.code }}</p>
                </vs-td>

                <vs-td v-if="views.name.viewable">
                    <p class="product-name font-medium">{{ tr.name }}</p>
                </vs-td>

                <vs-td v-if="views.email.viewable">
                    <p class="product-category">{{ tr.email }}</p>
                </vs-td>

                <vs-td v-if="views.phone.viewable">
                    <p class="product-category">{{ tr.phone }}</p>
                </vs-td>

                <vs-td v-if="views.phone.viewable">
                    <p class="product-category">{{ tr.zalo }}</p>
                </vs-td>

                <vs-td v-if="views.address.viewable">
                    <p class="product-category">{{ tr.address }}</p>
                </vs-td>

                <vs-td v-if="views.facebook.viewable">
                    <p class="product-category"><a :href="tr.facebook" target="_blank">Link</a></p>
                </vs-td>

                <vs-td v-if="views.birthday.viewable">
                    <p class="product-category">{{ tr.birthday }}</p>
                </vs-td>

                <vs-td v-if="views.gender.viewable">
                    <p class="product-name font-medium"> 
                      <vs-chip :color="checkStatusFrom0(genderCustomer,tr.gender)=='Nam' ? 'success'
                          : ''">{{ checkStatusFrom0(genderCustomer,tr.gender) }}</vs-chip> 
                    </p>
                </vs-td>

                <vs-td v-if="views.status.viewable">
                    <p class="product-name font-medium"> 
                      <vs-chip :color="checkStatus(statusCustomer,tr.status)=='Đang chăm sóc' ? 'warning'
                          : checkStatus(statusCustomer,tr.status)=='Thành công' ? 'success'
                          : checkStatus(statusCustomer,tr.status)=='Hủy tư vấn' ? 'danger'
                          : ''">{{ checkStatus(statusCustomer,tr.status) }}</vs-chip> 
                    </p>
                </vs-td>

                <vs-td v-if="views.note.viewable">
                    <p class="product-category">{{ tr.note }}</p>
                </vs-td>

                <vs-td v-if="views.updated_at.viewable">
                    <p class="product-category">{{ tr.updated_at }}</p>
                </vs-td>

                <vs-td v-if="views.created_at.viewable">
                    <p class="product-category">{{ tr.created_at }}</p>
                </vs-td>

                <vs-td v-if="views.action.viewable" class="d-flex-span">
                  <vx-tooltip text="Chuyển thành học viên" position="top">
                    <vs-button radius class="vs-component vs-button vs-button-primary vs-button-filled includeIcon includeIconOnly small" @click="getInfoCustomer(tr.id,'popupConvertCustomer')"><i class="feather icon-repeat"></i></vs-button>
                  </vx-tooltip>
                    <vs-button radius color="primary" size="small" @click="getInfoCustomer(tr.id,'popupEditCustomer')"
                    class="vs-component vs-button vs-button-primary vs-button-filled includeIcon includeIconOnly small"><i class="feather icon-edit"></i></vs-button>
                    <vs-button radius color="danger" size="small" @click="deleteCustomer(tr)" icon="delete_forever"></vs-button>
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
import AddCustomer from './AddCustomer.vue';
import EditCustomer from './EditCustomer.vue';
import ConvertCustomer from './ConvertCustomer.vue';
import {
  mapState
} from 'vuex';

export default {
  components: {
    'add-customer': AddCustomer,
    'edit-customer': EditCustomer,
    'convert-customer': ConvertCustomer
  },
  data() {
    return {
      statusCustomer: this.$store.state.model.customer.status,
      genderCustomer: this.$store.state.model.students.gender,
      customerGetInfo: {},
      activeConfirm: false,
      timer: null,
      selected: [],
      isMounted: false,
      popupAddCustomer: false,
      popupEditCustomer: false,
      popupConvertCustomer: false,
      prev: "<button class=\"vs-pagination--buttons btn-prev-pagination vs-pagination--button-prev\"><i class=\"vs-icon notranslate icon-scale material-icons null\">chevron_left</i></button>",
      next: "<button class=\"vs-pagination--buttons btn-prev-pagination vs-pagination--button-next\"><i class=\"vs-icon notranslate icon-scale material-icons null\">chevron_right</i></button>"
    };
  },
  computed: {
    ...mapState('customers', ['customers', 'pagination', 'searchTerm', 'order', 'views', 'needReload']),
    branchId(){
      return this.$store.state.getBranchId;
    }
  },
  methods: {
    getInfoCustomer(id, popup) {
      const thisIns = this;
      thisIns.$vs.loading({
        color: "#7367F0",
        text: "Loading..."
      });
      thisIns.$http
        .get(`branches/${this.branchId}/customers/${id}`)
        .then(res => {
          thisIns.customerGetInfo = res.data.data;
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
          if(popup == 'popupConvertCustomer'){
            thisIns.popupConvertCustomer = true;
          } else{
            thisIns.popupEditCustomer = true;
          }
          thisIns.$vs.loading.close();
        });
    },
    deleteCustomer(customer) {
      this.$vs.dialog({
        type: 'confirm',
        color: 'danger',
        title: `xóa khách hàng`,
        text: `Bạn có chắc muốn xóa "${customer.name}" không ?`,
        accept: this.customerAlert,
        parameters: [customer.id]
      });
    },
    customerAlert(customer_id) {
      this.$http.delete(`branches/${this.branchId}/customers/${customer_id}`).then(() => {
        this.$vs.notify({
          color: 'success',
          title: 'Xóa khách hàng',
          text: 'Bạn đã xóa thành công',
          icon: 'verified_user',
        });
        this.getData();
      }).catch(() => {
        this.$vs.notify({
          title: 'Error!',
          text: 'Bạn không xóa thành công',
          iconPack: 'feather',
          icon: 'fa fa-lg fa-exclamation-triangle',
          color: 'danger'
        });
      });
    },
    updateViews(index, e) {
      this.$store.dispatch('customers/updateViews', {
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
        color: '#7367F0',
        text: 'Loading...'
      });
      this.$http.get(`branches/${this.branchId}/customers`, {
        params: {
          page: page,
          search: this.searchTerm,
          orderBy: this.order.orderBy,
          sortedBy: this.order.orderType,
        }
      }).then(function (response) {
        thisIns.$store.dispatch('customers/updateTable', {
          customers: thisIns.formatData(response.data.data),
          pagination: response.data.pagination
        });
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
      if (!this.needReload) {
        this.$store.dispatch('customers/updateNeedReload', true);
        return false;
      }
      let thisInt = this;
      this.$store.dispatch('customers/updateSearch', {
        searchTerm: searching
      });
      clearTimeout(this.timer);
      this.timer = setTimeout(function () {
        thisInt.getData();
      }, 500);
    },
    handleSort(key, active) {
      this.$store.dispatch('customers/updateOrder', {
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
    if (this.customers.length === 0) {
      this.getData();
    }
  },
  destroyed() {
    this.$store.dispatch('customers/updateNeedReload', false);
  },
  watch: {
    branchId(){
      this.getData();
      this.$store.dispatch('customers/updateNeedReload', true);
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

.d-flex-span {
    span {
        display: flex;

        button {
            margin: 3px;
        }
    }
}

.vs-component {
    .vs-popup {
        width: 1000px;
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

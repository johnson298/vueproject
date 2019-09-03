<template>
    <div>
        <div class="vs-row">
            <div class="vs-col md:w-1/2 w-full mb-5">
                <vs-input label="Mã học viên" placeholder="Mã ID" class="w-full" disabled/>
            </div>
            <div class="vs-col md:w-1/2 w-full mb-5">
                <vs-input label="Tên khách hàng" v-model="students.name" placeholder="Tên học viên" class="w-full"/>
            </div>
        </div>
        <div class="vs-row">
            <div class="vs-col md:w-1/2 w-full mb-5">
                <vs-input label="Email" v-model="students.email" placeholder="Email" class="w-full"/>
            </div>
            <div class="vs-col md:w-1/2 w-full mb-5">
                <vs-input label="Số điện thoại" v-model="students.phone" placeholder="Số điện thoại" type="number" class="w-full"/>
            </div>
        </div>
        <div class="row">
            <div class="vs-col md:w-1/2 w-full mb-5">
                <vs-input label="Zalo" placeholder="Zalo" v-model="students.zalo" class="w-full"/>
            </div>
            <div class="vs-col md:w-1/2 w-full mb-5">
                <vs-input label="Địa chỉ" placeholder="Địa chỉ" v-model="students.address" class="w-full"/>
            </div>
        </div>
        <div class="vs-row w-full">
            <div class="vs-col md:w-1/2 w-full mb-5">
                <vs-select v-model="students.gender" label="Giới Tính" class="w-full">
                    <vs-select-item :key="item.value" :value="item.value" :text="item.text" v-for="item in gender" />
                </vs-select>
            </div>
            <div class="vs-col md:w-1/2 w-full mb-5">
                <div class="w-full">
                    <label class="vs-input--label">Ngày sinh</label>
                    <datepicker v-model="formatDate" :language="languages[language]" placeholder="Ngày sinh" format="d MMMM yyyy" :value="students.birthday" class="w-full picker-custom"></datepicker>
                </div>
            </div>
        </div>
        <div class="vs-row">
            <div class="vs-col md:w-1/2 w-full mb-5">
                <vs-input label="Facebook" v-model="students.facebook" placeholder="Facebook" class="w-full"/>
            </div>
            <div class="vs-col md:w-1/2 w-full mb-5">
                <div>
                    <div class="vs-component vs-con-input-label vs-input w-full vs-input-primary">
                        <label class="vs-input--label">Chi nhánh</label>
                        <vue-simple-suggest v-model="selectedBranch" mode="select" ref="suggestComponentBranches" placeholder="Search information..." value-attribute="id" display-attribute="name" :list="getBranches" :debounce="200" :filter-by-query="false" @select="onSuggestSelectBranch">
                            <div class="g">
                                <input type="text" placeholder="Search information...">
                            </div>
                            <template slot="misc-item-above" slot-scope="{ suggestions, query }">
                                <div class="misc-item">
                                    <span>You're searching for '{{ query }}'.</span>
                                </div>

                                <template v-if="suggestions.length > 0">
                                    <div class="misc-item">
                                        <span>{{ suggestions.length }} suggestions are shown...</span>
                                    </div>
                                    <hr>
                                </template>

                                <div class="misc-item" v-else-if="!loading">
                                    <span>No results</span>
                                </div>
                            </template>

                            <div slot="suggestion-item" slot-scope="{ suggestion, query }">
                                <div class="text">
                                    <span>{{ suggestion.name | truncate(40) }}</span>
                                </div>
                            </div>

                            <div class="misc-item" slot="misc-item-below" slot-scope="{ suggestions }" v-if="loading">
                                <span>Loading...</span>
                            </div>
                        </vue-simple-suggest>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="vs-col md:w-1/2 w-full mb-5">
                <vs-input label="Mật khẩu" type="password" v-model="students.password" placeholder="Mật khẩu" class="w-full"/>
            </div>
            <div class="vs-col md:w-1/2 w-full mb-5">
                <vs-input label="Nhập lại mật khẩu" v-model="students.password_confirmation" type="password" placeholder="Nhập lại mật khẩu" class="w-full"/>
            </div>
        </div>
        <div class="vs-row">
            <div class="vs-col w-full mb-5">
                <div class="note"><label class="vs-input--label">Nghi chú</label></div>
                <vs-textarea style="border: solid 1px #dddddd" name="note" placeholder="Nghi chú"  type="text" class="w-full" :rows="5" />
            </div>
        </div>
        <vs-col class="mt-5" vs-w='12' vs-type="flex" vs-justify="flex-end">
            <vs-button class="ml-3 vs-con-loading__container" type="filled" color="primary" @click="createStudent">Thêm</vs-button>
            <vs-button class="ml-3" type="filled" color="danger" @click="$emit('update:active',false)">Hủy</vs-button>
        </vs-col>
    </div>
</template>

<script>
import vSelect from 'vue-select';
import Datepicker from 'vuejs-datepicker';
import * as lang from 'vuejs-datepicker/src/locale';
import 'video.js/dist/video-js.css';
export default {
  props: {
    callback: {
      type: Function,
      required: false
    }
  },
  data() {
    return {
      selectedBranch: null,
      loading: false,
      language: "vi",
      languages: lang,
      students: {
        birthday: '',
        email: 'hoangtuan.xl1996@gmail.com',
        name: 'Hoàng',
        password : '',
        password_confirmation : '',
        status:1,
        branch_id : null,
        zalo: '',
        facebook:'',
        gender : 0,
        address : '',
        phone:'',

      },
      gender: this.$store.state.model.students.gender,
    };
  },
  computed: {
    formatDate:{
      get(){
        return this.students.birthday;
      },
      set(val){
        this.students.birthday = this.formatDateUTC(val);
      }
    },
    branchId(){
      return this.$store.state.getBranchId;
    }
  },
  components: {
    'v-select': vSelect,
    Datepicker
  },
  methods: {
    initValues() {
      this.students = {
        birthday: '',
        email: 'hoangtuan.xl1996@gmail.com',
        name: 'Hoàng',
        password : '',
        password_confirmation : '',
        status:1,
        branch_id : null,
        zalo: '',
        facebook:'',
        gender : 0,
        address : '',
        phone:'',
      };
      null;
    },
    onSuggestSelectBranch(suggest) {
      if (suggest) {
        this.students.branch_id = suggest.id;
      }
    },
    getBranches(search = '') {
      let vm = this;
      return new Promise((resolve, reject) => {
        this.$http.get('branches', {
          params: {
            search: search
          }
        })
          .then(function (response) {
            resolve(response.data.data);
          }).catch((e) => {
            vm.loading = false;
            reject(e);
          });
      });
    },
    createStudent() {
      this.$vs.loading({
        background: 'primary',
        color: '#fff',
        container: '#btn-loading',
        scale: 0.45
      });
      this.$http.post('students', {
        email : this.students.email,
        name: this.students.name,
        password : this.students.password,
        password_confirmation : this.students.password_confirmation
      })
        .then(() => {
          this.$vs.notify({
            title: 'Đã thêm mới thành công',
            text: 'OK',
            iconPack: 'feather',
            icon: 'fa fa-lg fa-check-circle',
            color: 'success'
          });
          this.callback();
          this.initValues();
        })
        .catch((error) => {
          if (error.response.status === 500 && error.response.data.error.hasOwnProperty('validation')) {
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
              text: 'Thêm mới thất bại',
              iconPack: 'feather',
              icon: 'fa fa-lg fa-exclamation-triangle',
              color: 'danger'
            });
          }
        }).finally(() => {
          this.$vs.loading.close('#btn-loading > .con-vs-loading');
        });
    },
  }
};
</script>

<style lang="scss" scoped>
    .table-border {
        .vs-table--tbody {
            border: none;

            table {
                th {
                    border: 1px solid #ccc;
                }

                td {
                    border: 1px solid #ccc;
                }
            }
        }
    }

    .d-flex {
        display: flex;
    }

    .d-block {
        display: block
    }

    .pl-0 {
        padding-left: 0;
    }

    .border {
        border: 1px solid #ccc;
    }
</style>

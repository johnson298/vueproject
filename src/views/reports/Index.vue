<template>
  <div>
    <vs-prompt
      title="Export To Excel"
      class="export-options"
      @cancle="clearFields"
      @accept="exportToExcel"
      accept-text="Export"
      @close="clearFields"
      :active.sync="activePrompt">
      <vs-input v-model="fileName" placeholder="Enter File Name.." class="w-full" />
      <v-select v-model="selectedFormat" :options="formats" class="my-4" />
      <div class="flex">
        <span class="mr-4">Cell Auto Width:</span>
        <vs-switch v-model="cellAutoWidth">Cell Auto Width</vs-switch>
      </div>
    </vs-prompt>

    <vs-row class="mb-5">
      <vs-col vs-type="flex" vs-justify="space-between" vs-align="flex-end">
        <vs-switch color="success" v-model="switchBranch">
          <span slot="on">Toàn bộ chi nhánh</span>
          <span slot="off">Một chi nhánh</span>
        </vs-switch>
        <div class="d-flex">
          <flat-pickr v-model="fromDate" placeholder="Từ ngày" />
          <flat-pickr v-model="toDate" placeholder="Đến ngày" class="mx-2" />
          <div class="d-flex" v-if="!switchBranch && branchesAll">
            <v-select
              :options="branchesName(branchesAll)"
              :dir="$vs.rtl ? 'rtl' : 'ltr'"
              placeholder="Chọn chi nhánh"
              class="min-w-300"
              @input="getBranchId($event)"
            />
          </div>
          <vs-button color="success" class="ml-5 px-3" @click="getAllData()">
            <font-awesome-icon icon="filter" />
          </vs-button>
        </div>
      </vs-col>
    </vs-row>
    <vue-card>
      <div slot="title" id="hihi">
        <h4>THÔNG SỐ</h4>
      </div>
      <div class="table-custom p-5" slot="card-body">
        <vs-table :data="usersData">
          <template slot="thead">
            <vs-th bgcolor="#dfe2e5" colspan="2">NHÂN VIÊN</vs-th>
            <vs-th bgcolor="#dfe2e5" colspan="2">HỌC VIÊN</vs-th>
            <vs-th bgcolor="#dfe2e5" colspan="4">LỚP</vs-th>
            <vs-th bgcolor="#dfe2e5" colspan="2">TÀI CHÍNH</vs-th>
            <vs-th bgcolor="#dfe2e5" colspan="4">KHÁCH HÀNG</vs-th>
            <vs-th bgcolor="#dfe2e5" colspan="2">CHIẾN DỊCH</vs-th>
          </template>

          <template>
            <vs-tr>
              <!-- nhân viên -->
              <vs-td class="bg-success text-white">Hoạt động</vs-td>
              <vs-td class="bg-danger text-white">Nghỉ</vs-td>
              <!-- Học viên -->
              <vs-td class="bg-success text-white">Thêm mới</vs-td>
              <vs-td class="bg-warning text-white">Bảo lưu</vs-td>
              <!-- lớp -->
              <vs-td class="bg-primary text-white">Mở</vs-td>
              <vs-td class="bg-warning text-white">Hoạt động</vs-td>
              <vs-td class="bg-success text-white">Hoàn thành</vs-td>
              <vs-td class="bg-danger text-white">Hủy</vs-td>
              <!-- tài chính -->
              <vs-td>Doanh thu</vs-td>
              <vs-td>Chi tiêu</vs-td>
              <!-- khách hàng -->
              <vs-td class="bg-warning text-white">Chờ CS</vs-td>
              <vs-td class="bg-primary text-white">Đang CS</vs-td>
              <vs-td class="bg-success text-white">CS thành công</vs-td>
              <vs-td class="bg-danger text-white">Hủy</vs-td>
              <!-- chiến dịch -->
              <vs-td>Thông báo</vs-td>
              <vs-td>Đánh giá</vs-td>
            </vs-tr>
            <vs-tr>
              <!-- nhân viên -->
              <vs-td>{{ dataMain.employee }}</vs-td>
              <vs-td>{{ dataMain.employee_inactive }}</vs-td>
              <!-- Học viên -->
              <vs-td>{{ dataMain.students }}</vs-td>
              <vs-td>{{ dataMain.reserve }}</vs-td>
              <!-- lớp -->
              <vs-td>{{ dataMain.classes.open }}</vs-td>
              <vs-td>{{ dataMain.classes.in_progress }}</vs-td>
              <vs-td>{{ dataMain.classes.finished }}</vs-td>
              <vs-td>{{ dataMain.classes.closed }}</vs-td>
              <!-- tài chính -->
              <vs-td>{{ dataMain.money.revenues }}</vs-td>
              <vs-td>{{ dataMain.money.expenditures }}</vs-td>
              <!-- khách hàng -->
              <vs-td>{{ dataMain.customer.wait_for_care }}</vs-td>
              <vs-td>{{ dataMain.customer.taking_care_of }}</vs-td>
              <vs-td>{{ dataMain.customer.successful_care }}</vs-td>
              <vs-td>{{ dataMain.customer.cancel_care }}</vs-td>
              <!-- chiến dịch -->
              <vs-td>{{ dataMain.campaign.notification }}</vs-td>
              <vs-td>0</vs-td>
            </vs-tr>
          </template>
        </vs-table>
      </div>
    </vue-card>
    <vue-card class="mt-5">
      <div slot="title">
        <h4>KPI Marketing</h4>
      </div>
      <template slot="card-actions">
        <vx-tooltip text="Xuất dữ liệu">
          <vs-button @click="activePrompt=true; typeExport = 'kpiMarketing'" color="success" size="small"> <vs-icon icon="local_printshop"></vs-icon></vs-button>
        </vx-tooltip>
      </template>
      <div class="table-custom p-5" slot="card-body">
        <vs-table :data="usersData">
          <template slot="thead">
            <vs-th bgcolor="#dfe2e5">TÊN NHÂN VIÊN</vs-th>
            <vs-th bgcolor="#dfe2e5" colspan="5">THÔNG SỐ</vs-th>
          </template>

          <template>
            <vs-tr>
              <vs-td></vs-td>
              <vs-td class="bg-warning text-white">Chờ chăm sóc</vs-td>
              <vs-td class="bg-primary text-white">Đang chăm sóc</vs-td>
              <vs-td class="bg-success text-white">Thành công</vs-td>
              <vs-td class="bg-danger text-white">Hủy tư vấn</vs-td>
              <vs-td>Số tiền (vnđ)</vs-td>
            </vs-tr>
            <vs-tr v-for="(item, index) in dataKpi" :key="index">
              <vs-td rowspan="1">
                <router-link tag="a" :to="'/employees/' + item.userId">{{ item.userName }} ({{ item.userCode }})</router-link>
              </vs-td>
              <vs-td>{{ item.wait_for_care }}</vs-td>
              <vs-td>{{ item.taking_care_of }}</vs-td>
              <vs-td>{{ item.successful_care }}</vs-td>
              <vs-td>{{ item.cancel_care }}</vs-td>
              <vs-td>{{ item.money }}</vs-td>
            </vs-tr>
          </template>
        </vs-table>
      </div>
    </vue-card>
    <vue-card class="mt-5">
      <div slot="title">
        <h4>KPI Giáo viên</h4>
      </div>
      <template slot="card-actions">
        <vx-tooltip text="Xuất dữ liệu">
          <vs-button @click="activePrompt=true; typeExport = 'kpiTeacher'" color="success" size="small"> <vs-icon icon="local_printshop"></vs-icon></vs-button>
        </vx-tooltip>
      </template>
      <div class="table-custom p-5" slot="card-body">
        <vs-table :data="usersData">
          <template slot="thead">
            <vs-th bgcolor="#dfe2e5">TÊN GIÁO VIÊN</vs-th>
            <vs-th bgcolor="#dfe2e5" colspan="5">THÔNG SỐ PHIẾU</vs-th>
          </template>

          <template>
            <vs-tr>
              <vs-td></vs-td>
              <vs-td>Tên đánh gía</vs-td>
              <vs-td class="bg-success text-white">Rất hài lòng</vs-td>
              <vs-td class="bg-primary text-white">Hài lòng</vs-td>
              <vs-td class="bg-danger text-white">Không hài lòng</vs-td>
              <vs-td class="bg-warning text-white">Khác</vs-td>
            </vs-tr>
            <vs-tr v-for="(item, index) in dataKpiTeachers" :key="index">
              <vs-td>
                <router-link tag="a" :to="'/employees/' + item.userId">{{ item.userName }} ({{ item.userCode }})</router-link>
              </vs-td>
              <vs-td>{{ item.evaluateName }} ({{ item.evaluateCode }})</vs-td>
              <vs-td>{{ item.very_pleased }}</vs-td>
              <vs-td>{{ item.satisfied }}</vs-td>
              <vs-td>{{ item.unsatisfied }}</vs-td>
              <vs-td>{{ item.further }}</vs-td>
            </vs-tr>
          </template>
        </vs-table>
      </div>
    </vue-card>
  </div>
</template>

<script>
import vSelect from 'vue-select';
import flatPickr from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";
import axios from "axios";
export default {
  components: {
    flatPickr,
    vSelect
  },
  data() {
    return {
      // export
      typeExport: null,
      fileName: "",
      formats:["xlsx", "csv", "txt"] ,
      cellAutoWidth: true,
      selectedFormat: "xlsx",
      headerTitleKpiMarketing: ['Id nhân viên', 'Mã NV', 'Tên NV','Chờ chăm sóc', 'Đang chăm sóc', 'Thành công', 'Hủy tư vấn', 'Số tiền'],
      headerValKpiMarketing: ["userId", "userCode", "userName","wait_for_care", "taking_care_of", "successful_care", "cancel_care", "money"],
      headerTitleKpiTeacher: ['Id giáo viên', 'Mã giáo viên', 'Tên giáo viên', 'Tên Đánh giá', 'Rất hài lòng', 'Hài lòng', 'Không hài lòng', 'Khác'],
      headerValKpiTeacher: ['userId', "userCode", "userName", "evaluateName", "very_pleased","satisfied", "unsatisfied", "further"],
      // return data
      activePrompt: false,
      switchBranch: true,
      changeBranchPopup: false,
      branchName: null,
      branches: null,
      fromDate: "",
      toDate: "",
      branchId: "",
      usersData: [
        {
          id: 8,
          name: "Nicholas Runolfsdottir V",
          username: "Maxime_Nienow",
          email: "Sherwood@rosamond.me",
          website: "jacynthe.com"
        }
      ],
      dataMain: {
        employee: 0,
        employee_inactive: 0,
        students: 0,
        reserve: 0,
        classes: {
          open: 0,
          in_progress: 0,
          finished: 0,
          closed: 0
        },
        money: {
          revenues: 0,
          expenditures: 0
        },
        customer: {
          wait_for_care: 0,
          taking_care_of: 0,
          successful_care: 0,
          cancel_care: 0
        },
        campaign: {
          notification: 0
        }
      },
      dataKpi: [
        {
          wait_for_care: 0,
          taking_care_of: 0,
          successful_care: 0,
          cancel_care: 0,
          money: 0,
          userId: null,
          userName: null,
          userCode: null
        }
      ],
      dataKpiTeachers: [
        {
          further: 0,
          unsatisfied: 0,
          very_pleased: 0,
          satisfied: 0,
          userId: null,
          userName: null,
          userCode: null,
          evaluateId: null,
          evaluateName: null,
          evaluateCode: null
        }
      ]
    };
  },
  computed: {
    branchesAll() {
      return this.$store.state.branches;
    }
  },
  created() {
    this.getAllData();
  },
  methods: {
    exportToExcel() {
      switch (this.typeExport) {
      case "kpiMarketing":
        import('../../vendor/Export2Excel').then(excel => {
          const list = this.dataKpi;
          const data = this.formatJson(this.headerValKpiMarketing, list);
          excel.export_json_to_excel({
            header: this.headerTitleKpiMarketing,
            data,
            filename: this.fileName,
            autoWidth: this.cellAutoWidth,
            bookType: this.selectedFormat
          });
          this.clearFields();
        });
        break;
      case 'kpiTeacher':
        import('../../vendor/Export2Excel').then(excel => {
          const list = this.dataKpiTeachers;
          const data = this.formatJson(this.headerValKpiTeacher, list);
          excel.export_json_to_excel({
            header: this.headerTitleKpiTeacher,
            data,
            filename: this.fileName,
            autoWidth: this.cellAutoWidth,
            bookType: this.selectedFormat
          });
          this.clearFields();
        });
        break;
      default:
        break;
      }

    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => {
        // Add col name which needs to be translated
        // if (j === 'timestamp') {
        //   return parseTime(v[j])
        // } else {
        //   return v[j]
        // }

        return v[j];
      }));
    },
    clearFields() {
      this.filename = "";
      this.cellAutoWidth = true;
      this.selectedFormat = "xlsx";
    },
    getAllData() {
      axios.all([this.getData(), this.getKpi(), this.getKpiTeachers()]);
    },
    getKpi() {
      const thisIns = this;
      let url = thisIns.switchBranch
        ? `report_kpi?from=${thisIns.fromDate}&to=${thisIns.toDate}`
        : `report_kpi?branch=${thisIns.branchId}&from=${thisIns.fromDate}&to=${thisIns.toDate}`;

      this.$http
        .get(url)
        .then(response => {
          thisIns.dataKpi = response.data.data.map(item => ({
            wait_for_care: item.wait_for_care,
            taking_care_of: item.taking_care_of,
            successful_care: item.successful_care,
            cancel_care: item.cancel_care,
            money: item.money,
            userId: item.user.id,
            userName: item.user.name,
            userCode: item.user.code
          }));
        })
        .catch(function(error) {
          thisIns.checkResponRequest(error.response.data);
        });
    },
    getKpiTeachers() {
      const thisIns = this;
      let url = thisIns.switchBranch
        ? `report_kpi_teacher?from=${thisIns.fromDate}&to=${thisIns.toDate}`
        : `report_kpi_teacher?branch=${thisIns.branchId}&from=${thisIns.fromDate}&to=${thisIns.toDate}`;

      this.$http
        .get(url)
        .then(response => {
          thisIns.dataKpiTeachers = response.data.data.map(item => ({
            further: item.further,
            unsatisfied: item.unsatisfied,
            very_pleased: item.very_pleased,
            satisfied: item.satisfied,
            userId: item.user.id,
            userName: item.user.name,
            userCode: item.user.code,
            evaluateId: item.evaluate.id,
            evaluateName: item.evaluate.name,
            evaluateCode: item.evaluate.code
          }));
        })
        .catch(function(error) {
          thisIns.checkResponRequest(error.response.data);
        });
    },
    getData() {
      const thisIns = this;
      thisIns.$vs.loading({
        color: "#1E6DB5",
        text: "Loading..."
      });
      let url = thisIns.switchBranch
        ? `report?from=${thisIns.fromDate}&to=${thisIns.toDate}`
        : `report?branch=${thisIns.branchId}&from=${thisIns.fromDate}&to=${thisIns.toDate}`;

      this.$http
        .get(url)
        .then(response => {
          thisIns.dataMain = response.data.data;
        })
        .catch(function(error) {
          thisIns.checkResponRequest(error.response.data);
        })
        .finally(function() {
          thisIns.$vs.loading.close();
        });
    },
    branchesName(arr) {
      return arr.map(e => e.name);
    },
    getBranchId(event) {
      let arrName = this.branchesAll.map(e => e.name);
      let arrId = this.branchesAll.map(e => e.id);
      for (let i = 0; i <= arrName.length; i++) {
        if (arrName[i] === event) {
          this.branchId = arrId[i];
        }
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.flatpickr-input[readonly] {
  cursor: pointer;
}

.flatpickr-input {
  padding: 0.7rem;
  font-size: 1rem;
  border-radius: 5px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  color: #626262;
}
.h-100 {
  height: 100%;
  .vx-card {
    height: 100%;
  }
}
.min-w-300 {
  min-width: 300px;
}
</style>

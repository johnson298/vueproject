<template>
  <div id="dashboard-analytics">
    <div class="vx-row">
      <!-- hello+user -->
      <HelloUser></HelloUser>

      <!-- CARD 2: thông kê nhân viên -->
      <div class="vx-col w-full sm:w-1/2 md:w-1/2 lg:w-1/4 xl:w-1/4 mb-base">
        <TotalEmployees :usersCount="dataStatistics.users_count" />
      </div>
      <div class="vx-col w-full sm:w-1/2 md:w-1/2 lg:w-1/4 xl:w-1/4 mb-base">
        <TotalCustomer :customerCount="dataStatistics.customers_count" />
      </div>
      <!-- CARD 3: thông kê học viên -->
    </div>

    <div class="vx-row">
      <vs-col class="sm:w-full md:w-1/3 mb-base">
        <TotalCourses :classes="dataTotalCourses" />
      </vs-col>
      <vs-col class="sm:w-full md:w-2/3 mb-base">
        <TotalStudents />
      </vs-col>
    </div>

    <div class="vx-row">
      <!-- LINE CHART -->
      <div class="vx-col w-full md:w-2/3 mb-base">
        <TotalRevenueExpenditure :money="totalMoney" />
      </div>
      <!-- RADIAL CHART -->
      <div class="vx-col w-full md:w-1/3 mb-base">
        <vue-card title="Tổng thu chi">
          <div slot="card-body">
            <div class="mt-10">
              <vue-apex-charts
                type="radialBar"
                height="240"
                :options="analyticsData.goalOverviewRadialBar.chartOptions"
                :series="totalMoney"
              />
            </div>
            <!-- DATA -->
            <div class="flex justify-between text-center" slot="no-body-bottom">
              <div
                class="w-1/2 border border-solid d-theme-border-grey-light border-r-0 border-b-0 border-l-0 py-1"
              >
                <p>Thu</p>
                <p class="text-xl font-semibold">
                  {{ formatShortMoney(dataStatistics.money.revenues) }}
                </p>
              </div>
              <div
                class="w-1/2 border border-solid d-theme-border-grey-light border-r-0 border-b-0 py-1"
              >
                <p>Chi Tiêu</p>
                <p class="text-xl font-semibold">
                  {{ formatShortMoney(dataStatistics.money.expenditures) }}
                </p>
              </div>
            </div>
          </div>
        </vue-card>
      </div>
    </div>
    <div class="vx-row mt-5 px-4">
      <TableEmployees :usersLatest="dataStatistics.latest.users" />
    </div>
    <div class="vx-row mt-5 px-4">
      <TableStudents :studentsLatest="dataStatistics.latest.students" />
    </div>
    <div class="vx-row mt-5 px-4">
      <TableCustomer :customersLatest="dataStatistics.latest.customers" />
    </div>
  </div>
</template>

<script>
import VueApexCharts from "vue-apexcharts";
import StatisticsCardLine from "@/components/statistics-cards/StatisticsCardLine.vue";
import analyticsData from "./card/card/analyticsData.js";
import HelloUser from "./dashboard/hello_user/HelloUser.vue";
import TotalEmployees from "./dashboard/employees/TotalEmployees.vue";
import TotalStudents from "./dashboard/students/TotalSudents.vue";
import TotalPrograms from "./dashboard/programs/TotalPrograms.vue";
import TotalCourses from "./dashboard/courses/TotalCourses.vue";
import TotalCustomer from "./dashboard/customer/TotalCustomer.vue";
import TableEmployees from "./dashboard/employees/NewEmployees.vue";
import TableStudents from "./dashboard/students/NewStudents.vue";
import TableCustomer from "./dashboard/customer/NewCustomer.vue";
import TotalRevenueExpenditure from "./dashboard/revenue_expenditure/TotalRevenueExpenditure.vue";

export default {
  data() {
    return {
      analyticsData: analyticsData,
      navbarSearchAndPinList: this.$store.state.navbarSearchAndPinList,
      dataTotalCourses: null,
      totalMoney: [0],
      dataStatistics: {
        users_count: 0,
        customers_count: 0,
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
        latest: {
          users: null,
          students: null,
          customers: null
        }
      }
    };
  },
  components: {
    analyticsData,
    VueApexCharts,
    StatisticsCardLine,
    HelloUser,
    TotalEmployees,
    TotalStudents,
    TotalPrograms,
    TotalCourses,
    TotalCustomer,
    TableEmployees,
    TableStudents,
    TableCustomer,
    TotalRevenueExpenditure
  },
  computed: {
    user_displayName() {
      return JSON.parse(localStorage.getItem("user")).name || "Guest";
    },
    branchId() {
      return this.$store.state.getBranchId;
    }
  },
  created() {
    this.getData();
  },
  watch: {
    branchId() {
      this.getData();
    }
  },
  methods: {
    getData() {
      const thisIns = this;
      thisIns.$vs.loading({
        color: "#1E6DB5",
        text: "Loading..."
      });
      this.$http
        .get(`branches/${this.branchId}/statistics/main`)
        .then(function(response) {
          thisIns.dataStatistics = response.data.data;
          thisIns.dataTotalCourses = {
            labels: ["Chờ mở", "Đang mở", "Hoàn thành", "Hủy"],
            datasets: [
              {
                label: "Biểu đồ lớp học",
                backgroundColor: ["#FF9F43", "#1E6DB5", "#28C76F", "#EA5455"],
                data: Object.values(response.data.data.classes)
              }
            ]
          };
          thisIns.totalMoney = [
            Math.ceil(
              (parseFloat(response.data.data.money.revenues) * 100) /
                                (parseFloat(response.data.data.money.revenues) +
                                    parseFloat(response.data.data.money.expenditures))
            ) || 0
          ];
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
    }
  },
  beforeMount() {
    let infoUser = JSON.parse(localStorage.getItem('user'));
    if (infoUser.position !== 1){
      this.$vs.notify({
        title: "Lỗi phân quyền !",
        text: 'Bạn không có quyền xem trang thống kê',
        color: "danger",
        iconPack: "feather",
        icon: "icon-alert-circle"
      });
      this.$router.push(`/employees/${infoUser.id}`);
    }
  }
};
</script>

<style lang="scss">
  #dashboard-analytics {
    .greet-user {
      position: relative;
      .decore-left {
        position: absolute;
        left: 0;
        top: 0;
      }
      .decore-right {
        position: absolute;
        right: 0;
        top: 0;
      }
    }
    @media (max-width: 576px) {
      .decore-left,
      .decore-right {
        width: 140px;
      }
    }
  }
</style>

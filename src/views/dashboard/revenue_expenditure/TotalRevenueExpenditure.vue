<template>
  <div class="h-100">
    <vs-popup class="holamundo" title="Chọn ngày thống kê" :active.sync="popupActiveDate">
      <vs-row>
        <vs-col vs-w="12" vs-type="flex" vs-justify="center" class="picker-custom">
          <flat-pickr v-model="fromDate" placeholder="Từ ngày" class="mr-3" />
          <flat-pickr v-model="toDate" placeholder="Đến  ngày" class="mr-3" />
          <vs-button color="primary" @click="getDataByDate">Xem</vs-button>
        </vs-col>
      </vs-row>
    </vs-popup>
    <vs-popup class="holamundo" title="Chọn tháng thống kê" :active.sync="popupActiveMonth">
      <vs-row>
        <vs-col vs-w="12" vs-type="flex" vs-justify="center" class="picker-custom">
          <flat-pickr v-model="fromMonth" placeholder="Từ ngày" class="mr-3" />
          <flat-pickr v-model="toMonth" placeholder="Đến  ngày" class="mr-3" />
          <vs-button color="primary" @click="getDataByDate">Xem</vs-button>
        </vs-col>
      </vs-row>
    </vs-popup>
    <vs-popup class="holamundo" title="Chọn năm thống kê" :active.sync="popupActiveYear">
      <vs-row>
        <vs-col vs-w="12" vs-type="flex" vs-justify="center" class="picker-custom">
          <flat-pickr v-model="fromYear" placeholder="Từ ngày" class="mr-3" />
          <flat-pickr v-model="toYear" placeholder="Đến  ngày" class="mr-3" />
          <vs-button color="primary" @click="getDataByDate">Xem</vs-button>
        </vs-col>
      </vs-row>
    </vs-popup>

    <vue-card class="h-100">
      <div slot="title">
        <h4>Thu (theo {{ typeChart }})</h4>
      </div>
      <div slot="card-actions">
        <vs-dropdown vs-trigger-click class="cursor-pointer mr-3">
          <small class="flex cursor-pointer">
            Chọn biểu đồ
            <feather-icon icon="PieChartIcon" svgClasses="h-4 w-4" class="ml-1"></feather-icon>
          </small>
          <vs-dropdown-menu class="w-32">
            <vs-dropdown-item @click="day">Theo ngày</vs-dropdown-item>
            <vs-dropdown-item @click="month">Theo tháng</vs-dropdown-item>
            <vs-dropdown-item @click="year">Theo năm</vs-dropdown-item>
          </vs-dropdown-menu>
        </vs-dropdown>
        <vs-dropdown vs-trigger-click class="cursor-pointer">
          <small class="flex cursor-pointer">
            Chọn thời gian
            <feather-icon icon="SettingsIcon" svgClasses="h-4 w-4" class="ml-1"></feather-icon>
          </small>
          <vs-dropdown-menu class="w-32">
            <vs-dropdown-item @click="chooseDate('day')">Chọn ngày</vs-dropdown-item>
            <vs-dropdown-item @click="chooseDate('month')">Chọn tháng</vs-dropdown-item>
            <vs-dropdown-item @click="chooseDate('year')">Chọn năm</vs-dropdown-item>
          </vs-dropdown-menu>
        </vs-dropdown>
      </div>
      <div slot="card-body" class="pt-6">
        <div v-if="last_day">
          <vue-apex-charts
            v-if="revenueComparisonLineDay"
            type="line"
            height="266"
            :options="revenueComparisonLineDay.chartOptions"
            :series="revenueComparisonLineDay.series"
          />
        </div>
        <div v-if="last_month">
          <vue-apex-charts
            v-if="revenueComparisonLineMonth"
            type="line"
            height="266"
            :options="revenueComparisonLineMonth.chartOptions"
            :series="revenueComparisonLineMonth.series"
          />
        </div>
        <div v-if="last_year">
          <vue-apex-charts
            v-if="revenueComparisonLineYear"
            type="line"
            height="266"
            :options="revenueComparisonLineYear.chartOptions"
            :series="revenueComparisonLineYear.series"
          />
        </div>
      </div>
    </vue-card>
  </div>
</template>
<script>
import VueApexCharts from "vue-apexcharts";
import StatisticsCardLine from "@/components/statistics-cards/StatisticsCardLine.vue";
import ChangeTimeDurationDropdown from "../ChangeTimeDurationDropdown.vue";
import flatPickr from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";
export default {
  props: {
    money: {
      default: null
    }
  },
  data() {
    return {
      typeChart: "Ngày",
      revenueComparisonLineDay: null,
      revenueComparisonLineMonth: null,
      revenueComparisonLineYear: null,
      popupActiveDate: false,
      popupActiveMonth: false,
      popupActiveYear: false,
      fromDate: "",
      toDate: "",
      fromMonth: "",
      toMonth: "",
      fromYear: "",
      toYear: "",
      dataStatistic: [],
      last_day: true,
      last_month: false,
      last_year: false,
      type: "day"
    };
  },
  computed: {
    branchId() {
      return this.$store.state.getBranchId;
    }
  },
  watch: {
    branchId() {
      this.getData();
      this.getDataMonth();
      this.getDataYear();
    }
  },
  components: {
    VueApexCharts,
    StatisticsCardLine,
    ChangeTimeDurationDropdown,
    flatPickr
  },
  created() {
    this.getData();
    this.getDataMonth();
    this.getDataYear();
  },
  methods: {
    chooseDate(type) {
      switch (type) {
      case "day":
        this.popupActiveDate = true;
        break;
      case "month":
        this.popupActiveMonth = true;
        break;
      case "year":
        this.popupActiveYear = true;
        break;
      default:
        break;
      }
      this.type = type;
    },
    getDataByDate() {
      let days_between = (date1, date2) => {
        const ONE_DAY = 1000 * 60 * 60 * 24;
        const differenceMs = Math.abs(date1 - date2);
        return Math.round(differenceMs / ONE_DAY);
      };
      if (this.type == "day") {
        if (
          days_between(new Date(this.fromDate), new Date(this.toDate)) <= 30
        ) {
          this.getData();
          this.popupActiveDate = false;
        } else {
          this.$vs.notify({
            title: "Lỗi",
            text: "Chỉ chọn từ 1 đến 30 ngày",
            color: "danger"
          });
        }
      }
      if (this.type == "month") {
        if (
          days_between(new Date(this.fromMonth), new Date(this.toMonth)) <= 365
        ) {
          this.getDataMonth();
          this.popupActiveMonth = false;
        } else {
          this.$vs.notify({
            title: "Lỗi",
            text: "Chỉ từ 1 đến 12 tháng",
            color: "danger"
          });
        }
      }
      if (this.type == "year") {
        this.getDataYear();
        this.popupActiveYear = false;
      }
    },
    day() {
      this.last_day = true;
      this.last_month = false;
      this.last_year = false;
      this.typeChart = "Ngày";
    },
    month() {
      this.last_year = false;
      this.last_month = true;
      this.last_day = false;
      this.typeChart = "Tháng";
    },
    year() {
      this.last_day = false;
      this.last_month = false;
      this.last_year = true;
      this.typeChart = "Năm";
    },
    getData() {
      let vm = this;
      vm.revenueComparisonLineDay
        ? (vm.revenueComparisonLineDay.series = [])
        : "";
      vm.revenueComparisonLineDay
        ? (vm.revenueComparisonLineDay.chartOptions.xaxis.categories = [])
        : "";
      var url = null;
      if (this.fromDate && this.toDate) {
        url = `branches/${vm.branchId}/statistics/cost?mode=day&from=${this.fromDate}&to=${this.toDate}`;
      } else {
        url = `branches/${vm.branchId}/statistics/cost?mode=day`;
      }
      vm.$http.get(url).then(function(response) {
        let dataMoney = response.data.data;
        vm.revenueComparisonLineDay = {
          series: [
            {
              name: "Đã thu",
              data: [...dataMoney.map(item => item.sum)]
            }
          ],
          chartOptions: {
            chart: {
              toolbar: { show: false }
            },
            stroke: {
              curve: "smooth",
              dashArray: [0, 8],
              width: [4, 2]
            },
            grid: {
              borderColor: "#e7e7e7"
            },
            legend: {
              show: false
            },
            colors: ["#F97794", "#b8c2cc", "#F97794"],
            fill: {
              type: "gradient",
              gradient: {
                shade: "dark",
                inverseColors: false,
                gradientToColors: ["#1E6DB5", "#b8c2cc", "#F97794"],
                shadeIntensity: 1,
                type: "horizontal",
                opacityFrom: 1,
                opacityTo: 1,
                stops: [0, 100, 100, 100]
              }
            },
            markers: {
              size: 0,
              hover: {
                size: 5
              }
            },
            xaxis: {
              labels: {
                style: {
                  cssClass: "text-grey fill-current"
                }
              },
              axisTicks: {
                show: false
              },
              categories: [...dataMoney.map(item => item.date)],
              axisBorder: {
                show: true
              }
            },
            yaxis: {
              tickAmount: 5,
              labels: {
                style: {
                  cssClass: "text-grey fill-current"
                },
                formatter: function(val) {
                  if (val >= 1000000000) {
                    return (
                      (val / 1000000000).toFixed(1).replace(/\.0$/, "") + "Tỷ"
                    );
                  }
                  if (val >= 1000000) {
                    return (
                      (val / 1000000).toFixed(1).replace(/\.0$/, "") + "Triệu"
                    );
                  }
                  if (val >= 1000) {
                    return (
                      (val / 1000).toFixed(1).replace(/\.0$/, "") + "Nghìn"
                    );
                  }
                  return val;
                }
              }
            },
            tooltip: {
              x: { show: false }
            }
          }
        };
      });
    },
    getDataMonth() {
      let vm = this;
      vm.revenueComparisonLineMonth
        ? (vm.revenueComparisonLineMonth.series = [])
        : "";
      vm.revenueComparisonLineMonth
        ? (vm.revenueComparisonLineMonth.chartOptions.xaxis.categories = [])
        : "";
      var url = null;
      if (this.fromMonth && this.toMonth) {
        url = `branches/${vm.branchId}/statistics/cost?mode=month&from=${this.fromMonth}&to=${this.toMonth}`;
      } else {
        url = `branches/${vm.branchId}/statistics/cost?mode=month`;
      }
      vm.$http.get(url).then(function(response) {
        let dataMoney = response.data.data;
        vm.revenueComparisonLineMonth = {
          series: [
            {
              name: "Đã thu",
              data: [...dataMoney.map(item => item.sum)]
            }
          ],
          chartOptions: {
            chart: {
              toolbar: { show: false }
            },
            stroke: {
              curve: "smooth",
              dashArray: [0, 8],
              width: [4, 2]
            },
            grid: {
              borderColor: "#e7e7e7"
            },
            legend: {
              show: false
            },
            colors: ["#F97794", "#b8c2cc", "#F97794"],
            fill: {
              type: "gradient",
              gradient: {
                shade: "dark",
                inverseColors: false,
                gradientToColors: ["#1E6DB5", "#b8c2cc", "#F97794"],
                shadeIntensity: 1,
                type: "horizontal",
                opacityFrom: 1,
                opacityTo: 1,
                stops: [0, 100, 100, 100]
              }
            },
            markers: {
              size: 0,
              hover: {
                size: 5
              }
            },
            xaxis: {
              labels: {
                style: {
                  cssClass: "text-grey fill-current"
                }
              },
              axisTicks: {
                show: false
              },
              categories: [...dataMoney.map(item => item.date)],
              axisBorder: {
                show: true
              }
            },
            yaxis: {
              tickAmount: 5,
              labels: {
                style: {
                  cssClass: "text-grey fill-current"
                },
                formatter: function(val) {
                  if (val >= 1000000000) {
                    return (
                      (val / 1000000000).toFixed(1).replace(/\.0$/, "") + "Tỷ"
                    );
                  }
                  if (val >= 1000000) {
                    return (
                      (val / 1000000).toFixed(1).replace(/\.0$/, "") + "Triệu"
                    );
                  }
                  if (val >= 1000) {
                    return (
                      (val / 1000).toFixed(1).replace(/\.0$/, "") + "Nghìn"
                    );
                  }
                  return val;
                }
              }
            },
            tooltip: {
              x: { show: false }
            }
          }
        };
      });
    },
    getDataYear() {
      let vm = this;
      vm.revenueComparisonLineYear
        ? (vm.revenueComparisonLineYear.series = [])
        : "";
      vm.revenueComparisonLineYear
        ? (vm.revenueComparisonLineYear.chartOptions.xaxis.categories = [])
        : "";
      var url = null;
      if (this.fromYear && this.toYear) {
        url = `branches/${vm.branchId}/statistics/cost?mode=year&from=${this.fromYear}&to=${this.toYear}`;
      } else {
        url = `branches/${vm.branchId}/statistics/cost?mode=year`;
      }
      vm.$http.get(url).then(function(response) {
        let dataMoney = response.data.data;
        vm.revenueComparisonLineYear = {
          series: [
            {
              name: "Đã thu",
              data: [...dataMoney.map(item => item.sum)]
            }
          ],
          chartOptions: {
            chart: {
              toolbar: { show: false }
            },
            stroke: {
              curve: "smooth",
              dashArray: [0, 8],
              width: [4, 2]
            },
            grid: {
              borderColor: "#e7e7e7"
            },
            legend: {
              show: false
            },
            colors: ["#F97794", "#b8c2cc", "#F97794"],
            fill: {
              type: "gradient",
              gradient: {
                shade: "dark",
                inverseColors: false,
                gradientToColors: ["#1E6DB5", "#b8c2cc", "#F97794"],
                shadeIntensity: 1,
                type: "horizontal",
                opacityFrom: 1,
                opacityTo: 1,
                stops: [0, 100, 100, 100]
              }
            },
            markers: {
              size: 0,
              hover: {
                size: 5
              }
            },
            xaxis: {
              labels: {
                style: {
                  cssClass: "text-grey fill-current"
                }
              },
              axisTicks: {
                show: false
              },
              categories: [...dataMoney.map(item => item.date)],
              axisBorder: {
                show: true
              }
            },
            yaxis: {
              tickAmount: 5,
              labels: {
                style: {
                  cssClass: "text-grey fill-current"
                },
                formatter: function(val) {
                  if (val >= 1000000000) {
                    return (
                      (val / 1000000000).toFixed(1).replace(/\.0$/, "") + "Tỷ"
                    );
                  }
                  if (val >= 1000000) {
                    return (
                      (val / 1000000).toFixed(1).replace(/\.0$/, "") + "Triệu"
                    );
                  }
                  if (val >= 1000) {
                    return (
                      (val / 1000).toFixed(1).replace(/\.0$/, "") + "Nghìn"
                    );
                  }
                  return val;
                }
              }
            },
            tooltip: {
              x: { show: false }
            }
          }
        };
      });
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
</style>

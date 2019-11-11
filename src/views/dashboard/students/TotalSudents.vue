<template>
  <div class="h-100">
    <vs-popup
      class="holamundo"
      title="Chọn ngày thống kê"
      :active.sync="popupActiveDate"
    >
      <vs-row>
        <vs-col
          vs-w="12"
          vs-type="flex"
          vs-justify="center"
          class="picker-custom"
        >
          <flat-pickr v-model="fromDate" placeholder="Từ ngày" class="mr-3" />
          <flat-pickr v-model="toDate" placeholder="Đến  ngày" class="mr-3" />
          <vs-button color="primary" @click="getDataSearch">Xem</vs-button>
        </vs-col>
      </vs-row>
    </vs-popup>
    <vs-popup
      class="holamundo"
      title="Chọn tháng thống kê"
      :active.sync="popupActiveMonth"
    >
      <vs-row>
        <vs-col
          vs-w="12"
          vs-type="flex"
          vs-justify="center"
          class="picker-custom"
        >
          <flat-pickr v-model="fromMonth" placeholder="Từ ngày" class="mr-3" />
          <flat-pickr v-model="toMonth" placeholder="Đến  ngày" class="mr-3" />
          <vs-button color="primary" @click="getDataSearch">Xem</vs-button>
        </vs-col>
      </vs-row>
    </vs-popup>
    <vs-popup
      class="holamundo"
      title="Chọn năm thống kê"
      :active.sync="popupActiveYear"
    >
      <vs-row>
        <vs-col
          vs-w="12"
          vs-type="flex"
          vs-justify="center"
          class="picker-custom"
        >
          <flat-pickr v-model="fromYear" placeholder="Từ ngày" class="mr-3" />
          <flat-pickr v-model="toYear" placeholder="Đến  ngày" class="mr-3" />
          <vs-button color="primary" @click="getDataSearch">Xem</vs-button>
        </vs-col>
      </vs-row>
    </vs-popup>
    <vue-card class="h-100">
      <div slot="title">
        <h4>Học viên thêm mới (theo {{ typeChart }})</h4>
      </div>
      <div slot="card-actions" class="d-flex">
        <vs-dropdown vs-trigger-click class="cursor-pointer mr-3">
          <small class="flex cursor-pointer">
            Chọn biểu đồ
            <feather-icon
              icon="PieChartIcon"
              svgClasses="h-4 w-4"
              class="ml-1"
            ></feather-icon>
          </small>
          <vs-dropdown-menu class="w-32">
            <vs-dropdown-item @click="day">Theo ngày</vs-dropdown-item>
            <vs-dropdown-item @click="month">Theo tháng</vs-dropdown-item>
            <vs-dropdown-item @click="year">Theo năm</vs-dropdown-item>
          </vs-dropdown-menu>
        </vs-dropdown>
        <!-- <vs-dropdown vs-trigger-click class="cursor-pointer"> -->
        <span
          class="flex cursor-pointer"
          v-if="last_day"
          @click="chooseDate('day')"
        >
          Chọn thời gian
          <feather-icon
            icon="SettingsIcon"
            svgClasses="h-4 w-4"
            class="ml-1"
          ></feather-icon>
        </span>
        <span
          class="flex cursor-pointer"
          v-if="last_month"
          @click="chooseDate('month')"
        >
          Chọn thời gian
          <feather-icon
            icon="SettingsIcon"
            svgClasses="h-4 w-4"
            class="ml-1"
          ></feather-icon>
        </span>
        <span
          class="flex cursor-pointer"
          v-if="last_year"
          @click="chooseDate('year')"
        >
          Chọn thời gian
          <feather-icon
            icon="SettingsIcon"
            svgClasses="h-4 w-4"
            class="ml-1"
          ></feather-icon>
        </span>
      </div>
      <div slot="card-body">
        <template slot="actions">
          <feather-icon
            icon="SettingsIcon"
            svgClasses="w-6 h-6 text-grey"
          ></feather-icon>
        </template>
        <div slot="no-body" class="p-6 pb-0">
          <div v-if="last_day">
            <vue-apex-charts
              v-if="dataDate"
              type="line"
              height="266"
              :options="dataDate.chartOptions"
              :series="dataDate.series"
            />
          </div>
          <div v-if="last_month">
            <vue-apex-charts
              v-if="dataMonth"
              type="line"
              height="266"
              :options="dataMonth.chartOptions"
              :series="dataMonth.series"
            />
          </div>
          <div v-if="last_year">
            <vue-apex-charts
              v-if="dataYear"
              type="line"
              height="266"
              :options="dataYear.chartOptions"
              :series="dataYear.series"
            />
          </div>
        </div>
      </div>
    </vue-card>
  </div>
</template>

<script>
import VueApexCharts from "vue-apexcharts";
import flatPickr from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";
export default {
  data() {
    return {
      typeChart: "Ngày",
      dataDate: null,
      dataMonth: null,
      dataYear: null,
      popupActiveDate: false,
      popupActiveMonth: false,
      popupActiveYear: false,
      fromDate: "",
      toDate: "",
      fromMonth: "",
      toMonth: "",
      fromYear: "",
      toYear: "",
      last_day: true,
      last_month: false,
      last_year: false,
      type: "day",
    };
  },
  created() {
    this.getData();
    this.getDataMonth();
    this.getDataYear();
  },
  computed: {
    branchId() {
      return this.$store.state.getBranchId;
    }
  },
  watch: {
    branchId(){
      this.getData();
      this.getDataMonth();
      this.getDataYear();
    }
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
    getDataSearch() {
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
      var url = null;
      if (this.fromDate && this.toDate) {
        url = `branches/${vm.branchId}/statistics/student?mode=day&from=${this.fromDate}&to=${this.toDate}`;
      } else {
        url = `branches/${vm.branchId}/statistics/student?mode=day`;
      }
      vm.$http
        .get(url)
        .then(function(response) {
          let dataRespon = response.data.data;
          vm.dataDate = {
            chartOptions: {
              chart: {
                toolbar: {
                  show: false
                },
                dropShadow: {
                  enabled: true,
                  top: 20,
                  left: 2,
                  blur: 6,
                  opacity: 0.2
                }
              },
              stroke: {
                curve: "smooth",
                width: 4
              },
              grid: {
                borderColor: "#50d18a38"
              },
              legend: {
                show: false
              },
              colors: ["#df87f2"],
              fill: {
                type: "gradient",
                gradient: {
                  shade: "dark",
                  inverseColors: true,
                  gradientToColors: ["#28C76F"],
                  shadeIntensity: 5,
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
                categories: [...dataRespon.map(item => item.created_at)]
              },
              yaxis: {
                tickAmount: 5,
                labels: {
                  style: {
                    cssClass: "text-grey fill-current"
                  }
                }
              },
              tooltip: {
                x: {
                  show: true
                }
              }
            },
            series: [
              {
                name: "Số học viên",
                data: [...dataRespon.map(item => item.sum)]
              }
            ]
          };
        });
    },
    getDataMonth() {
      let vm = this;
      var url = null;
      if (this.fromMonth && this.toMonth) {
        url = `branches/${vm.branchId}/statistics/student?mode=month&from=${this.fromMonth}&to=${this.toMonth}`;
      } else {
        url = `branches/${vm.branchId}/statistics/student?mode=month`;
      }
      vm.$http.get(url).then(function(response) {
        let dataRespon = response.data.data;
        vm.dataMonth = {
          chartOptions: {
            chart: {
              toolbar: {
                show: false
              },
              dropShadow: {
                enabled: true,
                top: 20,
                left: 2,
                blur: 6,
                opacity: 0.2
              }
            },
            stroke: {
              curve: "smooth",
              width: 4
            },
            grid: {
              borderColor: "#ebebeb"
            },
            legend: {
              show: false
            },
            colors: ["#df87f2"],
            fill: {
              type: "gradient",
              gradient: {
                shade: "dark",
                inverseColors: true,
                gradientToColors: ["#28C76F"],
                shadeIntensity: 5,
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
            yaxis: {
              tickAmount: 5,
              labels: {
                style: {
                  cssClass: "text-grey fill-current"
                }
              }
            },
            tooltip: {
              x: {
                show: true
              }
            },
            xaxis: {
              categories: [...dataRespon.map(item => item.created_at)]
            }
          },
          series: [
            {
              name: "Số học viên",
              data: [...dataRespon.map(item => item.sum)]
            }
          ]
        };
      });
    },
    getDataYear() {
      let vm = this;
      var url = null;
      if (this.fromYear && this.toYear) {
        url = `branches/${vm.branchId}/statistics/student?mode=year&from=${this.fromYear}&to=${this.toYear}`;
      } else {
        url = `branches/${vm.branchId}/statistics/student?mode=year`;
      }
      vm.$http.get(url).then(function(response) {
        let dataRespon = response.data.data;
        vm.dataYear = {
          chartOptions: {
            chart: {
              toolbar: {
                show: false
              },
              dropShadow: {
                enabled: true,
                top: 20,
                left: 2,
                blur: 6,
                opacity: 0.2
              }
            },
            stroke: {
              curve: "smooth",
              width: 4
            },
            grid: {
              borderColor: "#ebebeb"
            },
            legend: {
              show: false
            },
            colors: ["#df87f2"],
            fill: {
              type: "gradient",
              gradient: {
                shade: "dark",
                inverseColors: true,
                gradientToColors: ["#28C76F"],
                shadeIntensity: 5,
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
            yaxis: {
              tickAmount: 5,
              labels: {
                style: {
                  cssClass: "text-grey fill-current"
                }
              }
            },
            tooltip: {
              x: {
                show: true
              }
            },
            xaxis: {
              categories: [...dataRespon.map(item => item.created_at)]
            }
          },
          series: [
            {
              name: "Số học viên",
              data: [...dataRespon.map(item => item.sum)]
            }
          ]
        };
      });
    }
  },
  components: {
    VueApexCharts,
    flatPickr
  }
};
</script>

<style lang="scss">
  #demo-card-analytics {
    .tasks-today-container {
      .tasks-today__task {
        transition: background 0.15s ease-out;

        .tasks-today__actions {
          display: none;
        }

        &:hover {
          background: rgba(var(--vs-primary), 0.04);

          .tasks-today__actions {
            display: flex;
          }
        }
      }
    }
  }
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

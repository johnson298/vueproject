<template>
  <div id="div-with-loading" class="vs-con-loading__container">
    <vx-card title="Thu chi">
      <template slot="actions">
        <vs-dropdown vs-trigger-click class="cursor-pointer">
          <small class="flex cursor-pointer">
            Chọn biểu đồ
            <feather-icon icon="ChevronDownIcon" svgClasses="h-4 w-4" class="ml-1"></feather-icon>
          </small>
          <vs-dropdown-menu class="w-32">
            <vs-dropdown-item @click="week">Theo tuần</vs-dropdown-item>
            <vs-dropdown-item @click="month">Theo tháng</vs-dropdown-item>
            <vs-dropdown-item @click="year">Theo năm</vs-dropdown-item>
          </vs-dropdown-menu>
        </vs-dropdown>
      </template>
      <div slot="no-body" class="p-6 pb-0">
        <div class="flex" v-if="last_week">
          <div class="mr-6">
            <p class="mb-1 font-semibold">Theo tuần</p>
            <p class="text-3xl text-success">
              <sup class="text-base mr-1">$</sup>
              {{ totalPrice }}
            </p>
          </div>
        </div>
        <div class="flex" v-if="last_month">
          <div class="mr-6">
            <p class="mb-1 font-semibold">Theo tháng</p>
            <p class="text-3xl text-success">
              <sup class="text-base mr-1">$</sup>
              {{ totalPrice }}
            </p>
          </div>
        </div>
        <div class="flex" v-if="last_year">
          <div class="mr-6">
            <p class="mb-1 font-semibold">Theo năm</p>
            <p class="text-3xl text-success">
              <sup class="text-base mr-1">$</sup>
              {{ totalPrice }}
            </p>
          </div>
        </div>
        <div v-if="last_month">
          <vue-apex-charts
            v-if="status"
            type="line"
            height="266"
            :options="revenueComparisonLine.chartOptions"
            :series="revenueComparisonLine.series"
          />
        </div>
        <div v-if="last_year">
          <vue-apex-charts
            v-if="status"
            type="line"
            height="266"
            :options="revenueComparisonLine.chartOptions"
            :series="revenueComparisonLine.series"
          />
        </div>
        <div v-if="last_week">
          <vue-apex-charts
            v-if="status"
            type="line"
            height="266"
            :options="revenueComparisonLine.chartOptions"
            :series="revenueComparisonLine.series"
          />
        </div>
      </div>
    </vx-card>
  </div>
</template>
<script>
import VueApexCharts from "vue-apexcharts";
import StatisticsCardLine from "@/components/statistics-cards/StatisticsCardLine.vue";
import ChangeTimeDurationDropdown from "../ChangeTimeDurationDropdown.vue";

export default {
  props: {
    money: {
      default: null
    }
  },
  data() {
    return {
      status: false,
      mode: "day",
      totalPrice: null,
      dataStatistic: [],
      last_week: true,
      last_month: false,
      last_year: false,
      revenueComparisonLine: {
        series: [
          {
            name: "This Month",
            data: [45000, 47000, 44800, 47500, 45500, 48000, 46500, 48600]
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
            categories: [],
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
                return val > 999 ? (val / 1000).toFixed(1) + "k" : val;
              }
            }
          },
          tooltip: {
            x: { show: false }
          }
        }
      }
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
    }
  },
  created() {
    this.getData();
  },
  components: {
    VueApexCharts,
    StatisticsCardLine,
    ChangeTimeDurationDropdown
  },
  methods: {
    week() {
      this.last_week = true;
      this.last_month = false;
      this.last_year = false;
      this.mode = "day";
      this.getData();
    },
    month() {
      this.last_year = false;
      this.last_month = true;
      this.last_week = false;
      this.mode = "month";
      this.getData();
    },
    year() {
      this.last_week = false;
      this.last_month = false;
      this.last_year = true;
      this.mode = "year";
      this.getData();
    },
    getData() {
      let vm = this;
      vm.revenueComparisonLine.series = [];
      vm.revenueComparisonLine.chartOptions.xaxis.categories = [];
      vm.$http
        .get(`branches/${vm.branchId}/statistics/cost?mode=${vm.mode}`)
        .then(function(response) {
          vm.status = true;
          let dataMoney = response.data.data;
          vm.revenueComparisonLine.series.push({
            name: "Đã thu",
            data: [...dataMoney.map(item => item.sum)]
          });
          vm.totalPrice = vm.formatPrice(
            vm.revenueComparisonLine.series[0].data.reduce((a, b) => a + b, 0)
          );
          vm.revenueComparisonLine.chartOptions.xaxis.categories = [
            ...dataMoney.map(item => item.date)
          ];
        });
    }
  }
};
</script>

<style lang="scss" scoped>
</style>

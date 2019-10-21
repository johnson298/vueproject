<template>
  <div>
    <vx-card title="Thu chi(tháng)">
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
            <p class="mb-1 font-semibold">Thu</p>
            <p class="text-3xl text-success">
              <sup class="text-base mr-1">$</sup>86,589
            </p>
          </div>
          <div>
            <p class="mb-1 font-semibold">Chi</p>
            <p class="text-3xl">
              <sup class="text-base mr-1">$</sup>73,683
            </p>
          </div>
        </div>
        <div class="flex" v-if="last_month">
          <div class="mr-6">
            <p class="mb-1 font-semibold">Thu</p>
            <p class="text-3xl text-success">
              <sup class="text-base mr-1">$</sup>10,589
            </p>
          </div>
          <div>
            <p class="mb-1 font-semibold">Chi</p>
            <p class="text-3xl">
              <sup class="text-base mr-1">$</sup>3,683
            </p>
          </div>
        </div>
        <div class="flex" v-if="last_year">
          <div class="mr-6">
            <p class="mb-1 font-semibold">Thu</p>
            <p class="text-3xl text-success">
              <sup class="text-base mr-1">$</sup>186,589
            </p>
          </div>
          <div>
            <p class="mb-1 font-semibold">Chi</p>
            <p class="text-3xl">
              <sup class="text-base mr-1">$</sup>93,683
            </p>
          </div>
        </div>
        <div v-if="last_month">
          <vue-apex-charts
            type="line"
            height="266"
            :options="analyticsData.revenueComparisonLine.chartOptions"
            :series="analyticsData.revenueComparisonLine.series"
          />
        </div>
        <div v-if="last_year">
          <vue-apex-charts
            type="line"
            height="266"
            :options="revenueComparisonLine.chartOptions"
            :series="revenueComparisonLine.series"
          />
        </div>
        <div v-if="last_week">
          <vue-apex-charts
            type="line"
            height="266"
            :options="analyticsData.revenueComparisonLine.chartOptions"
            :series="analyticsData.revenueComparisonLine.series"
          />
        </div>
      </div>
    </vx-card>
  </div>
</template>
<script>
import VueApexCharts from "vue-apexcharts";
import StatisticsCardLine from "@/components/statistics-cards/StatisticsCardLine.vue";
import analyticsData from "../ui-elements/card/analyticsData.js";
import ChangeTimeDurationDropdown from "../ChangeTimeDurationDropdown.vue";

export default {
  props: {
    money: {
      default: null
    }
  },
  data() {
    return {
      last_week: true,
      last_month: false,
      last_year: false,
      analyticsData: analyticsData,
      revenueComparisonLine: {
        series: [
          {
            name: "Theo năm",
            data: [55000, 40000, 30000, 20500, 15500, 48000, 46500, 48600]
          },
          {
            name: "Theo năm",
            data: [16000, 18000, 25500, 40600, 14500, 36500, 15000, 17000]
          },
          {
            name: "Theo năm",
            data: [10000, 8000, 2500, 4600, 1500, 6500, 1000, 7000]
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
            categories: ["01", "02", "03", "04", "05", "06", "07", "08"],
            axisBorder: {
              show: false
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
    },
    month() {
      this.last_year = false;
      this.last_month = true;
      this.last_week = false;
    },
    year() {
      this.last_week = false;
      this.last_month = false;
      this.last_year = true;
    }
  }
};
</script>

<style lang="scss" scoped>
</style>

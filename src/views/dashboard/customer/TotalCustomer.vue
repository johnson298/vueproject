<template>
  <div>
    <statistics-card-line
      color="success"
      icon="UserPlusIcon"
      :statistic="customerCount"
      statisticTitle="Tổng khách hàng"
      :chartData="analyticsData.subscribersGained"
      type="area"
    ></statistics-card-line>
  </div>
</template>
<script>
import VueApexCharts from "vue-apexcharts";
import StatisticsCardLine from "@/components/statistics-cards/StatisticsCardLine.vue";
import analyticsData from "../ui-elements/card/analyticsData.js";

export default {
  props: {
    customerCount: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      analyticsData: analyticsData
    };
  },
  components: {
    VueApexCharts,
    StatisticsCardLine
  }
};
</script>

<style lang="scss" scoped>
</style>

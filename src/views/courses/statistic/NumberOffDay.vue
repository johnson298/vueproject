<template>
  <div>
    <statistics-card-line
      color="success"
      icon="UsersIcon"
      :statistic="day_off || 0"
      statisticTitle="Ngày nghỉ"
      :chartData="analyticsData.subscribersGained"
      type="area"
    ></statistics-card-line>
  </div>
</template>
<script>
import VueApexCharts from "vue-apexcharts";
import StatisticsCardLine from "@/components/statistics-cards/StatisticsCardLine.vue";
import analyticsData from "./ui-elements/card/analyticsData.js";

export default {
  props: {
    day_off: {
      type: Number
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

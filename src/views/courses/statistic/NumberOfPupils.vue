<template>
  <div>
    <statistics-card-line
      color="success"
      icon="UsersIcon"
      :statistic="students_count || 0"
      statisticTitle="Học viên tham gia"
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
    students_count: {
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

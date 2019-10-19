<template>
  <div>
    <statistics-card-line
      icon="UsersIcon"
      :statistic="usersCount"
      statisticTitle="Tổng nhân viên"
      :chartData="analyticsData.ordersRecevied"
      color="warning"
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
    usersCount: {
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

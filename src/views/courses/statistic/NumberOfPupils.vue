<template>
<div>
    <statistics-card-line color='success' icon="UsersIcon" statistic="92.6k" statisticTitle="Số học viên tham gia" :chartData="analyticsData.subscribersGained" type='area'></statistics-card-line>
</div>

</template>
<script>
import VueApexCharts from 'vue-apexcharts';
import StatisticsCardLine from '@/components/statistics-cards/StatisticsCardLine.vue';
import analyticsData from './ui-elements/card/analyticsData.js';

export default{
  data() {
    return {
      analyticsData: analyticsData,
    };
  },
  components: {
    VueApexCharts,
    StatisticsCardLine,
  },
};
</script>

<style lang="scss" scoped>

</style>

<template>
<VxCardCustom title="Quá trình học">
    <template slot="actions">
        <feather-icon svgClasses="w-6 h-6 text-grey"></feather-icon>
    </template>

    <template slot="no-body">
        <div class="mt-10">
            <vue-apex-charts type=radialBar height=240 :options="analyticsData.goalOverviewRadialBar.chartOptions" :series="analyticsData.goalOverviewRadialBar.series" />
        </div>
    </template>

    <div class="flex justify-between text-center" slot="no-body-bottom">
        <div class="w-1/2 border border-solid d-theme-border-grey-light border-r-0 border-b-0 border-l-0">
            <p class="mt-4">Tổng số buổi</p>
            <p class="mb-4 text-3xl font-semibold">30</p>
        </div>
        <div class="w-1/2 border border-solid d-theme-border-grey-light border-r-0 border-b-0">
            <p class="mt-4">Số buổi hoàn thành</p>
            <p class="mb-4 text-3xl font-semibold">20</p>
        </div>
    </div>
</VxCardCustom>
</template>

<script>
import VxCardCustom from './vx-card/VxCardCustom';
import VueApexCharts from 'vue-apexcharts';
import analyticsData from './ui-elements/card/analyticsData.js';

export default {
  data() {
    return {
      analyticsData: analyticsData,
    };
  },
  components: {
    VueApexCharts,
    VxCardCustom
  }
};
</script>

<style lang="scss" scoped>

</style>

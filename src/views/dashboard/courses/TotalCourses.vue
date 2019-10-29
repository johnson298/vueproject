<template>
  <div class="vx-card">
    <div class="vx-card__header">
      <div class="vx-card__title">
        <h4 class>Lớp học</h4>
      </div>
    </div>
    <div class="vx-card__collapsible-content vs-con-loading__container">
      <div class="vx-card__body">
        <div class="mt-5">
          <chartjs-component-pie-chart
            v-if="classes"
            :height="250"
            :data="classes"
            :options="options"
          ></chartjs-component-pie-chart>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ChartjsComponentPieChart from "../ChartjsComponentPieChart.vue";
export default {
  props: {
    classes: {
      required: true,
      default: {}
    }
  },
  data() {
    return {
      options: {
        title: {
          display: true,
          text: "Biểu đồ lớp học"
        }
      }
    };
  },
  components: {
    ChartjsComponentPieChart
  }
};
</script>

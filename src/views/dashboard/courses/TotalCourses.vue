<template>
  <vx-card-custom title="Lớp học" class="mb-base">
    <div class="mt-5">
      <chartjs-component-pie-chart v-if="classes" :height="250" :data="classes" :options="options"></chartjs-component-pie-chart>
    </div>
  </vx-card-custom>
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

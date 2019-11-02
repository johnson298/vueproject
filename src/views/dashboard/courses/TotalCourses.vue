<template>
  <vue-card title="Lớp học">
    <div slot="card-body">
      <div class="mt-5">
        <chartjs-component-pie-chart
          v-if="classes"
          :height="250"
          :data="classes"
          :options="options"
        ></chartjs-component-pie-chart>
      </div>
    </div>
  </vue-card>
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

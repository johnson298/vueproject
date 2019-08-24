<template>
    <vx-card title="Điểm thi" class="mb-base">
    <div class="mt-5">
        <chartjs-component-pie-chart :height=250 :data="data" :options="options"></chartjs-component-pie-chart>
    </div>
    </vx-card>
</template>

<script>
import ChartjsComponentPieChart from "./charjs/ChartjsComponentPieChart.vue";
export default {
  data() {
    return {
      data: {
        labels: ["Giỏi(9)", 'Khá(9-7)', "Trung bình(7-5)", "Yếu(4-3)", "Kém(3)"],
        datasets: [{
          label: "Biểu đồ điểm thi",
          backgroundColor: ["#7367F0", "#28C76F", "#EA5455", "#FF9F43", "#1E1E1E"],
          data: [2478, 5267, 734, 784, 433]
        }]
      },
      options: {
        title: {
          display: true,
          text: 'Biểu đồ điểm thi lớp abd'
        }
      }
    };
  },
  components: {
    ChartjsComponentPieChart
  }
};
</script>

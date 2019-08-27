<template>
        <vx-card title="Lớp học" class="mb-base">
                <div class="mt-5">
                        <chartjs-component-pie-chart :height=250 :data="data" :options="options"></chartjs-component-pie-chart>
                </div>
        </vx-card>
</template>

<script>
import ChartjsComponentPieChart from "../ChartjsComponentPieChart.vue";
export default {
  data() {
    return {
      data: {
        labels: ["Chờ mở", 'Đang mở', "Đã hoàn thành", "Hủy"],
        datasets: [{
          label: "Biểu đồ lớp học",
          backgroundColor: ["#7367F0", "#28C76F", "#EA5455", "#FF9F43"],
          data: [2478, 5267, 734, 784]
        }]
      },
      options: {
        title: {
          display: true,
          text: 'Biểu đồ lớp học'
        }
      }
    };
  },
  components: {
    ChartjsComponentPieChart
  }
};
</script>

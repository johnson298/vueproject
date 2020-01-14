<template>
    <vx-card title="Học viên" class="mb-base" code-toggler>

        <div class="mt-5">
            <chartjs-component-bar-chart :height=250 :data="data" :options="options"></chartjs-component-bar-chart>
        </div>
    </vx-card>
</template>

<script>
import ChartjsComponentBarChart from "../ChartjsComponentBarChart.vue";
export default {
  data() {
    return {
      data: {
        labels: ["Đang chờ mở lớp", "Đang học", "Đã hoàn thành", "Bị hủy"],
        datasets: [{
          label: "Học viên",
          backgroundColor: ["#1E6DB5", "#28C76F", "#EA5455", "#FF9F43"],
          data: [2478, 5267, 734, 784]
        }]
      },
      options: {
        legend: { display: false },
        title: {
          display: true,
          text: 'Tổng số học viên là 2050'
        }
      }
    };
  },
  components: {
    ChartjsComponentBarChart
  }
};
</script>

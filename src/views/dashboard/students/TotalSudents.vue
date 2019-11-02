<template>
  <vue-card title="Học viên">
    <div slot="card-actions">
      <vs-dropdown vs-trigger-click class="cursor-pointer">
        <small class="flex cursor-pointer">
          Chọn biểu đồ
          <feather-icon icon="ChevronDownIcon" svgClasses="h-4 w-4" class="ml-1"></feather-icon>
        </small>
        <vs-dropdown-menu class="w-32">
          <vs-dropdown-item>Theo tuần</vs-dropdown-item>
          <vs-dropdown-item>Theo tháng</vs-dropdown-item>
          <vs-dropdown-item>Theo năm</vs-dropdown-item>
        </vs-dropdown-menu>
      </vs-dropdown>
    </div>
    <div slot="card-body">
      <div class="mt-5">
        <chartjs-component-line-chart :height="250" :data="month.data" :options="month.options"></chartjs-component-line-chart>
      </div>
    </div>
  </vue-card>
</template>
<script>
import ChartjsComponentLineChart from "../ChartjsComponentLineChart.vue";
export default {
  data() {
    return {
      month: {
        data: {
          labels: [
            "tháng 1",
            "tháng 2",
            "tháng 3",
            "tháng 4",
            "tháng 5",
            "tháng 6",
            "tháng 7",
            "tháng 8",
            "tháng 9"
          ],
          datasets: [
            {
              data: [86, 114, 106, 106, 107, 111, 133, 221, 783, 2478],
              label: "Học viên mới",
              borderColor: "#1d21f0",
              fill: false
            },
            {
              data: [282, 350, 411, 502, 635, 809, 947, 1402, 3700, 5267],
              label: "Học viên đang học",
              borderColor: "#24c75e",
              fill: false
            },
            {
              data: [168, 170, 178, 190, 203, 276, 408, 547, 675, 734],
              label: "Học viên đã hoàn thành",
              borderColor: "#EA5455",
              fill: false
            },
            {
              data: [40, 20, 10, 16, 24, 38, 74, 167, 508, 784],
              label: "Đã hủy",
              borderColor: "#FF9F43",
              fill: false
            }
          ]
        },
        options: {
          title: {
            display: true,
            text: "Tổng học viên : 5000"
          }
        }
      }
    };
  },
  components: {
    ChartjsComponentLineChart
  }
};
</script>

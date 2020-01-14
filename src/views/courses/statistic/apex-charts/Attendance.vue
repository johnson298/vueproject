<template>
  <vue-card title="Điểm danh">
    <div slot="card-body">
      <vue-apex-charts
        v-if="data"
        type="area"
        height="350"
        :options="data.chartOptions"
        :series="data.series"
      ></vue-apex-charts>
    </div>
  </vue-card>
</template>

<script>
import VueApexCharts from "vue-apexcharts";

export default {
  data() {
    return {
      idCourse: this.$route.params.course,
      data: null
    };
  },
  computed: {
    branchId() {
      return this.$store.state.getBranchId;
    }
  },
  methods: {
    getData() {
      let vm = this;
      let url = `branches/${this.branchId}/courses/${this.idCourse}/attendances`;
      this.$http
        .get(url)
        .then(res => {
          let data = res.data.data;
          this.data = {
            chartOptions: {
              dataLabels: {
                enabled: false
              },
              stroke: {
                curve: "smooth",
                colors: "#000"
              },
              colors: ["#28C76F", "#7367F0", "#EA5455", "#FF9F43", "#1E1E1E"],
              xaxis: {
                type: "date",
                categories: [
                  ...data.map(item => (item.created_at ? item.created_at : 0))
                ]
              },
              tooltip: {
                x: {
                  format: "dd/MM/yy HH:mm"
                }
              }
            },
            series: [
              {
                name: "Có mặt",
                data: [...data.map(item => (item.present ? item.present : 0))]
              },
              {
                name: "Đi trễ",
                data: [...data.map(item => (item.late ? item.late : 0))]
              },
              {
                name: "Vắng mặt",
                data: [...data.map(item => item.absent)]
              }
            ]
          };
        })
        .catch(() => {
          vm.$vs.notify({
            title: "Lỗi",
            text: "Có lỗi xảy ra",
            color: "danger",
            iconPack: "feather",
            icon: "icon-alert-circle"
          });
        });
    }
  },
  created() {
    this.getData();
  },
  components: {
    VueApexCharts
  }
};
</script>

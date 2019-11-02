<template>
  <vue-card title="Quá trình học">
    <div slot="card-body">
      <div class="mt-10">
        <vue-apex-charts
          type="radialBar"
          height="240"
          :options="analyticsData.goalOverviewRadialBar.chartOptions"
          :series="[Math.ceil(courseInfo.progress*100/courseInfo.number_of_lessons)||0]"
        />
      </div>
      <div class="flex justify-between text-center" slot="no-body-bottom">
        <div
          class="w-1/2 border border-solid d-theme-border-grey-light border-r-0 border-b-0 border-l-0"
        >
          <p class="mt-4">Tổng số buổi</p>
          <p class="mb-4 text-3xl font-semibold">{{ courseInfo.number_of_lessons }}</p>
        </div>
        <div class="w-1/2 border border-solid d-theme-border-grey-light border-r-0 border-b-0">
          <p class="mt-4">Số buổi hoàn thành</p>
          <p class="mb-4 text-3xl font-semibold">{{ courseInfo.progress }}</p>
        </div>
      </div>
    </div>
  </vue-card>
</template>

<script>
import VueApexCharts from "vue-apexcharts";
import analyticsData from "./ui-elements/card/analyticsData.js";

export default {
  data() {
    return {
      analyticsData: analyticsData,
      courseInfo: {
        number_of_lessons: 0,
        progress: 0
      }
    };
  },
  components: {
    VueApexCharts
  },
  computed: {
    branchId() {
      return this.$store.state.getBranchId;
    }
  },
  created() {
    let vm = this;
    this.$http
      .get(`branches/${this.branchId}/courses/` + this.$route.params.course)
      .then(function(response) {
        vm.courseInfo = response.data.data;
      })
      .catch(() => {
        this.$router.push("/pages/error-404");
        this.$vs.notify({
          title: "Error!",
          text: "Có lỗi xảy ra",
          iconPack: "feather",
          icon: "fa fa-lg fa-exclamation-triangle",
          color: "danger"
        });
      });
  }
};
</script>

<style lang="scss" scoped>
</style>

<template>
  <div class="statistic-course">
    <vs-row>
      <vs-col vs-w="6" class="pl-0">
        <NumberOfPupils :students_count="data.students_count" />
      </vs-col>
      <vs-col vs-w="6" class="pl-0">
        <NumberOffDay />
      </vs-col>
    </vs-row>

    <div class="mt-5">
      <vs-row>
        <vs-col vs-w="8" class="pl-0">
          <Attendance />
        </vs-col>
        <vs-col vs-w="4" class="pl-0">
          <LearningProcess />
        </vs-col>
      </vs-row>
    </div>
  </div>
</template>

<script>
import Attendance from "./apex-charts/Attendance";
import LearningProcess from "./LearningProcess.vue";
import NumberOfPupils from "./NumberOfPupils.vue";
import NumberOffDay from "./NumberOffDay.vue";

export default {
  components: {
    Attendance,
    LearningProcess,
    NumberOfPupils,
    NumberOffDay
  },
  computed: {
    branchId() {
      return this.$store.state.getBranchId;
    }
  },
  data() {
    return {
      courseId: this.$route.params.course,
      data: {
        progress: 0,
        students_count: 0
      }
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      let url = `branches/${this.branchId}/courses/${this.courseId}/statistics/main`;
      let vm = this;
      vm.$vs.loading({ color: "#1E6DB5", text: "Loading..." });
      vm.$http
        .get(url)
        .then(res => {
          vm.data = res.data.data;
        })
        .catch(() => {
          vm.$vs.notify({
            title: "Lỗi !",
            text: "Có lỗi xảy ra",
            color: "danger",
            iconPack: "feather",
            icon: "icon-alert-circle"
          });
        })
        .finally(function() {
          vm.$vs.loading.close();
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.chat-card-log {
  height: 400px;

  .chat-sent-msg {
    background-color: #f2f4f7 !important;
  }
}
</style>

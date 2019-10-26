<template>
  <div>
    <vs-row vs-w="12" vs-type="flex" vs-justify="flex-start" class="mb-5 ml-1">
      <vs-switch color="success" v-model="switchView" class="mr-2">
        <span slot="on">Dạng bảng</span>
        <span slot="of">Dạng lịch</span>
      </vs-switch>
    </vs-row>
    <div class="vs-row">
      <SchedulesList v-if="switchView" key="switch-view" />
      <SimpleCalendar v-else key="switch-view" />
    </div>
  </div>
</template>

<script>
import SchedulesList from "./SchedulesList.vue";
import SimpleCalendar from "./SimpleCalendar.vue";
export default {
  data() {
    return {
      switchView: true
    };
  },
  components: {
    SchedulesList,
    SimpleCalendar
  }
};
</script>

<style lang="scss" scoped>
</style>
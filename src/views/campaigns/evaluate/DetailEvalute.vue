<template>
  <div>
    <h2 class="text-center">Đánh giá: {{ getInfoEvaluate.evaluates.name }}</h2>
    <div class="my-3" v-for="(item, index) in getInfoEvaluate.evaluate_item" :key="index">
      <h5>{{ index }}. {{ item.question }}</h5>
      <ul class="mr-5">
        <li><div class="h-3 w-3 float-left rounded-full mt-2 mr-2 bg-success" ></div> Rất hài lòng ({{ item.very_pleased }} đánh giá)</li>
        <li><div class="h-3 w-3 float-left rounded-full mt-2 mr-2 bg-primary" ></div> Hài lòng ({{ item.satisfied }} đánh giá)</li>
        <li><div class="h-3 w-3 float-left rounded-full mt-2 mr-2 bg-danger" ></div> Không hài lòng ({{ item.unsatisfied }} đánh giá)</li>
        <li><div class="h-3 w-3 float-left rounded-full mt-2 mr-2 bg-warning" ></div> Khác ({{ item.further }} đánh giá)</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    getInfoEvaluate: {
      require: true,
      type: Object
    }
  }
};
</script>

<style lang="scss" scoped>
</style>

<template>
  <div>
    <h2 class="text-center">{{ getInfoEvaluate.evaluates.name }}</h2>
    <div class="my-3" v-for="(item, index) in getInfoEvaluate.evaluate_item" :key="index">
      <h5>{{ index }}. {{ item.question }}</h5>
      <ul class="mr-5">
        <li>- Rất hài lòng (10 đánh giá)</li>
        <li>- Hài lòng (12 đánh giá)</li>
        <li>- Không hài lòng (10 đánh giá)</li>
        <li>- Khác (10 đánh giá)</li>
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

<template>
  <footer class="the-footer flex-wrap justify-between" :class="classes">
      <span>{{ `${$store.state.configuration ? $store.state.configuration.copyright.value : ''} ` }}</span>
    <span class="md:flex hidden items-center">
        <span>Trụ sở chính: {{ $store.state.configuration ? $store.state.configuration.address.value : '' }}</span>
        <feather-icon icon="HeartIcon" svgClasses="stroke-current text-danger w-6 h-6" class="ml-2" />
    </span>
  </footer>
</template>

<script>

export default {
  name: "the-footer",
  props: {
    classes: {
      type: String,
    },
  }
};
</script>

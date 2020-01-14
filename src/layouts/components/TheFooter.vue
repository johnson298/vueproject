<template>
  <footer class="the-footer flex-wrap justify-between" :class="classes">
      <span>{{ `Copyright ${new Date().getFullYear()} @ ${$store.state.configuration ? $store.state.configuration.name.value : ''} | ${$store.state.configuration ? $store.state.configuration.copyright.value : ''} ` }}</span>
    <span class="md:flex hidden items-center">
        <feather-icon icon="HeartIcon" svgClasses="stroke-current text-danger w-6 h-6" class="mr-2" />
        <span>{{ $store.state.configuration ? $store.state.configuration.address.value : '' }}</span>
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

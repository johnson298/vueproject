<template>
  <div class="vue-card">
    <div class="vue-card__header">
      <div class="vue-card__title">
        <h4 class>{{ $props.title }}</h4>
        <slot name="title" />
      </div>
      <div class="vue-card__actions">
        <slot name="card-actions" />
      </div>
    </div>
    <div class="vue-card__collapsible-contentr">
      <div class="vue-card__body">
        <slot name="card-body" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String
    }
  }
};
</script>

<style lang="scss" scoped>
.vue-card {
  width: 100%;
  background: #fff;
  border-radius: 0.5rem;
  display: block;
  box-shadow: 0px 4px 25px 0px rgba(0, 0, 0, 0.1);
  position: relative;
  transition: all 0.3s ease-in-out;
  .vue-card__header {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 1.5rem 1.5rem 0;
  }
  .vue-card__collapsible-content {
    transition: all 0.3s ease-in-out;
  }
}
</style>
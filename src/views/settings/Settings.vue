<template>
<div id="todo-app" class=" rounded relative overflow-hidden">
    <vs-sidebar class="custom--height__sidebar" parent="#todo-app" :hidden-background="clickNotClose" v-model="isSidebarActive">
        <settings-sidebar></settings-sidebar>
    </vs-sidebar>
    <div :class="{'sidebar-spacer': clickNotClose}" class="border border-r-0 border-b-0 border-t-0  app-fixed-height">
        <transition :name="routerTransition" mode="out-in">
            <router-view></router-view>
        </transition>
    </div>
</div>
</template>

<script>
import SettingsSidebar from "./SettingsSidebar.vue";
import VuePerfectScrollbar from 'vue-perfect-scrollbar';
import themeConfig from '@/../themeConfig.js';
export default {
  data() {
    return {
      clickNotClose: true,
      isSidebarActive: true,
      settings: {
        maxScrollbarLength: 60,
        wheelSpeed: 0.30,
      },
      routerTransition: themeConfig.routerTransition || 'zoom-fade',
    };
  },
  components: {
    SettingsSidebar,
    VuePerfectScrollbar
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/vuesax/apps/todo.scss";
</style>

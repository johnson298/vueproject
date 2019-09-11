<template>
<div id="todo-app" class="border border-solid d-theme-border-grey-light rounded relative overflow-hidden">

    <vs-sidebar class="items-no-padding" parent="#todo-app" :hidden-background="clickNotClose" v-model="isSidebarActive">
            <settings-sidebar></settings-sidebar>
    </vs-sidebar>
    <div :class="{'sidebar-spacer': clickNotClose}" class="app-fixed-height border border-r-0 border-b-0 border-t-0 border-solid d-theme-border-grey-light app-fixed-height pt-6">
        <VuePerfectScrollbar class="todo-content-scroll-area pt-3" :settings="settings">
            <transition :name="routerTransition" mode="out-in">
                <router-view></router-view>
            </transition>
        </VuePerfectScrollbar>
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

<style lang="scss">
@import "@/assets/scss/vuesax/apps/todo.scss";

.page-config-item.router-link-exact-active.router-link-active {
    color: #1E6DB5 !important;
}

.page-config-item {
    color: #626262 !important;
}
.app-fixed-height {
    height: calc(100vh - 9.1rem);
}
</style>

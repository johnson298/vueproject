<template>
    <div :class="[{'vs-sidebar-item-active':activeLink}, {'disabled-item pointer-events-none': isDisabled}]" class="vs-sidebar--item">
        <router-link v-if="to" :to="to" :class="[{'router-link-active': activeLink}]" :target="target" exact>
            <vs-icon v-if="!featherIcon" :icon-pack="iconPack" :icon="icon">
            </vs-icon>
            <feather-icon :icon="icon" :class="{'w-3 h-3': iconSmall}" v-else></feather-icon>
            <span v-if="iconAwesome" class="feather-icon select-none relative awesome-sidebar">
              <font-awesome-icon :icon="iconAwesome"/>
            </span>
            <slot></slot>
        </router-link>
        <a v-else :target="target" :href="href">
            <vs-icon v-if="!featherIcon" :icon-pack="iconPack" :icon="icon">
            </vs-icon>
            <feather-icon :icon="icon" :class="{'w-3 h-3': iconSmall}" v-else></feather-icon>
            <slot></slot>
        </a>
    </div>
</template>

<script>
export default {
  name: 'VxSidebarItem',
  props: {
    iconAwesome: {
      default: "",
      type: String
    },
    icon: {
      default: "",
      type: String
    },
    iconSmall: {
      default: false,
      type: Boolean,
    },
    iconPack: {
      default: 'material-icons',
      type: String
    },
    href: {
      default: '#',
      type: String
    },
    to: {
      default: null,
      type: String
    },
    index: {
      default: null,
      type: [String, Number]
    },
    featherIcon: {
      default: true,
      type: Boolean,
    },
    target: {
      default: '_self',
      type: String,
    },
    isDisabled: {
      default: false,
      type: Boolean
    }
  },
  data() {
    return {
      activeLink: false,
    };
  },
  watch: {
    '$route'() {
      this.CheckIsActive();
    }
  },
  methods: {
    CheckIsActive() {
      if (this.to) {
        if(this.to == this.$router.path && this.to) this.activeLink = true;
        else this.activeLink = false;
        // if (this.$route.path.slice(1).includes(this.to.slice(1)) && this.to.slice(1)) this.activeLink = true
        // else this.activeLink = false
      }
    }
  },
  updated() {
    this.CheckIsActive();
  }
};
</script>
<style lang="scss" scoped>
  .main-menu-sidebar .vs-sidebar--item a span.awesome-sidebar {
    margin-left: -18px;
    font-size: 18px;
  }
</style>

<template>
  <div id="profile-page">
    <!-- COL AREA -->
    <vx-card class="custom-card">
      <div class="mt-5 custom-tab">
        <div class="con-vs-tabs vs-tabs vs-tabs-primary vs-tabs-position-top">
          <div class="con-ul-tabs">
            <ul class="ul-tabs vs-tabs--ul ul-tabs-left">
              <li class="vs-tabs--li">
                <router-link tag="button" to="/campaigns" class="vs-tabs--btn">Thông báo</router-link>
              </li>
              <li class="vs-tabs--li">
                <router-link tag="button" to="/campaigns/evaluate" class="vs-tabs--btn">Đánh giá</router-link>
              </li>
            </ul>
          </div>
          <div class="con-slot-tabs">
            <div class="con-tab vs-tabs--content">
              <transition :name="routerTransition" mode="out-in">
                <router-view></router-view>
              </transition>
            </div>
          </div>
        </div>
      </div>
    </vx-card>
  </div>
</template>

<script>
import themeConfig from "@/../themeConfig.js";

export default {
  data() {
    return {
      isNavOpen: true,
      wasSidebarOpen: null,
      course: {},
      routerTransition: themeConfig.routerTransition || "zoom-fade",
      branch_id: this.$store.state.getBranchId
    };
  },
  computed: {
    branchId() {
      return this.$store.state.getBranchId;
    }
  },
  watch: {
    branchId() {
      this.$router.push("/");
    }
  }
};
</script>

<style lang="scss">
@import "@/assets/scss/vuesax/pages/profile.scss";

#profile-page {
  .img-profile-cus {
    padding: 0 !important;
    display: flex;
    padding: 30px;
    justify-content: center;
    align-items: center;
    position: relative;

    img {
      border-radius: 50%;
      width: 200px;
      height: 200px;
      object-fit: cover;
    }

    .change-avatar {
      position: absolute;
      bottom: 3px;

      input[type="file"] {
        cursor: pointer;
        width: 65px;
        height: 34px;
        overflow: hidden;

        &::before {
          content: "change";
          width: 65px;
          height: 32px;
          font-size: 12px;
          line-height: 32px;
          display: inline-block;
          background: #695df4;
          text-align: center;
          color: #fff;
          border-radius: 20px;
        }

        &::-webkit-file-upload-button {
          visibility: hidden;
        }
      }
    }
  }

  .tabBtn-profile.active {
    color: #6a5ff5 !important;

    &:after {
      content: "";
      position: absolute;
      top: calc(100% + 20px);
      left: 50%;
      transform: translate(-50%, -50%);
      border: 20px solid transparent;
      border-top-color: #fff;
    }
  }
}

.child-nopadding {
  .vs-card--content {
    padding: 0;
  }
}

.custom-tab {
  .con-ul-tabs {
    box-shadow: 0px 4px 25px 0px rgba(0, 0, 0, 0.1);
    margin-bottom: 30px;

    ul {
      display: flex;
      justify-content: space-around;
      border-radius: 10px;

      li {
        button {
          font-size: 18px;
          font-weight: bold;
          padding-top: 22px;
          padding-bottom: 22px;
        }
        .router-link-exact-active.router-link-active {
          color: #1e6db5;
        }
      }
    }
  }
}

.custom-card > .vx-card__header {
  display: none !important;
}

.vx-card.custom-card .vx-card__collapsible-content > .vx-card__body {
  padding: 0 !important;
}

.custom-tab .con-slot-tabs {
  box-shadow: 0px 4px 25px 0px rgba(0, 0, 0, 0.1);
  padding: 10px;
  border-radius: 10px;
}

.font-weight-bold {
  font-weight: bold;
}

.tabBtn-profile {
  position: relative;
  display: block;
  padding: 12px;
}

.d-flex {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>

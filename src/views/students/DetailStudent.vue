<template>
  <div id="profile-page">
    <!-- PROFILE HEADER -->
    <div class="cover-container rounded-t-lg img-profile-cus">
      <img
        v-if="employeeInfo.avatar"
        key="checkImage"
        :src="employeeInfo.avatar"
        class="user-profile-img"
      />
      <img
        v-else
        key="checkImage"
        :src="require(`@/assets/images/portrait/small/${activeUserImg}`)"
        class="user-profile-img"
      />
    </div>
    <h2 class="text-center m-5 d-flex">{{employeeInfo.name}}</h2>

    <vx-card code-toggler class="custom-card">
      <div class="mt-5 custom-tab">
        <div class="con-vs-tabs vs-tabs vs-tabs-primary vs-tabs-position-top">
          <div class="con-ul-tabs">
            <ul class="ul-tabs vs-tabs--ul ul-tabs-left">
              <li class="vs-tabs--li">
                <router-link
                  tag="button"
                  :to="`/students/${student_id}`"
                  class="vs-tabs--btn"
                >Thông tin học viên</router-link>
              </li>
              <li class="vs-tabs--li">
                <router-link
                  tag="button"
                  :to="`/students/${student_id}/courses`"
                  class="vs-tabs--btn"
                >Lớp đang tham gia</router-link>
              </li>
              <li class="vs-tabs--li">
                <router-link
                  tag="button"
                  :to="`/students/${student_id}/invoices`"
                  class="vs-tabs--btn"
                >Lịch sử đóng tiền</router-link>
              </li>
              <li class="vs-tabs--li">
                <router-link
                  tag="button"
                  :to="`/students/${student_id}/history`"
                  class="vs-tabs--btn"
                >Lịch sử</router-link>
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
import "video.js/dist/video-js.css";

export default {
  data() {
    return {
      student_id: this.$route.params.student,
      isNavOpen: true,
      wasSidebarOpen: null,
      employeeInfo: {},
      routerTransition: themeConfig.routerTransition || "zoom-fade"
    };
  },
  computed: {
    activeUserImg() {
      return this.$store.state.AppActiveUser.img;
    },
    branch_id() {
      return this.$store.state.getBranchId;
    }
  },
  watch: {
    branch_id() {
      this.getData();
    }
  },
  created() {
    this.getData();
  },
  filters: {
    trim: function(string) {
      return string.trim();
    }
  },
  methods: {
    getData() {
      let vm = this;
      vm.$vs.loading({
        color: "#1E6DB5",
        text: "Loading..."
      });
      this.$http
        .get(`/students/${this.student_id}`)
        .then(function(response) {
          vm.employeeInfo = response.data.data;
        })
        .catch(() => {
          this.$router.push("/pages/error-404");
          this.$vs.notify({
            title: "Error!",
            text: "Có lỗi xảy ra",
            iconPack: "feather",
            icon: "fa fa-lg fa-exclamation-triangle",
            color: "danger"
          });
        })
        .finally(function() {
          vm.$vs.loading.close();
        });
    },
    mounted() {
      this.wasSidebarOpen = this.$store.state.reduceButton;
      this.$store.commit("TOGGLE_REDUCE_BUTTON", false);
    },
    beforeDestroy() {
      if (!this.wasSidebarOpen)
        this.$store.commit("TOGGLE_REDUCE_BUTTON", false);
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

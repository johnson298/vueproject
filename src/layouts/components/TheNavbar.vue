<template>
  <div class="relative">
    <div class="vx-navbar-wrapper">
      <vs-navbar class="vx-navbar navbar-custom" :color="navbarColor" :class="classObj">
        <!-- SM - OPEN SIDEBAR BUTTON -->
        <feather-icon
          class="sm:inline-flex xl:hidden cursor-pointer mr-1"
          icon="MenuIcon"
          @click.stop="showSidebar"
        ></feather-icon>

        <template v-if="breakpoint != 'md'">
          <!-- STARRED PAGES - FIRST 10 -->
          <ul class="vx-navbar__starred-pages">
            <draggable
              v-model="starredPagesLimited"
              :group="{name: 'pinList'}"
              class="flex cursor-move"
            >
              <li class="starred-page" v-for="page in starredPagesLimited" :key="page.url">
                <vx-tooltip :text="page.label" position="bottom" delay=".3s">
                  <feather-icon
                    svgClasses="h-6 w-6"
                    class="p-2 cursor-pointer"
                    :icon="page.labelIcon"
                    @click="$router.push(page.url)"
                  ></feather-icon>
                </vx-tooltip>
              </li>
            </draggable>
          </ul>

          <!-- SEARCHBAR -->
          <div
            class="search-full-container w-full h-full absolute left-0 rounded-lg"
            :class="{'flex': showFullSearch}"
            v-show="showFullSearch"
          >
            <vx-auto-suggest
              :autoFocus="showFullSearch"
              :data="navbarSearchAndPinList"
              @selected="selected"
              ref="navbarSearch"
              @closeSearchbar="showFullSearch = false"
              placeholder="Search..."
              class="w-full"
              inputClassses="w-full vs-input-no-border vs-input-no-shdow-focus no-icon-border"
              icon="SearchIcon"
              background-overlay
            ></vx-auto-suggest>
            <div class="absolute right-0 h-full z-50">
              <feather-icon
                icon="XIcon"
                class="px-4 cursor-pointer h-full close-search-icon"
                @click="showFullSearch = false"
              ></feather-icon>
            </div>
          </div>
          <feather-icon
            icon="SearchIcon"
            @click="showFullSearch = true"
            class="cursor-pointer navbar-fuzzy-search ml-4"
          ></feather-icon>
        </template>

        <vs-spacer></vs-spacer>

        <vs-button type="line" @click="changeBranchPopup = true">
          <font-awesome-icon icon="sitemap" />
          {{branchName}}
        </vs-button>
        <vs-popup class="popup-custom-768" title="Chọn chi nhánh" :active.sync="changeBranchPopup">
          <div class="vx-col w-full">
            <h5 class="mt-3 mb-3 text-center">Danh sách chi nhánh</h5>
            <vs-row class="d-flex row">
              <vs-col vs-w="6" class="mt-5" :key="index" v-for="(value,index) in branches">
                <vs-radio v-model="changeBranchId" :vs-value="value.id">{{value.name}}</vs-radio>
              </vs-col>
            </vs-row>
            <vs-divider />
            <vs-row class="mt-5">
              <vs-col vs-w="12" vs-type="flex" vs-justify="flex-end">
                <vs-button @click="changeBranch">Thay đổi chi nhánh</vs-button>
              </vs-col>
            </vs-row>
          </div>
        </vs-popup>
        <!-- NOTIFICATIONS -->
        <vs-dropdown vs-custom-content vs-trigger-click class="cursor-pointer ml-4">
          <feather-icon
            icon="BellIcon"
            class="cursor-pointer mt-1 sm:mr-6 mr-2"
            :badge="unreadNotifications.length"
          ></feather-icon>
          <vs-dropdown-menu class="notification-dropdown dropdown-custom vx-navbar-dropdown">
            <div class="notification-top text-center p-5 bg-primary text-white">
              <h3 class="text-white">{{ unreadNotifications.length }} Thông báo mới</h3>
            </div>

            <VuePerfectScrollbar
              ref="mainSidebarPs"
              class="scroll-area--nofications-dropdown p-0 mb-10"
              :settings="settings"
            >
              <ul class="bordered-items">
                <li
                  v-for="ntf in unreadNotifications"
                  :key="ntf.index"
                  class="flex justify-between px-4 py-4 notification cursor-pointer"
                >
                  <div
                    class="flex items-start"
                    @click="pushNotification(ntf.title, ntf.msg, elapsedTime(ntf.time)); popupNotification = true"
                  >
                    <feather-icon
                      :icon="ntf.icon"
                      :svgClasses="[`text-${ntf.category}`, 'stroke-current mr-1 h-6 w-6']"
                    ></feather-icon>
                    <div class="mx-2">
                      <span
                        class="font-medium block notification-title"
                        :class="[`text-${ntf.category}`]"
                      >{{ ntf.title }}</span>
                      <small>{{ ntf.msg }}</small>
                    </div>
                  </div>
                  <small class="mt-1 whitespace-no-wrap">{{ elapsedTime(ntf.time) }}</small>
                </li>
              </ul>
            </VuePerfectScrollbar>
            <vs-popup class="holamundo" :title="contentNoti.title" :active.sync="popupNotification">
              <p>{{contentNoti.msg}}</p>
              <small>{{contentNoti.time}}</small>
            </vs-popup>
            <div
              class="checkout-footer fixed bottom-0 rounded-b-lg text-primary w-full p-2 font-semibold text-center border border-b-0 border-l-0 border-r-0 border-solid d-theme-border-grey-light cursor-pointer"
            >
              <router-link tag="span" to="/notifications">Xem tất cả thông báo</router-link>
            </div>
          </vs-dropdown-menu>
        </vs-dropdown>

        <!-- USER META -->
        <div class="the-navbar__user-meta flex items-center">
          <div class="text-right leading-tight hidden sm:block">
            <p class="font-semibold">{{ user_displayName }}</p>
            <small>{{ checkStatus(currentUser.positions, currentUser.getPosition) }}</small>
          </div>
          <vs-dropdown vs-custom-content vs-trigger-click class="cursor-pointer">
            <div class="con-img ml-3">
              <img
                v-if="activeUserImg.startsWith('http')"
                key="onlineImg"
                :src="activeUserImg"
                alt="user-img"
                width="40"
                height="40"
                class="rounded-full shadow-md cursor-pointer block"
              />
              <img
                v-else
                key="localImg"
                :src="require(`@/assets/images/portrait/small/${activeUserImg}`)"
                alt="user-img"
                width="40"
                height="40"
                class="rounded-full shadow-md cursor-pointer block"
              />
            </div>
            <vs-dropdown-menu class="vx-navbar-dropdown">
              <ul style="min-width: 9rem">
                <li
                  class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
                  @click="$router.replace('/')"
                >
                  <feather-icon icon="HomeIcon" svgClasses="w-4 h-4"></feather-icon>
                  <span class="ml-2">Trang chủ</span>
                </li>
                <li
                  class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
                  @click="$router.replace('/me')"
                >
                  <feather-icon icon="UserIcon" svgClasses="w-4 h-4"></feather-icon>
                  <span class="ml-2">Cá nhân</span>
                </li>
                <vs-divider class="m-1"></vs-divider>
                <li
                  class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
                  @click="logout"
                >
                  <feather-icon icon="LogOutIcon" svgClasses="w-4 h-4"></feather-icon>
                  <span class="ml-2">Đăng xuất</span>
                </li>
              </ul>
            </vs-dropdown-menu>
          </vs-dropdown>
        </div>
      </vs-navbar>
    </div>
  </div>
</template>

<script>
import VxAutoSuggest from "@/components/vx-auto-suggest/VxAutoSuggest.vue";
import VuePerfectScrollbar from "vue-perfect-scrollbar";
import draggable from "vuedraggable";
import axios from "axios";
axios.defaults.baseURL = process.env.VUE_APP_URL;
export default {
  name: "the-navbar",
  props: {
    navbarColor: {
      type: String,
      default: "#fff"
    }
  },
  data() {
    return {
      contentNoti: {
        title: null,
        msg: null,
        time: null
      },
      popupNotification: false,
      currentUser: {
        id: JSON.parse(localStorage.getItem("user")).id,
        positions: this.$store.state.model.employees.positions,
        getPosition: JSON.parse(localStorage.getItem("user")).position
      },
      changeBranchPopup: false,
      branchID: this.$store.state.getBranchId,
      branchName: null,
      branches: null,
      navbarSearchAndPinList: this.$store.state.navbarSearchAndPinList,
      searchQuery: "",
      showFullSearch: false,
      unreadNotifications: [
        {
          index: 0,
          title: "Điểm danh",
          msg:
            "Có 10 học viên nghỉ ở lớp ABC d 10 học viên nghỉ ở lớp  10 học viên nghỉ ở lớp  10 học viên nghỉ ở lớp  10 học viên nghỉ ở lớp ",
          icon: "MessageSquareIcon",
          time: "Wed Jan 30 2019 07:45:23 GMT+0000 (GMT)",
          category: "primary"
        },
        {
          index: 1,
          title: "Giảng dạy",
          msg: "Lớp B đổi giáo viên dạy học",
          icon: "PackageIcon",
          time: "Wed Jan 30 2019 07:45:23 GMT+0000 (GMT)",
          category: "success"
        },
        {
          index: 2,
          title: "Lịch học",
          msg: "Nghỉ đột xuất lý do bão",
          icon: "AlertOctagonIcon",
          time: "Thu Jan 31 2019 07:45:23 GMT+0000 (GMT)",
          category: "danger"
        }
      ],
      settings: {
        // perfectscrollbar settings
        maxScrollbarLength: 60,
        wheelSpeed: 0.6
      },
      autoFocusSearch: false,
      showBookmarkPagesDropdown: false
    };
  },
  watch: {
    $route() {
      if (this.showBookmarkPagesDropdown)
        this.showBookmarkPagesDropdown = false;
    },
    changeBranchId() {
      this.getBranchName();
    }
  },
  computed: {
    changeBranchId: {
      get() {
        return this.$store.state.getBranchId;
      },
      set(val) {
        this.branchID = val;
      }
    },

    // HELPER
    sidebarWidth() {
      return this.$store.state.sidebarWidth;
    },
    breakpoint() {
      return this.$store.state.breakpoint;
    },

    // NAVBAR STYLE
    classObj() {
      if (this.sidebarWidth == "default") return "navbar-default";
      else if (this.sidebarWidth == "reduced") return "navbar-reduced";
      else if (this.sidebarWidth) return "navbar-full";
    },

    // BOOKMARK & SEARCH
    data() {
      return this.$store.state.navbarSearchAndPinList;
    },
    starredPages() {
      return this.$store.state.starredPages;
    },
    starredPagesLimited: {
      get() {
        return this.starredPages.slice(0, 10);
      },
      set(list) {
        this.$store.dispatch("arrangeStarredPagesLimited", list);
      }
    },

    // PROFILE
    user_displayName() {
      return JSON.parse(localStorage.getItem("user")).name || "Guest";
    },
    activeUserImg() {
      return (
        JSON.parse(localStorage.getItem("user")).avatar ||
        this.$store.state.AppActiveUser.img
      );
    }
  },
  created() {
    this.getAllBranches();
    this.getBranchName();
  },
  methods: {
    pushNotification(title, msg, time) {
      this.contentNoti = {
        title: title,
        msg: msg,
        time: time
      };
    },
    changeBranch() {
      this.$store.dispatch("changeBranchData", this.branchID);
      localStorage.setItem("branchId", this.branchID);
      axios
        .get(`branches/${this.branchID}`)
        .then(res => {
          this.$vs.notify({
            title: "Chuyển chi nhánh thành công",
            text: `Chi nhánh hiện tại: ${res.data.data.name}`,
            color: "success",
            iconPack: "feather",
            icon: "icon-check"
          });
        })
        .catch(() => {
          this.$vs.notify({
            title: "Chuyển chi nhánh thành công",
            text: "Lỗi lấy tên chi nhánh",
            color: "danger",
            iconPack: "feather",
            icon: "icon-check"
          });
        });
      this.changeBranchPopup = false;
    },
    getAllBranches() {
      axios
        .get("branches")
        .then(res => {
          this.branches = res.data.data;
          localStorage.setItem("defaultBranchId", res.data.data[0].id);
        })
        .catch(() => {
          this.$vs.notify({
            title: "Lỗi !",
            text: "Có lỗi xảy ra",
            color: "danger",
            iconPack: "feather",
            icon: "icon-check"
          });
        });
    },
    getBranchName() {
      axios.get(`branches/${this.branchID}`).then(res => {
        this.branchName = res.data.data.name;
      });
    },
    showSidebar() {
      this.$store.commit("TOGGLE_IS_SIDEBAR_ACTIVE", true);
    },
    selected(item) {
      this.$router.push(item.url);
      this.showFullSearch = false;
    },
    actionClicked(item) {
      // e.stopPropogation();
      this.$store.dispatch("updateStarredPage", {
        index: item.index,
        val: !item.highlightAction
      });
    },
    showNavbarSearch() {
      this.showFullSearch = true;
    },
    showSearchbar() {
      this.showFullSearch = true;
    },
    elapsedTime(startTime) {
      let x = new Date(startTime);
      let now = new Date();
      var timeDiff = now - x;
      timeDiff /= 1000;

      var seconds = Math.round(timeDiff);
      timeDiff = Math.floor(timeDiff / 60);

      var minutes = Math.round(timeDiff % 60);
      timeDiff = Math.floor(timeDiff / 60);

      var hours = Math.round(timeDiff % 24);
      timeDiff = Math.floor(timeDiff / 24);

      var days = Math.round(timeDiff % 365);
      timeDiff = Math.floor(timeDiff / 365);

      var years = timeDiff;

      if (years > 0) {
        return years + (years > 1 ? " Years " : " Year ") + "ago";
      } else if (days > 0) {
        return days + (days > 1 ? " Days " : " Day ") + "ago";
      } else if (hours > 0) {
        return hours + (hours > 1 ? " Hrs " : " Hour ") + "ago";
      } else if (minutes > 0) {
        return minutes + (minutes > 1 ? " Mins " : " Min ") + "ago";
      } else if (seconds > 0) {
        return seconds + (seconds > 1 ? `${seconds} sec ago` : "just now");
      }

      return "Just Now";
    },
    outside: function() {
      this.showBookmarkPagesDropdown = false;
    },
    async logout() {
      this.$vs.loading({
        color: "#7367F0",
        text: "Signing out..."
      });
      await this.$auth.logOut();
      setTimeout(() => {
        this.$vs.loading.close();
        this.$router.push("/pages/login");
      }, 1000);
    }
  },
  directives: {
    "click-outside": {
      bind: function(el, binding) {
        const bubble = binding.modifiers.bubble;
        const handler = e => {
          if (bubble || (!el.contains(e.target) && el !== e.target)) {
            binding.value(e);
          }
        };
        el.__vueClickOutside__ = handler;
        document.addEventListener("click", handler);
      },

      unbind: function(el) {
        document.removeEventListener("click", el.__vueClickOutside__);
        el.__vueClickOutside__ = null;
      }
    }
  },
  components: {
    VxAutoSuggest,
    VuePerfectScrollbar,
    draggable
  }
};
</script>
<style lang="scss"></style>

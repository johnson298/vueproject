<template>
<div id="profile-page">

    <!-- COL AREA -->
    <h2 class="text-center mb-10">Lớp: <span class="text-primary">{{course.name}}</span> </h2>
    <vx-card code-toggler class="custom-card">
        <div class="mt-5 custom-tab">
            <vs-tabs>
                <vs-tab label="Danh sách học viên">
                    <ListStudent/>
                </vs-tab>
                <vs-tab label="Lịch sử">
                    <div class="tab-text">
                        ...
                    </div>
                </vs-tab>
                <vs-tab label="Thống kê">
                    <div class="tab-text">
                        <div class="">
                            ...
                        </div>
                    </div>
                </vs-tab>
            </vs-tabs>
        </div>
    </vx-card>
</div>
</template>

<script>
import 'video.js/dist/video-js.css';
import ListStudent from './ListStudent.vue';

export default {
  data() {
    return {
      isNavOpen: true,
      wasSidebarOpen: null,
      course: {}
    };
  },
  components: {
    ListStudent
  },
  created() {
    let vm = this;
    this.$http.get('courses/' + this.$route.params.course).then(function (response) {
      vm.course = response.data.data;
    }).catch(() => {
      this.$router.push('/pages/error-404');
      this.$vs.notify({
        title: 'Error!',
        text: 'Có lỗi xảy ra',
        iconPack: 'feather',
        icon: 'fa fa-lg fa-exclamation-triangle',
        color: 'danger'
      });
    });
  },
  filters: {
    trim: function (string) {
      return string.trim();
    }

  },
  methods: {

    mounted() {
      this.wasSidebarOpen = this.$store.state.reduceButton;
      this.$store.commit('TOGGLE_REDUCE_BUTTON', false);
    },
    beforeDestroy() {
      if (!this.wasSidebarOpen) this.$store.commit('TOGGLE_REDUCE_BUTTON', false);
    },
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

            input[type='file'] {
                cursor: pointer;
                width: 65px;
                height: 34px;
                overflow: hidden;

                &::before {
                    content: 'change';
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
            content: '';
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

            button {
                font-size: 18px;
                font-weight: bold;
                padding-top: 22px;
                padding-bottom: 22px;
            }
        }
    }
}

.vx-card {

    .vx-card__header {
        display: none;
    }

}

.vx-card.custom-card .vx-card__body {
    padding: 0;
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

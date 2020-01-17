<template>
    <div>
      <VuePerfectScrollbar class="scroll-area--data-list-add-new pt-4 pb-6" :settings="settings">
        <div class="p-6">
          <h4 class="text-center uppercase">Thông tin phòng học</h4>
          <vs-input label="Tên phòng học" name="name" type="text" v-model="rooms.name" class="mt-5 w-full" />
        </div>
      </VuePerfectScrollbar>

      <div class="flex flex-wrap items-center justify-center p-6" slot="footer">
        <vs-button class="mr-6 vs-con-loading__container" :disabled="errors.any()" id="button-with-loading" @click="updateRoom()">Cập nhật</vs-button>
        <vs-button type="border" color="danger" @click="isSidebarActiveLocal = false">Hủy</vs-button>
      </div>
    </div>
</template>

<script>
import VuePerfectScrollbar from 'vue-perfect-scrollbar';

export default {
  props: {
    isSidebarEditActive: {
      type: Boolean,
      required: true
    },
    getData: {
      type: Function,
      required: true
    },
    roomGetInfo: {
      required: false
    }
  },
  methods: {
    updateRoom() {
      this.$vs.loading({
        background: '#1E6DB5',
        color: '#fff',
        container: '#button-with-loading',
        scale: 0.45
      });
      this.$http.put('branches/'+ this.branchId + '/rooms/' + this.roomGetInfo, {
        name: this.rooms.name,
      }, {
      })
        .then(() => {
          this.getData();
          this.isSidebarActiveLocal = false;
          this.$vs.notify({
            title: 'Cập nhật thành công',
            text: 'OK',
            iconPack: 'feather',
            icon: 'fa fa-lg fa-check-circle',
            color: 'success'
          });
        })
        .catch((error) => {
          this.checkResponRequest(error.response.data, null, null, 'Sửa thất bại');
        }).finally(() => {
          this.$vs.loading.close('#button-with-loading > .con-vs-loading');
        });
    },
  },
  data() {
    return {
      rooms :{
        name : '',
      },
      disabled: true,
      settings: {
        maxScrollbarLength: 60,
        wheelSpeed: .60,
      },
    };
  },
  computed: {
    isSidebarActiveLocal: {
      get() {
        return this.isSidebarEditActive;
      },
      set(val) {
        if (!val) {
          this.$emit('closeSidebar');
        }
      }
    },
    branchId(){
      return this.$store.state.getBranchId;
    }
  },
  components: {
    VuePerfectScrollbar,
  },
};
</script>

<style lang="scss" scoped>
    .add-new-data-sidebar {
        /deep/ .vs-sidebar--background {
            z-index: 52010;
        }

        /deep/ .vs-sidebar {
            z-index: 52010;
            width: 400px;
            max-width: 90vw;

            .img-upload {
                margin-top: 2rem;

                .con-img-upload {
                    padding: 0;
                }

                .con-input-upload {
                    width: 100%;
                    margin: 0;
                }
            }
        }
    }

    .scroll-area--data-list-add-new {
        height: calc(100% - 4.3rem);
    }
</style>

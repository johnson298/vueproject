<template>
<vs-sidebar click-not-close position-right parent="body" default-index="1" color="primary" class="add-new-data-sidebar items-no-padding" spacer v-model="isSidebarActiveLocal">
    <div class="mt-6 flex items-center justify-between px-6">
        <h4>Thêm khuyến mại</h4>
        <feather-icon icon="XIcon" @click.stop="isSidebarActiveLocal = false" class="cursor-pointer"></feather-icon>
    </div>
    <vs-divider class="mb-0"></vs-divider>

    <VuePerfectScrollbar class="scroll-area--data-list-add-new pt-4 pb-6" :settings="settings">

        <div class="p-6">
            <form>

                <div>
                    <h4 class="text-center uppercase">Thông tin khuyến mại</h4>
                    <!--type-->
                    <div>
                        <vs-select v-model="coupon.type" label="Loại khuyến mại" class="mt-5 w-full">
                            <vs-select-item :key="item.value" :value="item.value" :text="item.text" v-for="item in type" />
                        </vs-select>
                    </div>
                    <!--chiet khau %-->
                    <div v-if="coupon.type==1">
                        <vs-input label="Chiếu khấu %" type="number" name="discount_rate" v-model="coupon.discount_rate" class="mt-5 w-full" />
                    </div>
                      <!-- khuyen mai theo so tien -->
                    <div v-else>
                        <vs-input label="Khuyến mại theo số tiền" type="number" name="discount_amount" v-model="coupon.discount_amount" v-validate="'required|min:0'" class="mt-5 w-full" />
                    </div>
                    <!--trang thai-->
                    <div>
                        <vs-select v-model="coupon.status" label="Trạng thái" class="mt-5 w-full">
                            <vs-select-item :key="item.value" :value="item.value" :text="item.text" v-for="item in status" />
                        </vs-select>
                    </div>
                    <!--nghi chú-->
                    <div>
                      <div class="note mt-5"><label class="vs-input--label">Ghi chú</label></div>
                      <vs-textarea style="border: solid 1px #dddddd" name="note" type="text" v-model="coupon.note" class="w-full" :rows="5"/>
                    </div>
                </div>
            </form>
        </div>
    </VuePerfectScrollbar>

    <div class="flex flex-wrap items-center justify-center p-6" slot="footer">
        <vs-button class="mr-6 vs-con-loading__container" @click="createCoupon" :disabled="errors.any()" ref="addButton" id="button-with-loading">Thêm</vs-button>
        <vs-button type="border" color="danger" @click="isSidebarActiveLocal = false">Hủy</vs-button>
    </div>
</vs-sidebar>
</template>

<script>
import VuePerfectScrollbar from 'vue-perfect-scrollbar';

export default {
  props: {
    isSidebarActive: {
      type: Boolean,
      required: true
    },
    callback: {
      type: Function,
      required: true
    }
  },
  data() {
    return {
      coupon: {
        type: 1,
        discount_rate: 0,
        discount_amount: 0,
        status: 1,
        note: ''
      },
      type: this.$store.state.model.coupons.type,
      status: this.$store.state.model.coupons.status,
      disabled: true,
      settings: { // perfectscrollbar settings
        maxScrollbarLength: 60,
        wheelSpeed: .60,
      },
    };
  },
  computed: {
    isSidebarActiveLocal: {
      get() {
        return this.isSidebarActive;
      },
      set(val) {
        if (!val) {
          this.$emit('closeSidebar');
          this.initValues();
        }
      }
    }
  },
  components: {
    VuePerfectScrollbar,
  },
  methods: {
    initValues() {
      this.coupon = {
        type: 1,
        discount_rate: 0,
        discount_amount: 0,
        status: 1,
        note: ''
      };
    },
    createCoupon() {
      this.$vs.loading({
        background: '#1E6DB5',
        color: '#fff',
        container: '#button-with-loading',
        scale: 0.45
      });
      this.$http.post('coupons', {
        type: this.coupon.type,
        discount_rate: this.coupon.discount_rate,
        discount_amount: this.coupon.discount_amount,
        status: this.coupon.status,
        note: this.coupon.note
      })
        .then(() => {
          this.$vs.notify({
            title: 'Đã thêm mới thành công',
            text: 'OK',
            iconPack: 'feather',
            icon: 'fa fa-lg fa-check-circle',
            color: 'success'
          });
          this.callback();
          this.initValues();
        })
        .catch((error) => {
          if (error.response.status === 500 && error.response.data.error.hasOwnProperty('validation')) {
            let message = error.response.data.error.validation[Object.keys(error.response.data.error.validation)[0]][0];
            this.$vs.notify({
              title: 'Validation error!',
              text: message,
              iconPack: 'feather',
              icon: 'fa fa-lg fa-exclamation-triangle',
              color: 'danger'
            });
          } else {
            this.$vs.notify({
              title: 'Error!',
              text: 'Thêm mới thất bại',
              iconPack: 'feather',
              icon: 'fa fa-lg fa-exclamation-triangle',
              color: 'danger'
            });
          }
        }).finally(() => {
          this.$vs.loading.close('#button-with-loading > .con-vs-loading');
        });
    }
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

<template>
<vs-sidebar click-not-close position-right parent="body" default-index="1" color="primary" class="add-new-data-sidebar items-no-padding" spacer v-model="isSidebarActiveLocal">
    <div class="mt-6 flex items-center justify-between px-6">
      <h4>Thêm chương trình học</h4>
      <feather-icon icon="XIcon" @click.stop="isSidebarActiveLocal = false" class="cursor-pointer"></feather-icon>
    </div>
    <vs-divider class="mb-0"></vs-divider>

    <VuePerfectScrollbar class="scroll-area--data-list-add-new pt-4 pb-6" :settings="settings">

        <div class="p-6">
            <form>
                <div class="mt-8">
                    <h4 class="text-center uppercase">Thông tin chương trình</h4>
                    <!-- tên chương trình -->
                    <div>
                        <vs-input label="Tên chương trình *" name="name" v-model="program.name" class="mt-5 w-full" v-validate="'required'" placeholder="nhập tên chương trình" />
                    </div>
                    <!--Số bài học-->
                    <div>
                        <vs-input label="Số bài học *" name="number_of_lessons" type="number" v-model="program.number_of_lessons" class="mt-5 w-full"/>
                    </div>
                    <!--Giá tiền-->
                    <div>
                        <vs-input label="Giá tiền (vnđ) *" name="price" type="number" v-model="program.price" class="mt-5 w-full" />
                    </div>
                    <!--mô tả-->
                    <div>
                        <div class="mt-5 note"><label class="vs-input--label">Ghi chú</label></div>
                        <vs-textarea style="border: solid 1px #dddddd" name="description" type="text" v-model="program.description" class="w-full" :rows="5" placeholder="nhập ghi chú" />
                    </div>
                </div>

            </form>
        </div>
    </VuePerfectScrollbar>

    <div class="flex flex-wrap items-center justify-center p-6" slot="footer">
        <vs-button class="mr-6 vs-con-loading__container" @click="createProgram" :disabled="errors.any()" ref="addButton" id="button-with-loading">Thêm</vs-button>
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
      program: {
        name: '',
        description: '',
        price: null,
        number_of_lessons: null
      },
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
    },
    branchId(){
      return this.$store.state.getBranchId;
    }
  },
  components: {
    VuePerfectScrollbar,
  },

  methods: {
    formData() {
      let formData = new FormData();
      Object.keys(this.program).map(key => {
        formData.append(key, this.program[key]);
      });
      return formData;
    },
    initValues() {
      this.program = {
        name: '',
        description: '',
        price: '',
        number_of_lessons: ''
      };
    },
    createProgram() {
      this.$vs.loading({
        background: '#1E6DB5',
        color: '#fff',
        container: '#button-with-loading',
        scale: 0.45
      });
      this.$http.post(`branches/${this.branchId}/programs`, this.formData())
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
          this.$emit('closeSidebar', false);
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

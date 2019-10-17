<template>
<vs-sidebar click-not-close position-right parent="body" default-index="1" color="primary" class="add-new-data-sidebar items-no-padding" spacer v-model="isSidebarActiveLocal">
    <div class="mt-6 flex items-center justify-between px-6">
      <h4>Thêm bài học</h4>
      <feather-icon icon="XIcon" @click.stop="isSidebarActiveLocal = false" class="cursor-pointer"></feather-icon>
    </div>
    <vs-divider class="mb-0"></vs-divider>

    <VuePerfectScrollbar class="scroll-area--data-list-add-new pt-4 pb-6" :settings="settings">

        <div class="p-6">
            <form>
                <div class="mt-8">
                    <h4 class="text-center uppercase">Thông tin bài học</h4>
                    <!-- tiêu đề bài học -->
                    <div>
                        <vs-input label="Tiêu đề bài học" name="title" v-model="lesson.title" class="mt-5 w-full" v-validate="'required'" placeholder="Nhập tiêu đề bài học" />
                        <small class="text-danger">{{ errors.first('name') }}</small>
                    </div>
                    <!--link bài học-->
                    <div>
                        <vs-input label="Link  bài học" name="link" aria-placeholder="Nhập link bài học" v-model="lesson.link" class="mt-5 w-full"/>
                    </div>
                    <!--mô tả-->
                    <div>
                        <div class="mt-5 note"><label class="vs-input--label">Mô tả</label></div>
                        <vs-textarea style="border: solid 1px #dddddd" name="description" type="text" v-model="lesson.description" class="w-full" :rows="5" placeholder="Nhập mô tả ..." />
                    </div>
                </div>
            </form>
        </div>
    </VuePerfectScrollbar>

    <div class="flex flex-wrap items-center justify-center p-6" slot="footer">
        <vs-button class="mr-6 vs-con-loading__container" :disabled="errors.any()" ref="addButton" id="button-with-loading">Thêm</vs-button>
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
      lesson: {
        title: '',
        description: '',
        link:''
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
        background: 'primary',
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

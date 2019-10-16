<template>
<vs-sidebar click-not-close position-right parent="body" default-index="1" color="primary" class="add-new-data-sidebar items-no-padding" spacer v-model="isSidebarActiveLocal">
    <div class="mt-6 flex items-center justify-between px-6">
        <h4>Chỉnh sửa chương trình học</h4>
        <feather-icon icon="XIcon" @click.stop="isSidebarActiveLocal = false" class="cursor-pointer"></feather-icon>
    </div>
    <vs-divider class="mb-0"></vs-divider>

    <VuePerfectScrollbar class="scroll-area--data-list-add-new pt-4 pb-6" :settings="settings">

        <div class="p-6">
            <form>

                <div>
                    <h4 class="text-center uppercase">Thông tin chương trình</h4>
                    <!--Ten chương trình-->
                    <div>
                        <vs-input label="Tên chương trình" name="name" type="text" v-model="programInfo.name" class="mt-5 w-full" />
                    </div>

                    <!--Số bài học-->
                    <div>
                        <vs-input label="Số bài học" name="nanumber_of_lessonsme" type="text" v-model="programInfo.number_of_lessons" class="mt-5 w-full" />
                    </div>

                    <!--Giá tiền-->
                    <div>
                        <vs-input label="Giá tiền" name="description" type="text" v-model="programInfo.price" class="mt-5 w-full" />
                    </div>
                    <!--Mô tả-->
                    <div>
                        <div class="note mt-5"><label class="vs-input--label">Note</label></div>
                        <vs-textarea style="border: solid 1px #dddddd" name="note" type="text" v-model="programInfo.description" class="w-full" :rows="5" />
                    </div>

                </div>

            </form>
        </div>
    </VuePerfectScrollbar>

    <div class="flex flex-wrap items-center justify-center p-6" slot="footer">
        <vs-button class="mr-6 vs-con-loading__container" :disabled="errors.any()" ref="addButton" id="button-with-loading" @click="updateProgram(programInfo)">Chỉnh sửa</vs-button>
        <vs-button type="border" color="danger" @click="isSidebarActiveLocal = false">Hủy</vs-button>
    </div>
</vs-sidebar>
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
    programInfo: {
      required: false
    }
  },
  methods: {
    formData() {
      let formData = new FormData();
      Object.keys(this.programInfo).map(key => {
        formData.append(key, this.programInfo[key]);
      });
      formData.append('_method', 'PUT');
      return formData;
    },
    updateProgram(program) {
      this.$vs.loading({
        background: '#1E6DB5',
        color: '#fff',
        container: '#button-with-loading',
        scale: 0.45
      });
      this.$http.post(`branches/${this.branchId}/programs/${program.id}`, this.formData(), {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
      })
        .then(() => {
          this.getData();
          this.$vs.notify({
            title: 'Đã sửa thành công',
            text: 'OK',
            iconPack: 'feather',
            icon: 'fa fa-lg fa-check-circle',
            color: 'success'
          });
        })
        .catch((error) => {

          if (error.response.data.error.hasOwnProperty('validation')) {
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
              text: 'Sửa thất bại',
              iconPack: 'feather',
              icon: 'fa fa-lg fa-exclamation-triangle',
              color: 'danger'
            });
          }
        }).finally(() => {
          this.$vs.loading.close('#button-with-loading > .con-vs-loading');
        });
    },
  },
  data() {
    return {
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
  branchId(){
    return this.$store.state.getBranchId;
  }
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

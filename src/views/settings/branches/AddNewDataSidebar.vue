<template>
    <div>
      <VuePerfectScrollbar class="scroll-area--data-list-add-new pt-4 pb-6" :settings="settings">
        <div class="p-6">
          <h4 class="text-center uppercase">Thông tin chi nhánh</h4>
          <vs-input
            label="Tên chi nhánh"
            name="name"
            v-model="branches.name"
            class="mt-5 w-full"
            v-validate="'required'"
          />
          <vs-input
            label="Địa chỉ"
            name="address"
            v-model="branches.address"
            class="mt-5 w-full"
            v-validate="'required'"
          />
        </div>
      </VuePerfectScrollbar>
      <div class="flex flex-wrap items-center justify-center p-6" slot="footer">
        <vs-button
          class="mr-6 vs-con-loading__container"
          @click="createBranches"
          :disabled="errors.any()"
          ref="addButton"
          id="button-with-loading"
        >Thêm</vs-button>
        <vs-button type="border" color="danger" @click="isSidebarActiveLocal = false">Trở lại</vs-button>
      </div>
    </div>
</template>

<script>
import VuePerfectScrollbar from "vue-perfect-scrollbar";

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
      branches: {
        address: "",
        name: ""
      },
      disabled: true,
      settings: {
        // perfectscrollbar settings
        maxScrollbarLength: 60,
        wheelSpeed: 0.6
      }
    };
  },
  computed: {
    isSidebarActiveLocal: {
      get() {
        return this.isSidebarActive;
      },
      set(val) {
        if (!val) {
          this.$emit("closeSidebar");
          this.initValues();
        }
      }
    }
  },
  components: {
    VuePerfectScrollbar
  },

  methods: {
    formData() {
      let formData = new FormData();
      Object.keys(this.branches).map(key => {
        formData.append(key, this.branches[key]);
      });
      return formData;
    },
    initValues() {
      this.branches = {
        address: "",
        name: ""
      };
    },
    createBranches() {
      this.$vs.loading({
        background: "#1E6DB5",
        color: "#fff",
        container: "#button-with-loading",
        scale: 0.45
      });
      this.$http
        .post("branches", this.formData())
        .then(() => {
          this.$vs.notify({
            title: "Đã thêm mới thành công",
            text: "OK",
            iconPack: "feather",
            icon: "fa fa-lg fa-check-circle",
            color: "success"
          });
          this.callback();
          this.initValues();
          this.$emit("closeSidebar", false);
        })
        .catch(error => {
          this.checkResponRequest(error.response.data, null, null, "Thêm mới thất bại");
        })
        .finally(() => {
          this.$vs.loading.close("#button-with-loading > .con-vs-loading");
        });
    }
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

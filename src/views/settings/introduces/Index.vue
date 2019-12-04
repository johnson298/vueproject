<template>
  <vx-card class="ml-5">
    <vs-row class="p-0 pr-5">
      <vs-col vs-w="12">
        <vs-input
          label="Tiêu đề"
          name="title"
          class="mt-5 w-full"
          placeholder="Nhập tiêu đề"
          v-model="content.title"
        />
      </vs-col>
      <vs-col vs-w="12" class="mt-5">
        <label for="" class="vs-input--label">Nội dung</label>
        <quill-editor v-model="content.introduces"></quill-editor>
      </vs-col>
    </vs-row>
    <vs-row vs-type="flex" vs-justify="space-between" class="mt-5">
      <vs-col class="text-right">
        <button
          id="update-loading"
          class="vs-component vs-button vs-button-primary vs-button-filled mr-5 vs-con-loading__container"
          ref="addButton"
          @click="updateInfomation"
        >
          Lưu thay đổi
        </button>
      </vs-col>
    </vs-row>
  </vx-card>
</template>

<script>
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";

import { quillEditor } from "vue-quill-editor";
export default {
  data() {
    return {
      content: {
        title: "",
        introduces: `...`
      }
    };
  },
  created() {
    this.getData();
  },
  methods: {
    updateInfomation() {
      this.$vs.loading({
        background: '#1E6DB5',
        color: '#fff',
        container: '#update-loading',
        scale: 0.45
      });
      this.$http
        .put("introduces", {
          title: this.content.title,
          introduces: this.content.introduces,
          mode: 'introduce'
        })
        .then(() => {
          this.$vs.notify({
            title: 'Chỉnh sửa thành công',
            text: 'OK',
            iconPack: 'feather',
            icon: 'fa fa-lg fa-check-circle',
            color: 'success'
          });
        })
        .catch(error => {
          this.checkResponRequest(error.response.data, null, null, "Thêm mới thất bại");
        })
        .finally(() => {
          this.$vs.loading.close('#update-loading > .con-vs-loading');
        });
    },
    getData() {
      let vm = this;
      vm.$vs.loading({
        color: "#1E6DB5",
        text: "Loading..."
      });
      this.$http
        .get("introduces")
        .then(function(response) {
          vm.content = response.data.data;
        })
        .catch(error => {
          vm.checkResponRequest(error.data.data);
        })
        .finally(function() {
          vm.$vs.loading.close();
        });
    }
  },
  components: {
    quillEditor
  }
};
</script>

<style lang="scss" scoped>
.custom-w {
  width: 96.5%;
}

.con-img-upload {
  .img-upload {
    border-radius: 10px;
    transform: scale(0.99);

    img {
      max-width: none;
      max-height: 100%;
    }

    .material-icons {
      width: 26px;
      height: 26px;
      line-height: 26px;
      padding-right: 8px !important;
    }
  }
}

.add-new-data-sidebar {
  .vs-sidebar--background {
    z-index: 52010;
  }

  .vs-sidebar {
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

<template>
<vx-card class="ml-5">
    <vs-row class="p-0 pr-5">
        <vs-col vs-w="12" class="p-0">
            <div class="vx-card__title mb-3">
                <h4 class="text-dark">Đổi tên hệ thống</h4>
            </div>
            <div class="vx-row mb-6">
                <div class="vx-col w-full">
                    <vs-input class="w-full" placeholder="Nhập tên mới" />
                </div>
            </div>
            <div class="vx-card__title mb-3">
                <h4 class="text-dark">Đổi Url</h4>
            </div>
            <div class="vx-row mb-6">
                <div class="vx-col w-full">
                    <vs-input class="w-full" placeholder="Nhập url mới" />
                </div>
            </div>
            <div class="vx-card__title mb-3">
                <h4 class="text-dark">Đổi Email</h4>
            </div>
            <div class="vx-row mb-6">
                <div class="vx-col w-full">
                    <vs-input class="w-full" placeholder="Nhập email mới" />
                </div>
            </div>
            <div class="vx-card__title mb-3">
                <h4 class="text-dark">ESMS</h4>
            </div>
            <div class="vx-row mb-6">
                <div class="vx-col w-full">
                    <vs-input class="w-full" placeholder="Nhập link API" />
                </div>
            </div>
        </vs-col>
        <vs-col vs-w="12" class="d-flex p-0">
            <div class="md:w-1/2">
                <div class="vx-card__title mb-3">
                    <h4 class="text-dark">Đổi logo</h4>
                </div>
                <div class="vx-row mb-6">
                    <div class="vx-col w-full pl-3">
                        <div class="con-upload custom-upload-image" v-if="srcLogo" key="srcLogo">
                            <div class="con-img-upload">
                                <div class="upload-logo">
                                    <div class="img-upload">
                                        <button class="btn-x-file">
                                            <i translate="translate" @click="deleteLogo" class="material-icons notranslate">
                                                clear
                                            </i></button>
                                        <img :src="srcLogo" ref="logo" class="img--upload" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="con-input-upload" v-else key="srcLogo">
                            <input type="file" @change="changeLogo($event)" accept="image/*" ref="file" />
                            <span class="text-input"> Upload File </span><span class="input-progress" style="width: 0%;"></span><button type="button" title="Upload" class="btn-upload-all vs-upload--button-upload">
                                <i translate="translate" class="material-icons notranslate">
                                    cloud_upload
                                </i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="md:w-1/2">
                <div class="vx-card__title mb-3">
                    <h4 class="text-dark">Đổi favicon</h4>
                </div>
                <div class="vx-row mb-6">
                    <div class="vx-col w-full pl-3">
                        <div class="con-upload custom-upload-image" v-if="srcIcon" key="srcLogo">
                            <div class="con-img-upload">
                                <div class="upload-logo">
                                    <div class="img-upload">
                                        <button class="btn-x-file">
                                            <i translate="translate" @click="deleteIcon" class="material-icons notranslate">
                                                clear
                                            </i></button>
                                        <img :src="srcIcon" ref="logo" class="img--upload" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="con-input-upload" v-else key="srcLogo">
                            <input type="file" @change="changeIcon($event)" accept="image/*" ref="file" />
                            <span class="text-input"> Upload File </span><span class="input-progress" style="width: 0%;"></span><button type="button" title="Upload" class="btn-upload-all vs-upload--button-upload">
                                <i translate="translate" class="material-icons notranslate">
                                    cloud_upload
                                </i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </vs-col>
    </vs-row>
    <vs-row vs-type="flex" vs-justify="space-between">
        <vs-col class="text-right">
            <button id="update-loading" class="vs-component vs-button vs-button-primary vs-button-filled" ref="addButton" @click="updateStudent(student)">
                Lưu thay đổi
            </button>
        </vs-col>
    </vs-row>
</vx-card>
</template>

<script>
export default {
  data() {
    return {
      srcLogo: null,
      srcIcon: null
    };
  },
  methods: {
    successUpload() {
      this.$vs.notify({
        color: "success",
        title: "Upload",
        text: "Upload thành công"
      });
    },
    changeLogo(e) {
      let url = e.target.files[0];
      this.srcLogo = URL.createObjectURL(url);
    },
    changeIcon(e) {
      let url = e.target.files[0];
      this.srcIcon = URL.createObjectURL(url);
    },
    deleteLogo() {
      this.srcLogo = null;
    },
    deleteIcon() {
      this.srcIcon = null;
    },
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
        transform: scale(.99);

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

<template>
  <vx-card class="ml-5">
    <vs-row class="p-0 pr-5">
      <vs-col vs-w="12" class="p-0">
        <div class="vx-card__title mb-3">
          <h5 class="text-dark">Đổi tên hệ thống</h5>
          <div class="mt-3">
            <div class="d-flex" v-if="edit.name" key="name">
              <vs-input
                class="w-full mr-3"
                placeholder="Nhập tên mới"
                ref="name"
                v-model="configs.name.value"
                @keyup.enter="updateField('name')"
                @keyup.esc="editField('name')"
              />
              <vs-button
                icon="check"
                size="small"
                color="success"
                radius
                @click="updateField('name')"
              ></vs-button>
              <vs-button
                class="ml-2"
                icon="clear"
                size="small"
                color="danger"
                radius
                @click="editField('name')"
              ></vs-button>
            </div>
            <div class="d-flex justify-start" v-else key="name">
              <p class="min-w-200 mr-3">{{ configs.name.value }}</p>
              <vs-button
                size="small"
                type="flat"
                radius
                @click="editField('name')"
                class="p-0 btn--no-hover"
                color="white"
              >
                <feather-icon
                  icon="Edit3Icon"
                  svgClasses="text-warning w-5 h-5"
                />
              </vs-button>
            </div>
          </div>
        </div>
      </vs-col>
      <vs-col vs-w="12" class="p-0">
        <div class="vx-card__title mb-3">
          <h5 class="text-dark">Email</h5>
          <div class="mt-3">
            <div class="d-flex" v-if="edit.email" key="email">
              <vs-input
                class="w-full mr-3"
                placeholder="Nhập email"
                ref="email"
                v-model="configs.email.value"
                @keyup.enter="updateField('email')"
                @keyup.esc="editField('email')"
              />
              <vs-button
                icon="check"
                size="small"
                color="success"
                radius
                @click="updateField('email')"
              ></vs-button>
              <vs-button
                class="ml-2"
                icon="clear"
                size="small"
                color="danger"
                radius
                @click="editField('email')"
              ></vs-button>
            </div>
            <div class="d-flex justify-start" v-else key="email">
              <p class="min-w-200 mr-3">{{ configs.email.value }}</p>
              <vs-button
                size="small"
                type="flat"
                radius
                @click="editField('email')"
                class="p-0 btn--no-hover"
                color="white"
              >
                <feather-icon
                  icon="Edit3Icon"
                  svgClasses="text-warning w-5 h-5"
                />
              </vs-button>
            </div>
          </div>
        </div>
      </vs-col>
      <vs-col vs-w="12" class="p-0">
        <div class="vx-card__title mb-3">
          <h5 class="text-dark">Hotline</h5>
          <div class="mt-3">
            <div class="d-flex" v-if="edit.hotline" key="hotline">
              <vs-input
                class="w-full mr-3"
                placeholder="Nhập hotline"
                ref="hotline"
                v-model="configs.hotline.value"
                @keyup.enter="updateField('hotline')"
                @keyup.esc="editField('hotline')"
              />
              <vs-button
                icon="check"
                size="small"
                color="success"
                radius
                @click="updateField('hotline')"
              ></vs-button>
              <vs-button
                class="ml-2"
                icon="clear"
                size="small"
                color="danger"
                radius
                @click="editField('hotline')"
              ></vs-button>
            </div>
            <div class="d-flex justify-start" v-else key="hotline">
              <p class="min-w-200 mr-3">{{ configs.hotline.value }}</p>
              <vs-button
                size="small"
                type="flat"
                radius
                @click="editField('hotline')"
                class="p-0 btn--no-hover"
                color="white"
              >
                <feather-icon
                  icon="Edit3Icon"
                  svgClasses="text-warning w-5 h-5"
                />
              </vs-button>
            </div>
          </div>
        </div>
      </vs-col>
      <vs-col vs-w="12" class="p-0">
        <div class="vx-card__title mb-3">
          <h5 class="text-dark">Địa chỉ (trụ sở chính)</h5>
          <div class="mt-3">
            <div class="d-flex" v-if="edit.address" key="address">
              <vs-input
                class="w-full mr-3"
                placeholder="Nhập address"
                ref="address"
                v-model="configs.address.value"
                @keyup.enter="updateField('address')"
                @keyup.esc="editField('address')"
              />
              <vs-button
                icon="check"
                size="small"
                color="success"
                radius
                @click="updateField('address')"
              ></vs-button>
              <vs-button
                class="ml-2"
                icon="clear"
                size="small"
                color="danger"
                radius
                @click="editField('address')"
              ></vs-button>
            </div>
            <div class="d-flex justify-start" v-else key="address">
              <p class="min-w-200 mr-3">{{ configs.address.value }}</p>
              <vs-button
                size="small"
                type="flat"
                radius
                @click="editField('address')"
                class="p-0 btn--no-hover"
                color="white"
              >
                <feather-icon
                  icon="Edit3Icon"
                  svgClasses="text-warning w-5 h-5"
                />
              </vs-button>
            </div>
          </div>
        </div>
      </vs-col>
      <vs-col vs-w="12" class="p-0">
        <div class="vx-card__title mb-3">
          <h5 class="text-dark">Copyright</h5>
          <div class="mt-3">
            <div class="d-flex" v-if="edit.copyright" key="copyright">
              <vs-input
                class="w-full mr-3"
                placeholder="Nhập copyright"
                ref="copyright"
                v-model="configs.copyright.value"
                @keyup.enter="updateField('copyright')"
                @keyup.esc="editField('copyright')"
              />
              <vs-button
                icon="check"
                size="small"
                color="success"
                radius
                @click="updateField('copyright')"
              ></vs-button>
              <vs-button
                class="ml-2"
                icon="clear"
                size="small"
                color="danger"
                radius
                @click="editField('copyright')"
              ></vs-button>
            </div>
            <div class="d-flex justify-start" v-else key="copyright">
              <p class="min-w-200 mr-3">{{ configs.copyright.value }}</p>
              <vs-button
                size="small"
                type="flat"
                radius
                @click="editField('copyright')"
                class="p-0 btn--no-hover"
                color="white"
              >
                <feather-icon
                  icon="Edit3Icon"
                  svgClasses="text-warning w-5 h-5"
                />
              </vs-button>
            </div>
          </div>
        </div>
      </vs-col>
      <vs-col vs-w="12" class="d-flex p-0">
        <div class="md:w-1/2 d-flex align-center flex-direction-colum">
          <div class="vx-row mb-6">
            <vx-upload-image 
              text="Đổi logo"
              :v-model-show="configs.logo.image"
              :src-image="srcLogo"
              :show.sync="configs.logo.image"
              :src.sync="srcLogo"
              :style-text="styleLabel"
              >
              <vs-button
                v-if="! (typeof configs.logo.image == 'string')"
                color="success"
                class="vs-upload--button-upload"
                icon="cloud_upload"
                @click="updateField('logo')"
              ></vs-button>
            </vx-upload-image>
          </div>
        </div>
        <div class="md:w-1/2 d-flex align-center flex-direction-colum">
          <div class="vx-row mb-6">
            <vx-upload-image 
              text="Đổi favicon"
              :v-model-show="configs.favicon.image"
              :src-image="srcFavicon"
              :show.sync="configs.favicon.image"
              :src.sync="srcFavicon"
              :style-text="styleLabel"
              >
              <vs-button
                v-if="! (typeof configs.favicon.image == 'string')"
                color="success"
                class="vs-upload--button-upload"
                icon="cloud_upload"
                @click="updateField('favicon')"
              ></vs-button>
            </vx-upload-image>
          </div>
        </div>
      </vs-col>
    </vs-row>
  </vx-card>
</template>

<script>
export default {
  data() {
    return {
      styleLabel: {
        fontSize: "17px",
        fontWeight: 500,
        display: "block",
        textAlign: "center"
      },
      srcLogo: null,
      srcFavicon: null,
      edit: {
        name: false,
        logo: false,
        favicon: false,
        hotline: false,
        email: false,
        address: false,
        copyright: false
      },

      configs: {
        name: {
          name: "name",
          value: "Etado",
          image: ""
        },
        email: {
          name: "email",
          value: "info@itsweb.vn",
          image: ""
        },
        hotline: {
          name: "hotline",
          value: "0332034576",
          image: ""
        },
        address: {
          name: "address",
          value:
            "Tầng 2, Số 133, Ngõ 1194 Đường Láng, Phường Láng Thượng, Quận Đống Đa, TP Hà Nội",
          image: ""
        },
        copyright: {
          name: "copyright",
          value: `COPYRIGHT @ ${new Date().getFullYear()} etado.vn, đã đăng ký bản quyền`,
          image: ""
        },
        logo: {
          name: "logo",
          value: "@/assets/images/logo/etado-logo.png",
          image: ""
        },
        favicon: {
          name: "favicon",
          value: "@/assets/images/logo/etado-favicon.ico",
          image: ""
        }
      }
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getObjectInfo(array) {
      let obj = {};
      let check = input => {
        return array.filter(e => e.name == input)[0];
      };
      array
        .map(e => e.name)
        .forEach(item => {
          obj[item] = check(item);
        });
      return obj;
    },
    successUpload() {
      this.$vs.notify({
        color: "success",
        title: "Upload",
        text: "Upload thành công"
      });
    },
    changeLogo(e) {
      let url = e.target.files[0];
      this.configs.logo.image = url;
      this.srcLogo = URL.createObjectURL(url);
    },
    changeFavicon(e) {
      let url = e.target.files[0];
      this.configs.favicon.image = url;
      this.srcFavicon = URL.createObjectURL(url);
    },
    deleteLogo() {
      this.configs.logo.image = null;
    },
    deleteFavicon() {
      this.configs.favicon.image = null;
    },
    editField(field) {
      this.edit[field] = !this.edit[field];
    },
    formData(field) {
      let formData = new FormData();
      formData.append("mode", field);
      formData.append("value", 1);
      formData.append("image", this.configs[field].image);
      if (typeof this.configs[field].image === "string") {
        formData.append("image", "");
      }
      formData.append("_method", "PUT");
      return formData;
    },
    updateField(field) {
      this.$vs.loading({
        color: "#1E6DB5",
        text: "Loading..."
      });
      let objParam = field == "logo" || field == "favicon" ? this.formData(field) : { mode: field, value: this.configs[field].value, _method: "PUT" };
      let headersParam = field == "logo" || field == "favicon" ? { headers: { "Content-Type": "multipart/form-data" } } : null;
      this.$http
        .post("system_configuration", objParam, headersParam)
        .then(() => {
          this.$vs.notify({
            title: "Chỉnh sửa hành công",
            text: "OK",
            iconPack: "feather",
            icon: "fa fa-lg fa-check-circle",
            color: "success"
          });
          this.edit[field] = false;
          let checkField = e => {
            switch(e){
            case 'logo':
              return this.srcLogo;
            case "favicon":
              return this.srcFavicon;
            default: 
              return objParam.value;
            }
          };
          field == "name" ? document.title = checkField(field) : false;
          this.$store.dispatch('changeConfigsField', {
            field: field,
            input: checkField(field)
          });
        })
        .catch(error => {
          this.getData();
          this.checkResponRequest(error.response.data);
        })
        .finally(() => {
          this.edit[field] = false;
          this.$vs.loading.close();
        });
    },
    getData() {
      this.$vs.loading({
        color: "#1E6DB5",
        text: "Loading..."
      });
      this.$http
        .get("system_configuration")
        .then(res => {
          this.configs = this.getObjectInfo(res.data.data);
        })
        .catch(error => {
          this.checkResponRequest(error.response.data);
        })
        .finally(() => {
          this.$vs.loading.close();
        });
    }
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

    &:hover{
      .vs-upload--button-upload{
        transform: translateY(-6px);
        box-shadow: 0 5px 10px rgba(0,0,0,.3);
      }
    }
    .vs-upload--button-upload{
      padding-bottom: 10px;
      padding-top: 10px;
      background: #28c76f;
      color: #fff;
      width: 45px;
      height: 45px;
      border-radius: 50%;
      padding: 0;
      margin-bottom: 5px;

    }

    img {
      // max-width: none;
      // max-height: 100%;

      //settings
      width: 70%;
      height: auto;
      max-height: none !important;
      max-width: none !important;
    }

    .material-icons {
      width: 26px;
      height: 26px;
      line-height: 26px;
      padding-right: 0px !important;
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

.min-w-200 {
  min-width: 100px;
}
.btn--no-hover {
  width: 25px;
  height: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.align-center {
  align-items: center;
}
.flex-direction-colum {
  flex-direction: column;
}
</style>

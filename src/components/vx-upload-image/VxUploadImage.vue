<template>
<div class="vs-component vs-con-input-label vs-input mt-5 w-full vs-input-primary d-block" @click="$emit('click')">
    <label class="vs-input--label" :style="styleText">{{ text }}</label>
    <div class="con-upload custom-upload-image" v-show="vModelShow">
        <div class="con-img-upload">
            <div class="upload-logo">
                <div class="img-upload m-0">
                    <button class="btn-x-file">
                        <i translate="translate" @click.prevent="deleteAvatar" class="material-icons notranslate">clear</i>
                    </button>
                    <img :src="typeof vModelShow == 'object' ? srcImage : vModelShow" ref="logo" class="img--upload mr-0 ml-0" />
                    <slot/>
                </div>
            </div>
        </div>
    </div>
    <div class="w-full d-inline-block">
        <div class="con-input-upload" v-show="!vModelShow">
            <input type="file" @change="changeAvatar($event)" accept="image/*" ref="file" />
            <span class="text-input">Upload Image</span>
            <span class="input-progress" style="width: 0%;"></span>
        </div>
    </div>
</div>
</template>
<script>
export default {
  props: ["vModelShow", "srcImage", "text", "styleText"],
  data() {
    return {
      isVModelShow: this.vModelShow,
      isSrcImage: this.srcImage
    };
  },
  methods: {
    deleteAvatar() {
      this.isVModelShow = null;
      this.$emit('update:show', this.isVModelShow);
    },
    changeAvatar(e) {
      let url = e.target.files[0];
      
      // change v-model-show
      this.isVModelShow = url;
      this.$emit('update:show', this.isVModelShow);

      // change src-image
      this.isSrcImage = URL.createObjectURL(url);
      this.$emit('update:src', this.isSrcImage);
    }
  }
};
</script>

<style lang="scss" scoped>

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
      max-width: 100%;
      max-height: 100%;
    }

    .material-icons {
      width: 26px;
      height: 26px;
      line-height: 26px;
      padding-right: 0px !important;
    }
  }
}
</style>

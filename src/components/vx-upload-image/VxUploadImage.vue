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
    img {
      max-width: none;
      max-height: 100%;
    }
  }
}
</style>

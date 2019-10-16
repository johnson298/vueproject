<template>
<vx-card class="h-100 ml-5 custom-w">
    <vs-row>
        <vs-col vs-w="12" class="p-0">
            <vs-row class="p-0">
                <vs-col vs-w="7" class="p-0">
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
                <vs-col vs-w="5">
                    <div class="vx-card__title mb-3">
                        <h4 class="text-dark">Đổi logo</h4>
                    </div>
                    <div class="vx-row mb-6">
                        <div class="vx-col w-full">
                            <vs-upload class="custom-upload-image" action="https://jsonplaceholder.typicode.com/posts/" @on-success="successUpload" />
                        </div>
                    </div>
                    <div class="vx-card__title mb-3">
                        <h4 class="text-dark">Đổi favicon</h4>
                    </div>
                    <div class="vx-row mb-6">
                        <div class="vx-col w-full">
                            <vs-upload class="custom-upload-image" action="https://jsonplaceholder.typicode.com/posts/" @on-success="successUpload" />
                        </div>
                    </div>
                </vs-col>
            </vs-row>
            <vs-row vs-type="flex" vs-justify="space-between">
                <vs-col>
                    <button id="update-loading" class="vs-component vs-button vs-button-primary vs-button-filled" ref="addButton" @click="updateStudent(student)">Lưu thay đổi</button>
                </vs-col>
            </vs-row>
        </vs-col>
    </vs-row>
</vx-card>
</template>

<script>
export default {
  methods: {
    successUpload() {
      this.$vs.notify({
        color: 'success',
        title: 'Upload',
        text: 'Upload thành công'
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.custom-w{
    width: 96.5%;
}
</style>

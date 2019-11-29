<template>
<vue-card class="mx-6 px-6 pb-6">
    <div slot="card-body">
        <div class="pr-6">
            <h5>Chọn quyền người dùng:</h5>
            <vs-select v-model="role" class="mt-5 w-full">
                <vs-select-item :key="key" :value="item" :text="item" v-for="(item, key) in permissions" />
            </vs-select>
            <div class="box-permission mt-4">
                <h6 class="my-3">Nhân viên</h6>
                <vs-row>
                    <vs-col vs-w="6" v-for="(item, key) in dataRole.permission" :key="key" class="mb-3">
                        <vs-checkbox v-model="checkBox1">{{ item.display_name }}</vs-checkbox>
                    </vs-col>
                </vs-row>
            </div>
        </div>
    </div>
</vue-card>
</template>

<script>
export default {
  data() {
    return {
      checkBox1: '',
      role: "teacher",
      dataRole: null,
      permissions: ['ss']
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getRoleGroup(){

    },
    getData() {
      const thisIns = this;
      thisIns.$vs.loading({
        color: '#1E6DB5',
        text: 'Loading...'
      });
      this.$http.get(`roles/1`).then(function (response) {
        thisIns.dataRole = response.data.data;
      })
        .catch(function (error) {
          thisIns.$vs.notify({
            title: 'Error',
            text: error,
            color: 'danger',
            iconPack: 'feather',
            icon: 'icon-alert-circle'
          });
        }).finally(function () {
          thisIns.$vs.loading.close();
        });
    },
  },
};
</script>

<style lang="scss" scoped></style>

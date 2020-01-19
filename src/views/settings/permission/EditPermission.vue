<template>
<div>
    <h5 class="text-center">
        <strong>Tên quyền: </strong> <span>{{ role.name === "consultant" ? 'marketing' : role.name }}</span>
    </h5>
    <vs-row class="mt-2" v-for="(name, index) in Object.keys(grouObject(permission))" :key="index">
        <vs-col vs-w="12">
          <h5 class="mb-2">{{ translateRoles(name) }}</h5>
        </vs-col>
        <vs-col vs-w="3" v-for="(role, key) in grouObject(permission)[name]" :key="key" class="mb-3">
            <div class="vs-component con-vs-checkbox vs-checkbox-primary vs-checkbox-default">
                <input type="checkbox" class="vs-checkbox--input" value="true" :checked="checkRoleActive(role.id)" :data-id="role.id" @change="changePermission">
                <span class="checkbox_x vs-checkbox" style="border: 2px solid rgb(180, 180, 180);">
                    <span class="vs-checkbox--check">
                        <i class="vs-icon notranslate icon-scale vs-checkbox--icon  material-icons null">check</i>
                    </span>
                </span>
                <span class="con-slot-label">{{ role.display_name }}</span>
            </div>
        </vs-col>
    </vs-row>
    <vs-col class="action-footer p-6 " vs-w='12' vs-type="flex" vs-justify="flex-end">
        <vs-button class="mr-2" color="primary" @click="checkAll">Chọn tất cả</vs-button>
        <!--<vs-button class="mr-2" color="warning" @click="resetPermission">Reset mặc định</vs-button>-->
        <vs-button class="ml-3 vs-con-loading__container" type="filled" color="success" @click="updatePermission()" ref="addButton" id="button-with-loading">Cập nhật</vs-button>
        <vs-button class="ml-3" type="filled" color="danger" @click="$emit('update:active',false)">Hủy</vs-button>
    </vs-col>
</div>
</template>

<script>
export default {
  props: ['callback', 'permission', 'rolePermission', 'role', 'idRole'],
  computed: {
    rolePermissionData: {
      get(){
        return this.rolePermission;
      },
      set(val){
        this.$emit('update:rolePermissionComit', val);
      }
    }
  },
  methods: {
    checkAll(){
      this.rolePermissionData = [].concat([...Array(76).keys()].slice(1));
    },
    resetPermission(){
      let roleDefault = {
        'student': [].concat([...Array(76).keys()].slice(1)),
        'teacher': [].concat([...Array(76).keys()].slice(1)),
        'accountant': [].concat([...Array(76).keys()].slice(1)),
        'manager': [].concat([...Array(76).keys()].slice(1)),
        'consultant': [].concat([...Array(76).keys()].slice(1)),
        'admin': [].concat([...Array(76).keys()].slice(1))
      };
      this.rolePermissionData = roleDefault[this.role.name];
    },
    checkRoleActive(role) {
      let roles = this.rolePermission;
      return roles.includes(role);
    },
    changePermission(event) {
      let idItem = parseInt(event.target.getAttribute("data-id"));
      let vm = this;
      let permission = vm.rolePermission;
      if (permission.includes(idItem)) {
        var index = permission.indexOf(idItem);
        if (index != -1) {
          permission.splice(index, 1);
        }
      } else {
        permission.push(idItem);
      }
    },
    updatePermission() {

      const thisIns = this;
      thisIns.$vs.loading({
        background: '#1E6DB5',
        color: '#fff',
        container: '#button-with-loading',
        scale: 0.45
      });
      this.$http.put(`roles/${thisIns.idRole}`, {
        name: thisIns.role.name,
        display_name: thisIns.role.display_name,
        guard_name: thisIns.role.guard_name,
        permission: thisIns.rolePermission.join(',')
      })
        .then(() => {
          thisIns.$vs.notify({
            title: 'Sửa quyền thành công',
            text: 'OK',
            iconPack: 'feather',
            icon: 'fa fa-lg fa-check-circle',
            color: 'success'
          });
          thisIns.$emit('closePopup', false);
        })
        .catch((error) => {
          thisIns.checkResponRequest(error.response.data, null, null, 'Sửa thất bại');
        }).finally(() => {
          thisIns.$vs.loading.close('#button-with-loading > .con-vs-loading');
        });
    },
    grouObject(array){
      const groups = array.reduce((groups, item) => ({
        ...groups,
        [item.group]: [...(groups[item.group] || []), item]
      }), {});
      return groups;
    }
  }
};
</script>

<style lang="scss" scoped>
.table-border {
    .vs-table--tbody {
        border: none;

        table {
            th {
                border: 1px solid #ccc;
            }

            td {
                border: 1px solid #ccc;
            }
        }
    }
}

.d-flex {
    display: flex;
}

.d-block {
    display: block
}

.pl-0 {
    padding-left: 0;
}

.border {
    border: 1px solid #ccc;
}

.vdp-datepicker.picker-custom input {
    width: 100% !important;
}

.action-footer {
    position: sticky;
    bottom: 8px;
    z-index: 990;
    background: #fff;
    transform: translateY(25px);
}
</style>

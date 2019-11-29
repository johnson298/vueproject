<template>
    <div class="px-6">
        <div class="flex items-center mt-6 cursor-pointer">
            <router-link tag="a" to="/settings" class="page-config-item flex items-center mb-2">
                <font-awesome-icon icon="cog" class="icon" />
                <span class="text-lg ml-3">Cài đặt hệ thống</span>
            </router-link>
        </div>

        <div class="flex items-center mt-6 cursor-pointer">
            <router-link tag="a" to="/settings/branches" class="page-config-item flex items-center mb-2">
                <font-awesome-icon icon="code-branch" class="icon" />
                <span class="text-lg ml-3">Chi nhánh</span>
            </router-link>
        </div>

        <div class="flex items-center mt-6 cursor-pointer">
            <router-link tag="a" to="/settings/coupons" class="page-config-item flex items-center mb-2">
                <font-awesome-icon icon="dollar-sign" class="icon" />
                <span class="text-lg ml-3">Khuyến mại</span>
            </router-link>
        </div>

        <div class="flex items-center mt-6 cursor-pointer">
            <router-link tag="a" to="/settings/permission" class="page-config-item flex items-center mb-2">
                <font-awesome-icon icon="users-cog" class="icon" />
                <span class="text-lg ml-3">Phân quyền</span>
            </router-link>
        </div>
    </div>
</template>

<style lang="scss" scoped>  
.icon {
    font-size: 18px;
    margin-left: 3px;
}
.page-config-item.router-link-exact-active.router-link-active {
    color: #1E6DB5 !important;
}

.page-config-item {
    color: #626262 !important;
}

.app-fixed-height {
    height: calc(100vh - 9.1rem);
}
</style>

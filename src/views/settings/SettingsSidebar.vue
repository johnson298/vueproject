<template>
<div class="email__email-sidebar h-full pt-6">
        <div class="px-6 pb-2 flex flex-col">

            <div class="flex justify-between items-center cursor-pointer">
                <router-link tag="a" to="/settings" class="page-config-item flex items-center mb-2">
                    <feather-icon icon="SettingsIcon"></feather-icon>
                    <span class="text-lg ml-3">Cài đặt hệ thống</span>
                </router-link>
            </div>

            <div class="flex items-center mt-4 mb-2 cursor-pointer">
                <router-link tag="a" to="/settings/branchs" class="page-config-item flex items-center mb-2">
                    <feather-icon icon="GitPullRequestIcon"></feather-icon>
                    <span class="text-lg ml-3">Cài đặt chi nhánh</span>
                </router-link>
            </div>
        </div>
</div>
</template>

<script>
export default {

};
</script>

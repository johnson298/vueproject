<template>
<div class="todo__filters-container">
    <div class="px-6 py-4">
        <div class="flex cursor-pointer">
            <router-link tag="a" to="/settings" class="page-config-item text-dark">
                <feather-icon icon="SettingsIcon"></feather-icon>
                <span class="text-lg ml-3">Cài đặt hệ thống</span>
            </router-link>
        </div>
    </div>
    <vs-divider></vs-divider>
    <div class="px-6 py-4">
        <div class="flex cursor-pointer">
            <router-link tag="a" to="/settings/branchs" class="page-config-item text-dark">
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

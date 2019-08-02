<template>
  <div class="email__email-sidebar h-full pt-6">
    <div class="px-6">

      <div class="flex items-center mt-6 cursor-pointer">
        <router-link tag="a" to="/settings" class="page-config-item flex items-center mb-2">
          <feather-icon icon="SettingsIcon"></feather-icon>
          <span class="text-lg ml-3">Cài đặt hệ thống</span>
        </router-link>
      </div>

      <div class="flex items-center mt-6 cursor-pointer">
        <router-link tag="a" to="/settings/branches" class="page-config-item flex items-center mb-2">
          <feather-icon icon="GitPullRequestIcon"></feather-icon>
          <span class="text-lg ml-3">Chi nhánh</span>
        </router-link>
      </div>

      <div class="flex items-center mt-6 cursor-pointer">
        <router-link tag="a" to="/settings/coupons" class="page-config-item flex items-center mb-2">
          <feather-icon icon="DollarSignIcon"></feather-icon>
          <span class="text-lg ml-3">Khuyến mại</span>
        </router-link>
      </div>
    </div>
  </div>
</template>

<template>
    <div class="vx-col w-full lg:w-1/2 mb-base h-100">
        <vx-card-custom slot="no-body" class="text-center bg-primary-gradient greet-user">
            <img src="@/assets/images/elements/decore-left.png" class="decore-left" alt="Decore Left" width="200" >
            <img src="@/assets/images/elements/decore-right.png" class="decore-right" alt="Decore Right" width="175">
            <feather-icon icon="AwardIcon" class="p-6 mb-8 bg-primary inline-flex rounded-full text-white shadow" svgClasses="h-8 w-8"></feather-icon>
            <h1 class="mb-6 text-white">Xin chào {{ hello_user }}</h1>
            <p class="xl:w-3/4 lg:w-4/5 md:w-2/3 w-4/5 mx-auto text-white">
            Phần mềm quản lý trung tâm 
            <strong>{{ $store.state.configuration ? $store.state.configuration.name.value : '' }}</strong>
            </p>
        </vx-card-custom>
    </div>
</template>
<script>
export default {
  computed: {
    hello_user() {
      return JSON.parse(localStorage.getItem('user')).name || 'Guest';
    },
  },
};
</script>

<template>
  <div class="vx-row">
    <!-- list -->
    <div class="vx-col w-full lg:w-1/4 mb-base">
      <router-link tag="a" to="/reports/employee">
        <vue-card
          title="Nhân viên"
          title-color="#fff"
          class="py-16 text-center background-cover"
          :card-background="'linear-gradient(120deg, #1e6db57a, #1e6db554), url(/img/user-07.c63e602a.jpg), url(' + require('@/assets/images/profile/user-uploads/user-07.jpg') + ')'"
        ></vue-card>
      </router-link>
    </div>
    <div class="vx-col w-full lg:w-1/4 mb-base">
      <router-link tag="a" to="/reports/student">
        <vue-card
          title="Học viên"
          title-color="#fff"
          class="py-16 text-center background-cover"
          :card-background="'linear-gradient(rgba(239, 195, 22, 0.44), rgba(241, 196, 15, 0.58)), url(' + require('@/assets/images/profile/user-uploads/user-11.jpg') + ')'"
        ></vue-card>
      </router-link>
    </div>

    <div class="vx-col w-full lg:w-1/4 mb-base">
      <router-link tag="a" to="/reports/course">
        <vue-card
          title="Lớp học"
          title-color="#fff"
          class="py-16 text-center background-cover"
          :card-background="'linear-gradient(120deg, rgba(231, 76, 60, 0.35), rgba(231, 76, 60, 0.75)), url(' + require('@/assets/images/pages/content-img-1.jpg') + ')'"
        ></vue-card>
      </router-link>
    </div>
    <div class="vx-col w-full lg:w-1/4 mb-base">
      <router-link tag="a" to="/reports/money">
        <vue-card
          title="Thu chi"
          title-color="#fff"
          class="py-16 text-center background-cover"
          :card-background="'linear-gradient(120deg, rgba(46, 204, 113, 0.42), rgba(46, 204, 113, 0.8)), url(/img/user-07.c63e602a.jpg), url(' + require('@/assets/images/pages/content-img-2.jpg') + ')'"
        ></vue-card>
      </router-link>
    </div>
    <!-- time line-->
    <div class="vx-col w-full lg:w-3/3 mb-base">
      <vx-card>
        <ul class="activity-timeline">
          <li>
            <div class="timeline-icon bg-primary">
              <feather-icon icon="PlusIcon" svgClasses="text-white stroke-current w-5 h-5"></feather-icon>
            </div>
            <div class="timeline-info">
              <p class="font-semibold">Nhân viên</p>
              <span class="activity-desc">Nhân viên được thêm mới, đã nghỉ và đang hoạt động</span>
            </div>
            <small class="text-grey activity-e-time">Cập nhật lúc 01/10/2019</small>
          </li>
          <li>
            <div class="timeline-icon bg-warning">
              <feather-icon icon="PlusIcon" svgClasses="text-white stroke-current w-5 h-5"></feather-icon>
            </div>
            <div class="timeline-info">
              <p class="font-semibold">Học viên</p>
              <span class="activity-desc">Học viên được thêm mới, đã hoàn thành thanh toán, còn nợ</span>
            </div>
          </li>
          <li>
            <div class="timeline-icon bg-danger">
              <feather-icon icon="CheckIcon" svgClasses="text-white stroke-current w-5 h-5"></feather-icon>
            </div>
            <div class="timeline-info">
              <p class="font-semibold">Lớp học</p>
              <span class="activity-desc">Lớp học được thêm mới, đã hoàn thành và hủy</span>
            </div>
            <small class="text-grey activity-e-time">Cập nhật lúc 01/10/2019</small>
          </li>
          <li>
            <div class="timeline-icon bg-success">
              <feather-icon icon="CheckIcon" svgClasses="text-white stroke-current w-5 h-5"></feather-icon>
            </div>
            <div class="timeline-info">
              <p class="font-semibold">Thu chi</p>
              <span class="activity-desc">Chi phí thu được, thu được theo các chi nhánh</span>
            </div>
            <small class="text-grey activity-e-time">Cập nhật lúc 01/10/2019</small>
          </li>
        </ul>
      </vx-card>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.vue-card__title {
  width: 100%;
}
</style>

<template>
  <div>
    <vue-card>
      <div slot="title">
        <h4>THÔNG SỐ</h4>
      </div>
      <div class="table-custom p-5" slot="card-body">
        <vs-table :data="users">
          <template slot="thead">
            <vs-th bgcolor="#dfe2e5">THỜI GIAN</vs-th>
            <vs-th bgcolor="#dfe2e5" colspan="2">GIÁO VIÊN</vs-th>
            <vs-th bgcolor="#dfe2e5" colspan="2">HỌC VIÊN</vs-th>
            <vs-th bgcolor="#dfe2e5" colspan="3">LỚP</vs-th>
            <vs-th bgcolor="#dfe2e5" colspan="2">TÀI CHÍNH</vs-th>
            <vs-th bgcolor="#dfe2e5" colspan="3">KHÁCH HÀNG</vs-th>
            <vs-th bgcolor="#dfe2e5" colspan="2">CHIẾN DỊCH</vs-th>
          </template>

          <template>
            <vs-tr>
              <!-- thời gian -->
              <vs-td>Từ - Đến</vs-td>
              <!-- Giáo viên -->
              <vs-td class="bg-success text-white">Hoạt động</vs-td>
              <vs-td class="bg-danger text-white">Hủy</vs-td>
              <!-- Học viên -->
              <vs-td class="bg-success text-white">Thêm mới</vs-td>
              <vs-td class="bg-warning text-white">Bảo lưu</vs-td>
              <!-- lớp -->
              <vs-td class="bg-success text-white">Hoàn thành</vs-td>
              <vs-td class="bg-warning text-white">Mới</vs-td>
              <vs-td class="bg-danger text-white">Hủy</vs-td>
              <!-- tài chính -->
              <vs-td>Doanh thu</vs-td>
              <vs-td>Chi tiêu</vs-td>
              <!-- khách hàng -->
              <vs-td class="bg-warning text-white">Thêm mới</vs-td>
              <vs-td class="bg-success text-white">Thành công</vs-td>
              <vs-td class="bg-danger text-white">Hủy</vs-td>
              <!-- chiến dịch -->
              <vs-td>Thông báo</vs-td>
              <vs-td>Đánh giá</vs-td>
            </vs-tr>
            <vs-tr>
              <!-- thời gian -->
              <vs-td>
                <flat-pickr v-model="fromDate" placeholder="Từ ngày" />
                <flat-pickr v-model="toDate" placeholder="Từ ngày" class="mt-2" />
              </vs-td>
              <!-- Giáo viên -->
              <vs-td>10</vs-td>
              <vs-td>3</vs-td>
              <!-- Học viên -->
              <vs-td>34</vs-td>
              <vs-td>55</vs-td>
              <!-- lớp -->
              <vs-td>66</vs-td>
              <vs-td>65</vs-td>
              <vs-td>65</vs-td>
              <!-- tài chính -->
              <vs-td>56</vs-td>
              <vs-td>65</vs-td>
              <!-- khách hàng -->
              <vs-td>77</vs-td>
              <vs-td>0</vs-td>
              <vs-td>0</vs-td>
              <!-- chiến dịch -->
              <vs-td>0</vs-td>
              <vs-td>0</vs-td>
            </vs-tr>
          </template>
        </vs-table>
      </div>
    </vue-card>
    <vue-card class="mt-5">
      <div slot="title">
        <h4>KPI</h4>
      </div>
      <div class="table-custom p-5" slot="card-body">
        <vs-table :data="users">
          <template slot="thead">
            <vs-th bgcolor="#dfe2e5">TÊN NHÂN VIÊN</vs-th>
            <vs-th bgcolor="#dfe2e5" colspan="4">KHÁCH HÀNG</vs-th>
          </template>

          <template>
            <vs-tr>
              <!-- tên nhân viên -->
              <vs-td>Nguyễn Văn A (NV-001)</vs-td>
              <!-- Giáo viên -->
              <vs-td class="bg-warning text-white">Chờ chăm sóc</vs-td>
              <vs-td class="bg-primary text-white">Đang chăm sóc</vs-td>
              <vs-td class="bg-success text-white">Thành công</vs-td>
              <vs-td class="bg-danger text-white">Hủy tư vấn</vs-td>
            </vs-tr>
            <vs-tr>
              <!-- tên nhân viên -->
              <vs-td>Thông số</vs-td>
              <!-- Giáo viên -->
              <vs-td>55</vs-td>
              <vs-td>1</vs-td>
              <vs-td>0</vs-td>
              <vs-td>0</vs-td>
            </vs-tr>
          </template>
        </vs-table>
      </div>
    </vue-card>
  </div>
</template>

<script>
import flatPickr from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";
export default {
  components: {
    flatPickr
  },
  data() {
    return {
      fromDate: null,
      toDate: null,
      users: [
        {
          id: 8,
          name: "Nicholas Runolfsdottir V",
          username: "Maxime_Nienow",
          email: "Sherwood@rosamond.me",
          website: "jacynthe.com"
        }
      ]
    };
  }
};
</script>
<style lang="scss" scoped>
.flatpickr-input[readonly] {
  cursor: pointer;
}

.flatpickr-input {
  padding: 0.7rem;
  font-size: 1rem;
  border-radius: 5px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  color: #626262;
}
.h-100 {
  height: 100%;
  .vx-card {
    height: 100%;
  }
}
</style>
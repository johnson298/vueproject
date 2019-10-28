<template>
  <div class="vx-card">
    <div class="vx-card__header">
      <div class="vx-card__title">
        <h4 class>Nhân viên thêm mới gần nhất</h4>
      </div>
    </div>
    <div class="vx-card__collapsible-content vs-con-loading__container">
      <div class="vx-card__body">
        <vs-table class="my-5" stripe :data="usersLatest">
          <template style="padding-left: 10px" slot="thead">
            <vs-th>ẢNH</vs-th>
            <vs-th>TÊN NHÂN VIÊN</vs-th>
            <vs-th>SĐT</vs-th>
            <vs-th>CHỨC VỤ</vs-th>
            <vs-th>ĐỊA CHỈ</vs-th>
            <vs-th>NGÀY TẠO</vs-th>
          </template>

          <template slot-scope="{data}">
            <vs-tr :key="indextr" v-for="(tr, indextr) in data">
              <vs-td>
                <vs-avatar size="55px" :src="tr.avatar" :alt="tr.name" />
              </vs-td>
              <vs-td>{{ tr.name}}</vs-td>
              <vs-td>{{ tr.phone}}</vs-td>
              <vs-td>
                <p class="product-name font-medium">
                  <vs-chip
                    :color="checkStatus(positions,tr.position)=='Giáo viên' ? 'danger'
                      : checkStatus(positions,tr.position)=='Tư vấn' ? 'warning'
                      : checkStatus(positions,tr.position)=='Kế toán' ? 'primary'
                      : checkStatus(positions,tr.position)=='Quản lý' ? 'success'
                      : ''"
                  >{{ checkStatus(positions,tr.position) }}</vs-chip>
                </p>
              </vs-td>
              <vs-td>{{ tr.address}}</vs-td>
              <vs-td>{{ tr.birthday}}</vs-td>
            </vs-tr>
          </template>
        </vs-table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    usersLatest: {
      required: false,
      default: null
    }
  },
  computed: {
    positions() {
      return this.$store.state.model.employees.positions;
    }
  }
};
</script>

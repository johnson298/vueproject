<template>
  <vue-card title="Học viên thêm mới gần nhất">
    <div slot="card-body">
      <vs-table class="my-5 px-5" stripe :data="studentsLatest">
        <template style="padding-left: 10px" slot="thead">
          <vs-th>ẢNH</vs-th>
          <vs-th>TÊN HỌC VIÊN</vs-th>
          <vs-th>SĐT</vs-th>
          <vs-th>NGUỒN</vs-th>
          <vs-th>ĐỊA CHỈ</vs-th>
          <vs-th>NGÀY TẠO</vs-th>
        </template>

        <template slot-scope="{data}">
          <vs-tr :key="indextr" v-for="(tr, indextr) in data">
            <vs-td :data="tr.avatar">
              <vs-avatar size="55px" :src="tr.avatar" :alt="tr.name" />
            </vs-td>
            <vs-td>{{ tr.name}}</vs-td>
            <vs-td>{{ tr.phone}}</vs-td>
            <vs-td>
              <p class="product-category">
                <vs-chip
                  :color="checkStatus(sourceStudent,tr.source)=='Facebook' ? 'primary' 
                      : checkStatus(sourceStudent,tr.source)=='Bạn bè' ? 'warning'
                      : checkStatus(sourceStudent,tr.source)=='Trang chủ' ? 'success'
                      : ''"
                >{{ checkStatus(sourceStudent,tr.source) }}</vs-chip>
              </p>
            </vs-td>
            <vs-td>{{ tr.address}}</vs-td>
            <vs-td>{{ tr.birthday}}</vs-td>
          </vs-tr>
        </template>
      </vs-table>
    </div>
  </vue-card>
</template>

<script>
export default {
  props: {
    studentsLatest: {
      required: false,
      default: null
    }
  },
  computed: {
    sourceStudent() {
      return this.$store.state.model.students.source;
    }
  }
};
</script>

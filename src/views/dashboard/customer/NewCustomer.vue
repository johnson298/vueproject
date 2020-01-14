<template>
  <vue-card title="Khách hàng thêm mới gần nhất">
    <div slot="card-body">
      <vs-table class="my-5 px-5" stripe :data="customersLatest">
        <template style="padding-left: 10px" slot="thead">
          <vs-th>ẢNH</vs-th>
          <vs-th>TÊN KHÁCH HÀNG</vs-th>
          <vs-th>SĐT</vs-th>
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
    customersLatest: {
      required: false,
      default: null
    }
  }
};
</script>

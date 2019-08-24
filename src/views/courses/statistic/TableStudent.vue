<template>
    <vx-card title="Học viên xuất sắc">
        <vs-table class="my-5" stripe :data="users">

            <template style="padding-left: 10px" slot="thead">
                <vs-th> Email</vs-th>
                <vs-th>Name</vs-th>
                <vs-th>Điểm thi</vs-th>
                <vs-th>Xếp hạng</vs-th>
            </template>

            <template slot-scope="{data}">
                <vs-tr :key="indextr" v-for="(tr, indextr) in data">
                    <vs-td :data="data[indextr].email">
                        {{data[indextr].email}}
                    </vs-td>
                    <vs-td :data="data[indextr].username">
                        {{data[indextr].name}}
                    </vs-td>
                    <vs-td :data="data[indextr].id">
                        {{data[indextr].diem_thi}}
                    </vs-td>
                    <vs-td :data="data[indextr].id">
                        {{data[indextr].id}}
                    </vs-td>
                </vs-tr>
            </template>
        </vs-table>
    </vx-card>
</template>

<script>
export default {
  data() {
    return {
      users: [
        {
          "id": 1,
          "name": "Leanne Graham",
          "username": "Bret",
          "email": "Sincere@april.biz",
          "diem_thi": "7",
        },
        {
          "id": 2,
          "name": "Ervin Howell",
          "username": "Antonette",
          "email": "Shanna@melissa.tv",
          "diem_thi": "8",
        },
        {
          "id": 3,
          "name": "Clementine Bauch",
          "username": "Samantha",
          "email": "Nathan@yesenia.net",
          "diem_thi": "9",
        },
        {
          "id": 4,
          "name": "Patricia Lebsack",
          "username": "Karianne",
          "email": "Julianne.OConner@kory.org",
          "diem_thi": "10",
        },
        {
          "id": 5,
          "name": "Chelsey Dietrich",
          "username": "Kamren",
          "email": "Lucio_Hettinger@annie.ca",
          "diem_thi": "8",
        },
      ]
    };
  },
};
</script>

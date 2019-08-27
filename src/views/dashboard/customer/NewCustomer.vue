<template>
    <vx-card title="Khách hàng thêm mới">
        <vs-table class="my-5" stripe :data="users">

            <template style="padding-left: 10px" slot="thead">
                <vs-th>Avatar</vs-th>
                <vs-th> Email</vs-th>
                <vs-th>Name</vs-th>
                <vs-th>Ngày tạo</vs-th>
            </template>

            <template slot-scope="{data}">
                <vs-tr :key="indextr" v-for="(tr, indextr) in data">
                    <vs-td :data="data[indextr].avatar">
                        <vs-avatar size="55px" :src="data[indextr].avatar" :alt="data[indextr].name" />
                    </vs-td>
                    <vs-td :data="data[indextr].email">
                        {{data[indextr].email}}
                    </vs-td>
                    <vs-td :data="data[indextr].username">
                        {{data[indextr].name}}
                    </vs-td>
                    <vs-td :data="data[indextr].id">
                        {{data[indextr].birthday}}
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
          "avatar": 'http://apiedu.itsvnweb.com/images/default.png',
          "name": "Leanne Graham",
          "username": "Bret",
          "email": "Sincere@april.biz",
          "birthday": "29/5/2019",
        },
        {
          "avatar": 'http://apiedu.itsvnweb.com/images/default.png',
          "name": "Ervin Howell",
          "username": "Antonette",
          "email": "Shanna@melissa.tv",
          "birthday": "29/5/2019",
        },
        {
          "avatar": 'http://apiedu.itsvnweb.com/images/default.png',
          "name": "Clementine Bauch",
          "username": "Samantha",
          "email": "Nathan@yesenia.net",
          "birthday": "29/5/2019",
        },
        {
          "avatar": 'http://apiedu.itsvnweb.com/images/default.png',
          "name": "Patricia Lebsack",
          "username": "Karianne",
          "email": "Julianne.OConner@kory.org",
          "birthday": "29/5/2019",
        },
        {
          "avatar": 'http://apiedu.itsvnweb.com/images/default.png',
          "name": "Chelsey Dietrich",
          "username": "Kamren",
          "email": "Lucio_Hettinger@annie.ca",
          "birthday": "29/5/2019",
        },
      ]
    };
  },
};
</script>

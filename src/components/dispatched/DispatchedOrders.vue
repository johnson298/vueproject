<template>
    <div class="vx-row">
        <!-- CARD 9: DISPATCHED ORDERS -->
        <div class="vx-col w-full">
            <vx-card title="Dispatched Orders">
                <div slot="no-body" class="mt-4">
                    <vs-table :data="users">
                        <template slot="thead">
                            <vs-th>ORDER NO.</vs-th>
                            <vs-th>STATUS</vs-th>
                            <vs-th>OPERATORS</vs-th>
                            <vs-th>LOCATION</vs-th>
                            <vs-th>DISTANCE</vs-th>
                            <vs-th>START DATE</vs-th>
                            <vs-th>EST DELIVERY DATE</vs-th>
                        </template>

                        <template slot-scope="{data}">
                            <vs-tr :key="indextr" v-for="(tr, indextr) in data">
                                <vs-td :data="data[indextr].orderNo">
                                    <span>#{{data[indextr].orderNo}}</span>
                                </vs-td>
                                <vs-td :data="data[indextr].status">
                                    <span class="flex items-center px-2 py-1 rounded"><div class="h-3 w-3 rounded-full mr-2" :class="'bg-' + data[indextr].statusColor"></div>{{data[indextr].status}}</span>
                                </vs-td>
                                <vs-td :data="data[indextr].orderNo">
                                    <ul class="users-liked user-list">
                                        <li v-for="(user, userIndex) in data[indextr].usersLiked" :key="userIndex">
                                            <vx-tooltip :text="user.name" position="bottom">
                                                <vs-avatar :src="require(`@/assets/images/portrait/small/${user.img}`)" size="30px" class="border-2 border-white border-solid -m-1"></vs-avatar>
                                            </vx-tooltip>
                                        </li>
                                    </ul>
                                </vs-td>
                                <vs-td :data="data[indextr].orderNo">
                                    <span>{{data[indextr].location}}</span>
                                </vs-td>
                                <vs-td :data="data[indextr].orderNo">
                                    <span>{{data[indextr].distance}}</span>
                                    <vs-progress :percent="data[indextr].distPercent" :color="data[indextr].statusColor"></vs-progress>
                                </vs-td>
                                <vs-td :data="data[indextr].orderNo">
                                    <span>{{data[indextr].startDate}}</span>
                                </vs-td>
                                <vs-td :data="data[indextr].orderNo">
                                    <span>{{data[indextr].estDelDate}}</span>
                                </vs-td>
                            </vs-tr>
                        </template>
                    </vs-table>
                </div>

            </vx-card>
        </div>
    </div>
</template>
<script>
export default {
  data() {
    return {
      users: [{
        "orderNo": 879985,
        "status": "Moving",
        "statusColor": "success",
        "operator": "Cinar Knowles",
        "operatorImg": "avatar-s-2.png",
        usersLiked: [
          { name: 'Vennie Mostowy', img: 'avatar-s-5.png' },
          { name: 'Elicia Rieske', img: 'avatar-s-7.png' },
          { name: 'Julee Rossignol', img: 'avatar-s-10.png' },
          { name: 'Darcey Nooner', img: 'avatar-s-8.png' }
        ],
        "location": "Anniston, Alabama",
        "distance": "130 km",
        "distPercent": 80,
        "startDate": "14:58 26/07/2018",
        "estDelDate": "28/07/2018"
      },
      {
        "orderNo": 156897,
        "status": "Pending",
        "statusColor": "warning",
        "operator": "Britany Ryder",
        "operatorImg": "avatar-s-4.png",
        usersLiked: [
          { name: 'Trina Lynes', img: 'avatar-s-1.png' },
          { name: 'Lilian Nenez', img: 'avatar-s-2.png' },
          { name: 'Alberto Glotzbach', img: 'avatar-s-3.png' }
        ],
        "location": "Cordova, Alaska",
        "distance": "234 km",
        "distPercent": 60,
        "startDate": "14:58 26/07/2018",
        "estDelDate": "28/07/2018"
      },
      {
        "orderNo": 568975,
        "status": "Moving",
        "statusColor": "success",
        "operator": "Kishan Ashton",
        "operatorImg": "avatar-s-1.png",
        usersLiked: [
          { name: 'Lai Lewandowski', img: 'avatar-s-6.png' },
          { name: 'Elicia Rieske', img: 'avatar-s-7.png' },
          { name: 'Darcey Nooner', img: 'avatar-s-8.png' },
          { name: 'Julee Rossignol', img: 'avatar-s-10.png' },
          { name: 'Jeffrey Gerondale', img: 'avatar-s-9.png' },
        ],
        "location": "Florence, Alabama",
        "distance": "168 km",
        "distPercent": 70,
        "startDate": "14:58 26/07/2018",
        "estDelDate": "28/07/2018"
      },
      {
        "orderNo": 245689,
        "status": "Canceled",
        "statusColor": "danger",
        "operator": "Anabella Elliott",
        "operatorImg": "avatar-s-6.png",
        usersLiked: [
          { name: 'Vennie Mostowy', img: 'avatar-s-5.png' },
          { name: 'Elicia Rieske', img: 'avatar-s-7.png' }
        ],
        "location": "Clifton, Arizona",
        "distance": "125 km",
        "distPercent": 95,
        "startDate": "14:58 26/07/2018",
        "estDelDate": "28/07/2018"
      }

      ]
    };
  },
};
</script>

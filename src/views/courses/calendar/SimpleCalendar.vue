<template>
<div id="simple-calendar-app">
    <div class="vx-card app-fixed-height">
        <calendar-view
          ref="calendar"
          :displayPeriodUom="calendarView"
          :show-date="showDate"
          :events="calendarStudy"
          enableDragDrop
          :eventTop="windowWidth <= 400 ? '2rem' : '3rem'"
          eventBorderHeight="0px" eventContentHeight="1.65rem" class="theme-default">

            <div slot="header" class="mb-4">

                <div class="vx-row no-gutter">
                    <div class="vx-col w-1/3 items-center sm:flex hidden">
                        <!-- Add new event button -->
                        <template>

                            <vs-button icon-pack="feather" icon="icon-plus" @click="addCalendar=true">Thêm lịch học</vs-button>
                            <vs-popup class="holamundo scrollbar-custom" title="Thêm lịch học" :active.sync="addCalendar">
                                <add-calendar :active.sync="addCalendar" :callback="getData" @closeAdd="addCalendar = $event" />
                            </vs-popup>
                        </template>
                    </div>
                    <!-- Current Month -->
                    <div class="vx-col sm:w-1/3 w-full sm:my-0 my-3 flex justify-end order-last">
                        <div class="flex items-center">
                            <feather-icon icon="ChevronLeftIcon" @click="updateMonth(-1)" class="cursor-pointer bg-primary text-white rounded-full" />
                            <span class="mx-3 text-xl font-medium whitespace-no-wrap">{{ showDate | month }}</span>
                            <feather-icon icon="ChevronRightIcon" @click="updateMonth(1)" class="cursor-pointer bg-primary text-white rounded-full" />
                        </div>
                    </div>

                    <div class="vx-col sm:w-1/3 w-full flex justify-center">
                        <vs-button class="rounded-r-none p-3 md:px-8 md:py-3" @click="calendarView = 'month'">Month</vs-button>
                        <vs-button class="rounded-r-none rounded-l-none p-3 md:px-8 md:py-3" @click="calendarView = 'week'">Week</vs-button>
                        <vs-button class="rounded-l-none p-3 md:px-8 md:py-3" @click="calendarView = 'year'">Year</vs-button>
                    </div>
                </div>

                <div class="vx-row sm:flex hidden mt-4">
                    <div class="vx-col w-full flex justify-end">
                        <!-- Labels -->
                        <div class="flex flex-wrap sm:justify-start justify-center">
                            <div v-for="(label, index) in calendarLabels" :key="index" class="flex items-center mr-4 mb-2">
                                <div class="h-3 w-3 inline-block rounded-full mr-2" :class="'bg-' + label.color"></div>
                                <span>{{ label.text }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </calendar-view>
    </div>
</div>
</template>

<script>
import {
  CalendarView,
  CalendarViewHeader
} from "vue-simple-calendar";
require("vue-simple-calendar/static/css/default.css");
import AddCalendar from './AddCalendar.vue';
import Datepicker from 'vuejs-datepicker';

export default {
  components: {
    CalendarView,
    CalendarViewHeader,
    Datepicker,
    AddCalendar
  },
  data() {
    return {
      showDate: new Date(),
      disabledFrom: false,
      id: 0,
      title: '',
      startDate: '',
      endDate: '',
      labelLocal: 'none',
      url: '',
      calendarView: 'month',
      activePromptAddEvent: false,
      activePromptEditEvent: false,
      addCalendar: false,
      calendarStudy: [],
      branch_id: this.$store.state.getBranchId,
      course_id: this.$route.params.course,
    };
  },
  computed: {
    calendarLabels() {
      return this.$store.state.calendar.calendarLabels;
    },
    windowWidth() {
      return this.$store.state.windowWidth;
    }
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      let vm = this;
      vm.calendarStudy = [];
      vm.$vs.loading({color: '#1E6DB5', text: 'Loading...'});
      this.$http.get(`branches/${this.branch_id}/courses/${this.course_id}/calendar`)
        .then(response => {
          const listData = response.data.data;
          let formatTime = (val) => {
            let a = val.split(':');
            a.pop();
            return a.join(':');
          };
          for (let key in listData) {
            vm.calendarStudy.push({
              title: `${listData[key].title} (${formatTime(listData[key].start_at)}-${formatTime(listData[key].end_at)})`,
              startDate: listData[key].date,
              endDate: listData[key].date,
              url: null,
              classes: 'event-success',
              label: 'business'
            });
          }
        }).finally(function () {
          vm.$vs.loading.close();
        });
    },
    updateMonth(val) {
      this.showDate = this.$refs.calendar.getIncrementedPeriod(val);
    },
  }
};
</script>

<style>
.con-vs-popup .vs-popup {
    width: 1000px !important;
}
</style><style lang="scss">
@import "@/assets/scss/vuesax/apps/simple-calendar.scss";
</style>

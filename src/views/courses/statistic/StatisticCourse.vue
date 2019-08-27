<template>
<div class="statistic-course">
    <vs-row>
        <vs-col vs-w='6' class="pl-0">
            <NumberOfPupils/>
        </vs-col>
        <vs-col vs-w='6' class="pl-0">
            <NumberOffDay/>
        </vs-col>
    </vs-row>

    <div class="mt-5">
       <vs-row>
           <vs-col vs-w='6' class="pl-0">
               <LearningProcess/>
           </vs-col>
           <vs-col vs-w='6' class="pl-0">
               <ClassificationStudent/>
           </vs-col>
       </vs-row>
    </div>
   <div class="mt-5">
       <vs-row class="mt-5">
           <vs-col vs-w='6' class="pl-0">
               <Gender/>
           </vs-col>
           <vs-col vs-w='6' class="pr-0">
               <RollCall/>
           </vs-col>
       </vs-row>
   </div>
    <div class="mt-5">
        <vs-row>
            <TableStudent/>
        </vs-row>
    </div>
</div>
</template>

<script>
import Gender from './Gender.vue';
import RollCall from './RollCall.vue';
import LearningProcess from './LearningProcess.vue';
import NumberOfPupils from './NumberOfPupils.vue';
import NumberOffDay from './NumberOffDay.vue';
import ClassificationStudent from  './ClassificationStudent.vue';
import TableStudent from './TableStudent.vue';

export default {
  components: {
    Gender,
    RollCall,
    LearningProcess,
    NumberOfPupils,
    NumberOffDay,
    ClassificationStudent,
    TableStudent
  }
};
</script>

<style lang="scss" scoped>
.chat-card-log {
    height: 400px;

    .chat-sent-msg {
        background-color: #f2f4f7 !important;
    }
}
</style>

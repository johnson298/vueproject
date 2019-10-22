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
           <vs-col vs-w='8' class="pl-0">
               <RollCall/>
           </vs-col>
           <vs-col vs-w='4' class="pl-0">
               <LearningProcess/>
           </vs-col>
       </vs-row>
    </div>
</div>
</template>

<script>
import RollCall from './RollCall.vue';
import LearningProcess from './LearningProcess.vue';
import NumberOfPupils from './NumberOfPupils.vue';
import NumberOffDay from './NumberOffDay.vue';

export default {
  components: {
    RollCall,
    LearningProcess,
    NumberOfPupils,
    NumberOffDay
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

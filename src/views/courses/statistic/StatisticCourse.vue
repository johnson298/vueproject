<template>
<div class="statistic-course">
    <vs-row>
        <vs-col vs-w='6' class="pl-0">
            <NumberOfPupils/>
        </vs-col>
        <vs-col vs-w='6' class="pr-0">
            <LearningProcess/>
        </vs-col>
    </vs-row>
    <vs-row class="mt-5">
        <vs-col vs-w='6' class="pl-0">
            <Gender/>
        </vs-col>
        <vs-col vs-w='6' class="pr-0">
            <RollCall/>
        </vs-col>
    </vs-row>
</div>
</template>

<script>
import Gender from './Gender.vue';
import RollCall from './RollCall.vue';
import LearningProcess from './LearningProcess.vue';
import NumberOfPupils from './NumberOfPupils.vue';

export default {
  components: {
    Gender,
    RollCall,
    LearningProcess,
    NumberOfPupils
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

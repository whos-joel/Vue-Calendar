<template>
    <div class="days-of-week">
        <div class="day" v-for="i in 7" :key="i">
            {{getDayName(i-1)}}
        </div>
    </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator'
import moment from 'moment'

@Component
export default class DaysOfWeek extends Vue{

    @Prop({default: 0})
    firstDayOfWeek!:number;

    getDayName(i:number){
        return moment().day(i + this.firstDayOfWeek).format("dd")
    }
}
</script>

<style lang="less">
     .days-of-week{
            display: flex;
            flex-wrap: wrap;
            min-height: 40px;
            > div{
                width: calc(100% / 7);
                padding: 2px;
                display: flex;
                justify-content: center;
                align-items: center;
            }
        }
</style>



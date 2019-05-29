<template>
    <div class="day-selector">
        <days-of-week v-if="daysOfWeekHeader" :first-day-of-week="firstDayOfWeek">
        </days-of-week>
        <div class="dates">
            <div class="date" v-for="date in dates" :key="date.id">
                <a href="#" v-if="date.isWithinRange"
                    :class="{'today' : date.isToday, 'selected': date.isSelected, 'greyed-out': !date.isInSelectedMonth}"
                    :data-date="date.ticks"
                    @click="setDate(date.value)">
                    {{date.value}}
                </a>
                <div v-if="!date.isWithinRange"
                     :class="{'greyed-out' : !date.isWithinRange}">
                        {{date.value}}
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit } from 'vue-property-decorator';
import moment from 'moment';
import DatePickerData from './DatePickerData';
import DaysOfWeek from './DaysOfWeek.vue';

@Component({
    components:{
        DaysOfWeek
    }
})
export default class DaySelector extends Vue {
    get monthYear() {
        return moment(new Date(this.selectedYear, this.selectedMonth)).format('MMM YYYY');
    }

    get dates() {
        // this.data = this.getDates(this.selectedYear, this.selectedMonth);
        return this.getDates(this.selectedYear, this.selectedMonth);
    }

    @Prop({default: new Date()})
    public value!: Date;

    @Prop({default: new Date().getMonth()})
    public selectedMonth!: number;

    @Prop({default: new Date().getFullYear()})
    public selectedYear!: number;

    @Prop({default: 1})
    public firstDayOfTheWeek!: number;

    @Prop({default: 0})
    firstDayOfWeek!:number;

    @Prop({default: false})
    daysOfWeekHeader!:boolean;

    @Prop()
    public min?: Date;

    @Prop()
    public max?: Date;

    public getDates(year: number, month: number): object[] {
        const data: object[] = [];
        for (let i = 0; i < 42; i++) {
            const id = i;
            data[i] = this.getData(id);
        }
        return data;
    }

    public getData(n: number) {     
        const date = this.getDate(n + 1 + this.firstDayOfWeek);
        const isToday = date.getTime() === new Date().setHours(0, 0, 0, 0);
        const selected = date.getTime() === this.value.getTime();
        const inSelectedMonth = date.getMonth() === this.selectedMonth;
        const isWithinRange = this.getWithinRange(+date);
        return new DatePickerData(n, date, isToday, selected, inSelectedMonth, isWithinRange);
    }

    public getDate(n: number) {
        const day = n - this.getFirstDayOfMonth(this.selectedYear, this.selectedMonth);
        return new Date(this.selectedYear, this.selectedMonth, day);
    }

    getWithinRange(date:number):boolean{
        if(this.min && this.max)
            return date >= +this.min && date <= +this.max;
        if(this.min)
            return date >= +this.min;
        if(this.max)
            return date <= +this.max;
        return true;
    }

    public getFirstDayOfMonth(year: number, month: number) {
        return new Date(year, month, 1).getDay();
    }

    getDayName(i:number){
        return moment().day(i).format("dd")
    }

    @Emit('nextMonth')
        public nextMonth() {
    }

    @Emit('previousMonth')
    public previousMonth() {

    }

    @Emit('input')
    public setDate(date: number) {
        console.info(date);
        return new Date(this.selectedYear, this.selectedMonth, date, 0, 0, 0, 0);
    }

    @Emit("view-change")
    setView(){
        return "month";
    }
}
</script>

<style lang="less">
    .day-selector{
        width: 100%;
        height: 100%;
        position: absolute;
        display: flex;
        flex-direction: column;
        justify-content: stretch;

        &.next{
            transform: translateX(100%);
        }

        &.previous{
            transform: translateX(-100%);
        }

        .dates, .days-of-the-week, .btn-container{
            display: flex;
            flex-wrap: wrap;
            min-height: 40px;
            > div{
                width: calc(100% / 7);
                padding: 2px;
                display: flex;
                justify-content: center;
                align-items: center;
                a{
                    border: 1px solid #ccc;
                    display: flex;
                    cursor: pointer;
                    text-decoration: none;
                    height: 100%;
                    line-height: 1;
                    align-items: center;
                    justify-content: center;
                    width: 100%;
                    &.today{
                        border-color: #0055aa;
                    }
                    &.selected{
                        border-color: #009922;
                    }
                  
                }
                a, > div{
                    &.greyed-out{
                        border-color: #eee;
                        color: #ccc;
                    }
                }
            }
        }
        .dates{
            flex-grow: 1;
        }
        .btn-container{
            justify-content: flex-end;
            .month-year-btn{
                flex-grow: 1;
                cursor: pointer;
            }
        }
    }
    
</style>


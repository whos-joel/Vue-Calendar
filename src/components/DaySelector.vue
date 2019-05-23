<template>
    <div class="date-picker">
        <div class="btn-container">
            <div class="month-year-btn btn" @click="setView">
                {{monthYear}}
            </div>
            <div>
                <a href="#" class="btn" @click="$emit('previousMonth')">
                    &lt;
                </a>
            </div>
            <div>
                <a href="#" class="btn" @click="nextMonth()">
                    &gt;
                </a>
            </div>
        </div>
        <div class="days-of-the-week">
            <div class="day" v-for="i in 7" :key="i">
                {{getDayName(i-1)}}
            </div>
        </div>
        <div class="dates">
            <div class="date" v-for="date in dates" :key="date.id">
                <a href="#" 
                    :class="{'today' : date.isToday, 'selected': date.isSelected, 'greyed-out': !date.isInSelectedMonth}"
                    :data-date="date.ticks"
                    @click="setDate(date.value)">
                    {{date.value}}
                </a>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit } from 'vue-property-decorator';
import moment from 'moment';
import DatePickerData from './DatePickerData';

@Component
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

    public getDates(year: number, month: number): DatePickerData[] {
        const data: DatePickerData[] = [];
        for (let i = 0; i < 42; i++) {
            const id = i;
            data[i] = this.getData(id);
        }
        return data;
    }

    public getData(n: number) {     
        const date = this.getDate(n + 1);
        const isToday = date.getTime() === new Date().setHours(0, 0, 0, 0);
        const selected = date.getTime() === this.value.getTime();
        const inSelectedMonth = date.getMonth() === this.selectedMonth;

        return new DatePickerData(n, date, isToday, selected, inSelectedMonth);
    }

    public getDate(n: number) {
        const day = n - this.getFirstDayOfMonth(this.selectedYear, this.selectedMonth);
        return new Date(this.selectedYear, this.selectedMonth, day);
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
    .date-picker{
        display: flex;
        flex-direction: column;
        justify-content: stretch;
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


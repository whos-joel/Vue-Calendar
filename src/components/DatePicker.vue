<template>
    <div class="date-picker">
        <table class="month">
            <tr>
                <td colspan="5">{{monthYear}}</td>
                <td class="btn" @click="$emit('previousMonth')">&lt;</td>
                <td class="btn" @click="nextMonth()">&gt;</td>
            </tr>
            <tr>
                <td v-for="(day, i) in dayNames"
                    :key="i">
                    {{day}}
                </td>
            </tr>
            <tr v-for="(row, i) in dates"
                :key="i">
                <td v-for="data in row"
                    :key="data.id"
                    :class="{'today' : data.isToday, 'selected': data.isSelected, 'greyed-out': !data.isInSelectedMonth}"
                    :data-date="data.date"
                    @click="setDate(data.date)">
                        {{data.date}}
                </td>
            </tr>
        </table>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit } from 'vue-property-decorator';
import moment from 'moment'
import DatePickerData from './DatePickerData'

@Component
export default class DatePicker extends Vue{
    today:Date = new Date();
    //selectedYear:number = 0;
    //selectedMonth:number = 0;
    dayNames:string[] = ["Su","Mo","Tu","We","Th","Fr","Sa"];
    //data:DatePickerData[] = [];

    get monthYear(){
        return moment(new Date(this.selectedYear, this.selectedMonth)).format("MMM YYYY");
    }

    get dates(){
        //this.data = this.getDates(this.selectedYear, this.selectedMonth);
        return this.getDates(this.selectedYear, this.selectedMonth);
    }

    @Prop({default: new Date()})
    value!: Date;

    @Prop({default: new Date().getMonth()})
    selectedMonth!: number;

    @Prop({default: new Date().getFullYear()})
    selectedYear!: number;

    @Prop({default:1})
    firstDayOfTheWeek!:number;

    getDates(year:number, month:number):DatePickerData[][]{
        let data:DatePickerData[][] = [];
        for(var i = 0; i < 6; i++){
            data[i] = [];
            for(var j = 0; j < 7; j++){         
                var id = j + (i * 7);
                data[i][j] = this.getData(id)
            }
        }
        return data;
    }

    getData(n:number){       
        let date = this.getDate(n + 1)
        let isToday = date.getTime() === new Date().setHours(0,0,0,0);
        let selected = date.getTime() === this.value.getTime();
        let inSelectedMonth = date.getMonth() === this.selectedMonth;
        
        return new DatePickerData(n, date.getDate(), isToday, selected, inSelectedMonth);
    }

    getDate(n:number){
        let day = n - this.getFirstDayOfMonth(this.selectedYear, this.selectedMonth);
        return new Date(this.selectedYear, this.selectedMonth, day);
    }

    getFirstDayOfMonth(year:number, month:number){
        return new Date(year, month, 1).getDay()
    }

    @Emit("nextMonth")
    nextMonth(){
        
    }

    @Emit("previousMonth")
    previousMonth(){
        
    }

    @Emit("input")
    setDate(date:number){
        return new Date(this.selectedYear, this.selectedMonth, date, 0, 0, 0, 0);
    }

    created(){
        //this.selectedDate = this.value.getDate();
        //this.selectedMonth = this.value ? this.value.getMonth() : this.today.getMonth();
        //this.selectedYear = this.value ? this.value.getFullYear() : this.today.getFullYear();
        
    }
}
</script>

<style lang="less">
    .date-picker{
        .month{
            td{
                width: 30px;
                height: 30px;
                border: 1px solid #ccc;
                cursor: pointer;
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
    
</style>


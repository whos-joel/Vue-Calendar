<template>
  <div class="calendar" @click.stop="">
    <transition name="fade">
      <day-selector v-if="dateView" v-model="date"
        :selectedMonth="month" 
        :selectedYear="year" 
        @nextMonth="onNextMonth" 
        @previousMonth="onPreviousMonth"
        @view-change="onViewChange"></day-selector>
    </transition>
    <transition name="fade">
      <month-selector v-if="monthView" 
        v-model="mm" 
        :year="yy" 
        @view-change="onViewChange"></month-selector>
    </transition>
     <transition name="fade">
      <year-selector v-if="yearView" v-model="yy"></year-selector>
     </transition>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

import DaySelector from './DaySelector.vue';
import MonthSelector from './MonthSelector.vue';
import YearSelector from './YearSelector.vue';
import moment from 'moment';

@Component({
  components: {
    DaySelector,
    MonthSelector,
    YearSelector,
  },
})
export default class Calendar extends Vue {

  today:Date = new Date();
  year: number = 0;
  month: number = 0;
  start:number = -1;
  end:number = -1;
  startMode:boolean = true;
  endMode:boolean = false;
  reset:boolean = false;
  mode:string = "date";
  dateView:boolean = true;
  monthView:boolean = false;
  yearView:boolean = false;
  transitionDelay:number = 250;

  get view(){
    return this.mode;
  }

  get date() {
      return this.value;
  }

  get format(){
    return moment(this.value.getTime()).format("DD/MMM/YYYY")
  }

  set date(val: Date) {
      this.$emit('input', val);
  }

  get mm() {
      return this.month;
  }

  set mm(val: number) {
      this.setDateView();
      this.month = val;
  }

  get yy() {
      return this.year;
  }

  set yy(val: number) {
      this.setMonthView();
      this.year = val;
  }

  @Prop({default: () => new Date()})
    public value!: Date;

  public onNextMonth() {
    if (this.month === 11) {
        this.month = 0;
        this.year ++;
    } else {
        this.month ++;
    }
  }

  public onPreviousMonth() {
    if (this.month === 0) {
        this.month = 11;
        this.year --;
    } else {
        this.month --;
    }
  }

  public created() {
    this.year = this.value.getFullYear();
    this.month = this.value.getMonth();
  }

  openCalendar(e:Event){
      e.stopPropagation();
    }

  onViewChange(view:string){
    //this.mode = view;
    if(view === "date")
      this.setDateView()
    else if(view == "month")
      this.setMonthView();
    else
      this.setYearView();
  }

  setDateView(){
      this.monthView = false;
      this.yearView = false;
      setTimeout(() => {
         this.dateView = true;
      }, this.transitionDelay);
  }

   setMonthView(){
      this.dateView = false;
      this.yearView = false;
      setTimeout(() => {
         this.monthView = true;
      }, this.transitionDelay);
  }

  setYearView(){
      this.dateView = false;
      this.monthView = false;
      setTimeout(() => {
         this.yearView = true;
      }, this.transitionDelay);
  }
}
</script>

<style lang="less">
  .calendar{
    display:flex;
  }
  .fade-enter-active, .fade-leave-active {
    transition: all .25s;
  }
  .fade-enter-active {
    transition-delay: .25s
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
    transform: scale(1.25);
  }
  .fade-enter-to, .fade-leave {
    transform: scale(1);
  }
</style>

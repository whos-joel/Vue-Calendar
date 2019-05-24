<template>
  <div class="calendar" @click.stop="">
    <transition :name="transition">
      <div v-if="dateView" class="container" 
      :class="{
        'slide-next' : slide === 'next',
        'slide-previous' : slide === 'previous',
        'slide' : slide !== ''}">
        <day-selector v-model="date" v-for="i in numOfSelectors" :key="i" 
          :class="{'next' : slide === 'next' && i === 2, 
          'previous' : slide === 'previous' && i == 2}"
          :selectedMonth="(month + i - 1) - (slide === 'previous' ? 2 : 0)" 
          :selectedYear="year" 
          @nextMonth="onNextMonth" 
          @previousMonth="onPreviousMonth"
          @view-change="onViewChange"></day-selector>
        </div>
    </transition>
    <transition name="fade">
      <month-selector v-if="monthView" 
        v-model="mm" 
        :year="yy" 
        @view-change="onViewChange"></month-selector>
    </transition>
     <transition name="fade">
        <div v-if="yearView" class="container" 
          :class="{
            'slide-next' : slide === 'next',
            'slide-previous' : slide === 'previous',
            'slide' : slide !== ''}">
          <year-selector
            v-for="i in numOfSelectors" :key="i" 
            :class="{'next' : slide === 'next' && i === 2, 
              'previous' : slide === 'previous' && i == 2}" 
            v-model="yy" 
            :page="(yearPage + i - 1) - (slide === 'previous' ? 2 : 0)"
            @nextYear="onNextYear"
            @previousYear="onPreviousYear">
          </year-selector>
       </div>
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
  transitionDelay:number = 0;
  numOfSelectors:number = 1;
  transition:string = "fade";
  slide:string = "";
  yearPage:number = 0;

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
    this.numOfSelectors = 2;
    this.slide = "next"
    setTimeout(() => {
      this.numOfSelectors = 1;
      this.slide = "";
      if (this.month === 11) {
        this.month = 0;
        this.year ++;
      } else {
        this.month ++;
      }
    }, 500);
  }

  public onPreviousMonth() {
    this.numOfSelectors = 2;
    this.slide = "previous";
    setTimeout(() => {
      this.numOfSelectors = 1;
      this.slide = "";
      if (this.month === 0) {
        this.month = 11;
        this.year --;
      } else {
        this.month --;
      }
    }, 500);
  }

  public onNextYear() {
    this.numOfSelectors = 2;
    this.slide = "next"
    setTimeout(() => {
      this.numOfSelectors = 1;
      this.slide = "";
      this.yearPage ++;
    }, 500);
  }

  onPreviousYear() {
    this.numOfSelectors = 2;
    this.slide = "previous"
    setTimeout(() => {
      this.numOfSelectors = 1;
      this.slide = "";
      this.yearPage --;
    }, 500);
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
    width:100%;
    height:100%;
    position: relative;
    overflow: hidden;
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
  .slide {
    transition: all .25s;
    transform:  translateX(0);
  }
  .slide-next{
    transform:  translateX(-100%);
  }

  .slide-previous{
    transform:  translateX(100%);
  }
  
  .container{
    width: 100%;
    height: 100%;
  }
</style>

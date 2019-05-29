<template>
  <div class="calendar" @click.stop="">
    <transition :name="transition">
      <div v-if="dateView" class="component-group">
        <next-previous
          :disableNext="disableNextMonth"
          :disablePrevious="disablePreviousMonth"
          :info="monthYear"
          @infoClick="setMonthView"
          @next="onNextMonth"
          @previous="onPreviousMonth">
        </next-previous>
        <days-of-week :first-day-of-week="1">
        </days-of-week>
        <div class="slide-container" 
        :class="{
          'slide-next' : slide === 'next',
          'slide-previous' : slide === 'previous',
          'slide' : slide !== ''}">
          <day-selector v-model="date" v-for="i in numOfSelectors" :key="i" 
            :class="{'next' : slide === 'next' && i === 2, 
            'previous' : slide === 'previous' && i == 2}"
            :selectedMonth="(month + i - 1) - (slide === 'previous' ? 2 : 0)" 
            :selectedYear="year" 
            :first-day-of-week="1"
            :max="max" :min="min"
            @nextMonth="onNextMonth" 
            @previousMonth="onPreviousMonth"
            @view-change="onViewChange"></day-selector>
          </div>
        </div>
    </transition>
    <transition name="fade">
      <month-selector v-if="monthView" 
        v-model="mm" 
        :year="yy" 
        :max="max" :min="min"
        @view-change="onViewChange"></month-selector>
    </transition>
     <transition name="fade">
       <div v-if="yearView" class="component-group">
            <next-previous
            :disableNext="disableNextYear"
            :disablePrevious="disablePreviousYear"
            @next="onNextYear"
            @previous="onPreviousYear">
            </next-previous>
           <div class="slide-container" 
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
                :max="max" :min="min"
                @nextYear="onNextYear"
                @previousYear="onPreviousYear">
              </year-selector>
          </div>
       </div>
     </transition>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

import DaySelector from './DaySelector.vue';
import MonthSelector from './MonthSelector.vue';
import YearSelector from './YearSelector.vue';
import NextPrevious from './NextPrevious.vue';
import DaysOfWeek from './DaysOfWeek.vue';

import moment from 'moment';

@Component({
  components: {
    DaySelector,
    MonthSelector,
    YearSelector,
    NextPrevious,
    DaysOfWeek
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
  disableNextYear:boolean = false;
  disablePreviousYear:boolean = false;
  disableNextMonth:boolean = false;
  disablePreviousMonth:boolean = false;

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
      this.yearPage = 0;
  }

  get monthYear() {
        return moment(new Date(this.year, this.month)).format('MMM YYYY');
  }

  @Prop({default: () => new Date()})
    public value!: Date;

  @Prop()
  public min?: Date;

  @Prop()
  public max?: Date;

  public onNextMonth() {
    this.isAtMaxMonth(this.month + 2)
    this.isAtMinMonth(this.month + 2)
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
    this.isAtMaxMonth(this.month - 2)
    this.isAtMinMonth(this.month - 2)
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
    this.setDisableNextYear(this.yearPage + 1);
    this.setDisablePreviousYear(this.yearPage + 1);
    setTimeout(() => {
      this.numOfSelectors = 1;
      this.slide = "";
      this.yearPage ++;
    }, 500);
  }

  onPreviousYear() {
    this.numOfSelectors = 2;
    this.slide = "previous"
    this.setDisableNextYear(this.yearPage - 1);
    this.setDisablePreviousYear(this.yearPage -1);
    setTimeout(() => {
      this.numOfSelectors = 1;
      this.slide = "";
      this.yearPage --;
    }, 500);
  }

  setDisableNextYear(n:number){
    let maxYear = this.year + (n * 16) + 15
    if(this.max && maxYear >= this.max.getFullYear())
      this.disableNextYear = true;
    else
      this.disableNextYear = false; 
  }

  setDisablePreviousYear(n:number){
    let minYear = this.year + n * 16
    if(this.min && minYear <= this.min.getFullYear())
      this.disablePreviousYear = true;
    else
      this.disablePreviousYear = false; 
  }

  isAtMaxMonth(month:number){
    if(this.max && month > this.max.getMonth() && this.year >= this.max.getFullYear())
      this.disableNextMonth = true;
    else
      this.disableNextMonth = false;
  }

  isAtMinMonth(month:number){
    if(this.min && month < this.min.getMonth() && this.year <= this.min.getFullYear())
      this.disablePreviousMonth = true;
    else
      this.disablePreviousMonth = false;
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
        this.isAtMaxMonth(this.month)
        this.isAtMinMonth(this.month)
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
        this.setDisableNextYear(this.yearPage);
        this.setDisablePreviousYear(this.yearPage);
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
  
  .slide-container, .component-group{
    width: 100%;
    height: 100%;
    position: absolute;
  }
</style>

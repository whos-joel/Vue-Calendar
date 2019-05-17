<template>
  <div class="calendar" @click.stop="">
    <date-picker v-if="view === 'date'" v-model="date"
      :selectedMonth="month" 
      :selectedYear="year" 
      @nextMonth="onNextMonth" 
      @previousMonth="onPreviousMonth"
      @view-change="onViewChange"></date-picker>
    <month-picker v-if="view === 'month'" 
      v-model="mm" 
      :year="yy" 
      @view-change="onViewChange"></month-picker>
    <year-picker v-if="view === 'year'" v-model="yy"></year-picker>
    {{format}}
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

import DatePicker from './DatePicker.vue';
import MonthPicker from './MonthPicker.vue';
import YearPicker from './YearPicker.vue';
import moment from 'moment';

@Component({
  components: {
    DatePicker,
    MonthPicker,
    YearPicker,
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
      this.mode = "date";
      this.month = val;
  }

  get yy() {
      return this.year;
  }

  set yy(val: number) {
      this.mode = "month";
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
    // this.year = this.value ? this.value.getFullYear() : this.today.getFullYear() ;
    // this.month = this.value ? this.value.getMonth() : this.today.getMonth();
    this.year = this.value.getFullYear();
    this.month = this.value.getMonth();
  }

  openCalendar(e:Event){
      e.stopPropagation();
    }

  onViewChange(view:string){
    this.mode = view;
  }
}
</script>

<style lang="less">

</style>

<template>
  <div class="calendar">
    <date-picker v-model="date"
      :selectedMonth="month" 
      :selectedYear="year" 
      @nextMonth="onNextMonth" 
      @previousMonth="onPreviousMonth"></date-picker>
    <month-picker v-model="month"></month-picker>
    <year-picker v-model="year"></year-picker>
    {{value}}
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

import DatePicker from './DatePicker.vue';
import MonthPicker from './MonthPicker.vue';
import YearPicker from './YearPicker.vue';

@Component({
  components: {
    DatePicker,
    MonthPicker,
    YearPicker,
  },
})
export default class Calendar extends Vue {

  today:Date = new Date();
  public year: number = 0;
  public month: number = 0;

  get date() {
      return this.value;
  }

  set date(val: Date) {
      this.$emit('input', val);
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
}
</script>

<style lang="less">

</style>

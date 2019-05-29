<template>
    <div class="input-group">
        <label>Start Date</label>
         <input type="test" :value="format" @click="openCalendar"/>
         <transition name="fade">
          <div v-if="open" class="calendar-container">
              <calendar v-model="date" :max="max" :min="min"></calendar>
          </div>
         </transition>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

import Calendar from './Calendar.vue';
import moment from 'moment';

@Component({
  components: {
    Calendar,
  },
})
export default class DateInput extends Vue {

    open:boolean = false;
    min:Date = new Date(1979,3,10);
    max:Date = new Date(2039,7,10);

    get date() {
      return this.value;
    }

    set date(val: Date) {
      this.open = false;
      this.$emit('input', val);
    }

    @Prop({default: () => new Date()})
    public value!: Date;

    get format(){
        return moment(this.value.getTime()).format("DD/MMM/YYYY")
    }

    openCalendar(e:Event){
      this.open = true;
      e.stopPropagation();
    }

    created(){
        let $this = this;
        window.addEventListener("click", function(e){
             $this.open = false;
        });
    }
}
</script>

<style lang="less">
.input-group{
  display: flex;
  flex-direction: column;
  padding: 15px;
  width: 300px;
  input{
    margin: 5px 0;
    padding: 5px;
  }
}
   .calendar-container{
     width: 400px;
     height: 400px;
     border: 1px solid #ccc;
     box-shadow: 3px 3px 5px 2px rgba(0,0,0,.35);
     padding:1rem;
   }
   *{
     box-sizing: border-box;
    }
</style>



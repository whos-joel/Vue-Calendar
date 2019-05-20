<template>
    <div>
         <input type="test" :value="format" @click="openCalendar"/>
         <div v-if="open" class="calendar-container">
             <calendar v-model="date"></calendar>
         </div>
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
   .calendar-container{
     width: 400px;
     border: 1px solid #ccc;
     box-shadow: 3px 3px 5px 2px rgba(0,0,0,.35);
     padding:1rem;
   }
   *{
     box-sizing: border-box;
    }
</style>



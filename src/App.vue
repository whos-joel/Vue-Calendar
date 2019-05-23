<template>
  <div id="app">
    <date-input v-model="date"></date-input>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

//import Calendar from './components/Calendar.vue';
import DateInput from './components/DateInput.vue';


@Component({
  components: {
    DateInput,
  },
})
export default class App extends Vue {
  public date: Date = new Date();
}
</script>

<style lang="less">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
*{
  box-sizing: border-box;
}
</style>

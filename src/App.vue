<template>
  <div id="app">
    <calendar v-model="date"></calendar>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import Calendar from './components/Calendar.vue';


@Component({
  components: {
    Calendar,
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
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
*{
  box-sizing: border-box;
}
</style>

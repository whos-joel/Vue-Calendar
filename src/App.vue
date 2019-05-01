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
    Calendar
  },
})
export default class App extends Vue {
  date:Date | null = new Date(1970, 11, 14);
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
</style>

<template>
  
  <List />

  
</template>

<script language="ts">
//import {Counter} from './use/counter.vue'

import List from '@/components/List'
import {ref} from 'vue'
import { postJson } from './use/fetch'



export default {
  
  components: {List},
  
  setup(){

    
    return {  }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.item {margin-bottom: 10px;}
</style>

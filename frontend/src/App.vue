<template>
  <select v-model="current_component">
    <option v-for="c in components" :value="c.v">{{c.d}}</option>
  </select>
  <hr>
  <component v-bind:is="current_component"></component>
  

  
</template>

<script language="ts">
//import {Counter} from './use/counter.vue'

import List from '@/components/List/List.vue'
import Files from '@/components/Files'
import {getCurrentInstance, ref} from 'vue'
import { postJson } from './use/fetch'



export default {
  
  components: {List, Files},
  
  setup(){
    /*const internalInstance = getCurrentInstance(); 

    const emit = internalInstance.appContext.config.globalProperties.emitter;
    console.log('emit:',emit)*/
    let self = getCurrentInstance()
    

    const components=[
      {v:'List',d:'Список'},
      {v:'Files',d:'File Api'}

    ];
    const current_component=ref('List')
    
    return { components, current_component }
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

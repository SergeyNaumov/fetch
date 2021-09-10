<template>
  <select v-model="current_component">
    <option v-for="c in components" :value="c.v">{{c.d}}</option>
  </select>
  <div class="container">
    <component v-bind:is="current_component"></component>
  </div>
  

  
</template>

<script language="ts">
//import {Counter} from './use/counter.vue'

import List from '@/components/List/List.vue'
import Files from '@/components/Files'
import {ref} from 'vue'
import { postJson } from './use/fetch'



export default {
  
  components: {List, Files},
  
  setup(){
    /*const internalInstance = getCurrentInstance(); 

    const emit = internalInstance.appContext.config.globalProperties.emitter;
    console.log('emit:',emit)*/
    

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
@import'~bootstrap/dist/css/bootstrap.css'


</style>

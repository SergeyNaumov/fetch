<template>
  
  <Errors :errors="errors"/>  

  <form @submit.prevent="onSubmit">
    Создание пользователя:
    <input type="text" v-model="name">
    <button>добавить</button>
  </form>
</template>

<script>

import {ref} from 'vue'
import Errors from './Errors'

export default {
  components: {Errors},
  setup(_, { emit }){
    const name=ref('Иванов Иван')
    const errors=ref([])
    const onSubmit = ()=>{
      emit('onSubmit',
        {
          name:name.value
        },
        errors
      )
      name.value=''
    }
    return {name, onSubmit, errors}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  form {
    margin-bottom: 20px; 
    padding-bottom: 20px;
    border-bottom: 1px solid gray;
  }
  button {margin-left: 10px;}

</style>

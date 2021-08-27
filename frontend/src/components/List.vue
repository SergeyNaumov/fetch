<template>
  <Form @onSubmit="addUser"/>
  <Errors :errors="errors"/>

  <User v-for='item in users' :item="item" :key="item.id" :deleteUser="deleteUser"/>

</template>

<script>

import { ref } from 'vue'
import Errors from './Errors'
import { httpGet, httpPost, httpDelete } from '../use/fetch'
import Form from './Form'
import User from './User'

const loadUsers=(users,errors)=>{
  httpGet({
      url:'http://127.0.0.1:5000/userList',
      to:users,
      errors:errors
    })
}

export default {
  components: {Errors, Form, User},

  setup(   ){

    const  users  =ref([]);
    const errors=ref([])

    loadUsers(users,errors)

    const addUser = (item,errors) => {
      httpPost({
        url: 'http://127.0.0.1:5000/addUser',
        data:{
          name: item['name'],
          
        },
        errors: errors,
        success: ()=>{
          loadUsers(users,errors)
        }
      })
    }



    const deleteUser=(user)=>{
      httpDelete({
        url: 'http://127.0.0.1:5000/delUser/'+user.id,
        errors: errors,
        success: ()=>{
          //loadUsers(users,errors)
          users.value=users.value.filter(u=>{return u.id!=user.id})
        }
      })
    }
    
    return {users,errors, addUser, deleteUser}

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


</style>

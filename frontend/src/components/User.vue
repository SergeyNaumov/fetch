<template>
      <div   class="user">
        
        <div v-show="edit" class="name">
            <form @submit.prevent="">
                <input type="text" :id="main_fld_input_id" v-model="user.name"/>
            </form>
        </div>
        <div v-show="!edit"  class="name">
            <a href="#" @click.prevent="edit=true">{{user.name}}</a>
        </div>
        <a href="#" @click.prevent="deleteUser(item)">
          <img
            class="icon"
            src="https://cdn4.iconfinder.com/data/icons/epic-outlines/30/660989-delete_button-1024.png"
            align="absmiddle"
          >
        </a>
      </div>
</template>
<script>
import {ref, reactive, watch, nextTick} from 'vue'
export default {
    props:["item","deleteUser", "updateUser"],



    
    

    setup(props, {root} ){
        const edit=ref(false)
        const user=reactive({name:''})
        const main_fld_input_id='rnd'+Math.round( Math.random() * 20000 )
        let escape_event=false

        const copy_item=()=>{
            user.name=props.item.name
            //console.log('props_item:',props.item.name)
        }
        watch( props.item, ()=>{
                copy_item()
            }
        )

        // Esc -- убираем режим редактирования
        const listener_escape=(e)=>{
            
            if (e.key == "Escape") {
                edit.value=false
                document.body.removeEventListener('keydown', listener_escape,false)
            }
        }
        watch(edit,()=>{
            if(edit.value){
                console.log('event on')
                document.body.addEventListener('keydown', listener_escape,false)
                nextTick(
                    ()=>{
                        document.getElementById(main_fld_input_id).focus()
                    }
                )
                
                
            }
            else{
                console.log('event off')
                document.body.removeEventListener('keydown', listener_escape,false)
            }
        })
        copy_item()
        return { edit, user, main_fld_input_id}
    }
}
</script>
<style scoped>
  div.name {display: inline-block;}
  .user {margin-bottom: 10px; text-align: left; margin-left: 10%;}
  .icon {width: 18px; margin-left: 10px;}
</style>
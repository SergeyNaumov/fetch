<template>
    <div class="user row">
        <div class="col-md-10">

            <div v-show="edit" class="name">
                <form @submit.prevent="">
                    <input type="text" :id="main_fld_input_id" v-model="user.name"/>
                </form>
            </div>
            <div  class="name" v-show="!edit">
                    <a href="#" @click.prevent="edit=true">{{user.name}}</a>
                
            </div>

        </div>
        

        
        <div class="col-md-2" v-if="!edit" >

            <a href="#" @click.prevent="deleteUser(item)"> 
              <img
                class="icon"
                src="https://cdn4.iconfinder.com/data/icons/epic-outlines/30/660989-delete_button-1024.png"
                align="absmiddle"
              >
            </a>
        </div>
    </div>
      
</template>
<script>
import {ref, reactive, watch, nextTick, getCurrentInstance} from 'vue'
import {onMounted, onUnmounted} from 'vue'
import {emitter} from '/src/main'
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
                emitter.emit('close_list_user',main_fld_input_id)
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

        // GLOBAL EVENT BUS
        /*const internalInstance = getCurrentInstance(); 
        const emitter = internalInstance.appContext.config.globalProperties.emitter;*/

        // прекращать редактирование элемента в случае нажатия Esc, либо в случае клика за пределами input-а
        const close_list_user=id=>{
                if(main_fld_input_id!=id){
                    edit.value=false
                    document.body.removeEventListener('keydown', listener_escape,false)
                }
                else{
                    
                }
        }

        // прекращать редактирование при клике вне input-а

        // const click_out_element=(e)=>{
        //          console.log('click0',internalInstance.edit)
        //          if(!edit.value)
        //             return
        //          const target = e.target;
        //          const input=document.getElementById(main_fld_input_id)
        //          const its_input = target == input || input.contains(target)
        //          if(!its_input){ // клие вне инпута
        //             edit.value=false
        //          }
        // }

        onMounted(()=>{
            //document.onclick=click_out_element
            emitter.on('close_list_user',close_list_user)
            

        })
        onUnmounted(
            ()=>{
                console.log('destroy')
                emitter.off('close_list_user',close_list_user);
            }
        )
        
        return { edit, user, main_fld_input_id}
    }
}
</script>
<style scoped>
  div.name {display: inline-block;}
  .user {margin-bottom: 10px; text-align: left; margin-left: 10%;}
  .icon {width: 18px; margin-left: 10px;}
</style>
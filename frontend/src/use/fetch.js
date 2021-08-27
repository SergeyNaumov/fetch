import {ref} from 'vue'


// GET
export function httpGet(arg) {
    
    let errors=[]
    if(!arg.url){
        console.error('getJson error! not argument url',arg)
        return 
    }
    fetch(arg.url).then(
        res=>{
            
            if(!res.ok){
                errors=[`${res.url} ${res.status} ${res.statusText}`]
            }
            return res.json()
        }
    ).then(
        data=>{
            process_data(arg,data,errors)
        }
    ).catch(
        e=>{
            if('errors' in arg)
                arg.errors.value.push(e)
        }
    )
}

// POST
export function httpPost(arg){
    do_request(arg,'POST')
}
// Delete
export function httpDelete(arg){
    do_request(arg,'DELETE')
}

export function httpPut(arg){
    do_request(arg,'PUT')
}

const do_request=(arg,method)=>{
    let errors=[]
    let success=true
    
    fetch(arg.url,{
        method: method,
        body: JSON.stringify(arg.data),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    }).then(res=>{
        if(!res.ok){
            errors=[`${res.url} ${res.status} ${res.statusText}`]
        }
        return res.json()
    }).then(
        data=>{
            process_data(arg,data,errors)
        }
    ).catch(
        e=>{
            if('errors' in arg)
                arg.errors.value.push(e)
        }
    )    
}

const process_data=(arg,data,errors)=>{
    let data_value
    let success=true
    if(!process_errors(arg,errors)){ // ошибок нет
        
        if(is_success_scheme(data)){
            success=data.success
            data_value=data.data
            process_errors(arg,data.errors)
            
        }
        else{
            data_value=data
        }
        if(success && ('to' in arg)){
            if( '__v_isRef' in  arg.to && arg.to.__v_isRef ) {
                arg.to.value=data_value
            }
            else{
                arg.to=data_value
            }
        }

        if(success)
            process_success(arg,data_value)
    }
}

const process_success=(arg,data)=>{
    if('success' in arg && typeof(arg.success) == 'function'){
        arg.success(data)
    }
}
const process_errors=(arg,errors)=>{
    //console.log('errors:'))
    if(errors && errors.length){
        if(typeof(arg.errors)=='function')
            arg.errors(errors)
    }
    if('__v_isRef' in arg.errors && (arg.errors.__v_isRef)){
        arg.errors.value=errors
    }
    else{
        arg.errors=errors
    }
    return (errors && errors.length)
}



const is_success_scheme=(data)=>{
    return ('success' in data && 'data' in data)
}
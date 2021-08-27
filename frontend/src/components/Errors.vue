<template>
    
  <div class="errors" v-if="errors.length">
    <div v-for="(e,idx) in errors" :key="'err'+idx">{{e}}</div>
  </div>
</template>
<script>
export default{
    props:["errors"]
}
</script>
<style scoped>
    .errors {color: red;}
</style>
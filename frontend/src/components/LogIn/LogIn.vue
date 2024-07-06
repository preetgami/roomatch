<template>
  {{ this.$store.state.user }}
  <v-text-field v-model="name" label="Label"></v-text-field>
  <v-btn @click="find">here</v-btn>
</template>
<script>
import { mapActions } from 'vuex';

export default{
 name:'LogInPage',
 data(){
  return{
  name:''}
 },
 methods:{
  ...mapActions({
    findusers:'findusers'
  }),
  find(){
    this.findusers(this.name)
  }
 }
}
</script>

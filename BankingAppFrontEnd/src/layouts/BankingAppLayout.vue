<template>
  <q-layout view="lHh Lpr lFf">
    <h2>Navigation header</h2>
    <q-btn v-if="userSessionStore.isLoggedIn" label="Logout" @click="logout"/>
    <q-page-container>
      <router-view />
    </q-page-container>
    <h2>Footer mf</h2>
  </q-layout>
</template>

<script>
import { defineComponent } from 'vue'
import { useUserSessionStore } from "stores/userSession";



export default defineComponent({
  name: 'MainLayout',
  data() {
    return {
      
    }
  },
  setup() {
    return{
      userSessionStore: useUserSessionStore(),
    } 
  },
  methods: {
    logout(){
      this.$router.push({ path: '/' });
      this.userSessionStore.logout();
    }
  },


})
</script>

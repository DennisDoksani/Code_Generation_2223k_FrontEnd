<template>
  <q-layout view="lHh Lpr lFf">
    <h1>Navigation header</h1>
    <q-page-container>
      <router-view />
    </q-page-container>
    <h1>Footer mf</h1>
  </q-layout>
</template>

<script>
import { defineComponent } from 'vue'



export default defineComponent({
  name: 'MainLayout',

})
</script>

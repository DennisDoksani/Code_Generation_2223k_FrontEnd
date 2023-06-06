<template>
  <q-layout view="lHh Lpr lFf">
    <h2>Navigation header</h2>
    <q-page-container>
      <router-view />
    </q-page-container>
    <h2>Footer mf</h2>
  </q-layout>
</template>

<script>
import { defineComponent } from 'vue'



export default defineComponent({
  name: 'MainLayout',

})
</script>

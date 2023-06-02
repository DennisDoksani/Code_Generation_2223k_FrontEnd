<template>
  <q-page class="flex flex-center">
    <div class="column">
      <h1 class="flex flex-center">BDRJ Bank</h1>
      <h4 class="flex flex-center">Putting the 'fun' in funds</h4>
      <div class="flex flex-center">
        <LoginForm></LoginForm>
      </div>
    </div>
  </q-page>
  
</template>

<script>
import { defineComponent } from 'vue'
import LoginForm from 'components/auth/LoginForm.vue'

export default defineComponent({
  name: 'IndexPage',
  components: { LoginForm },
})
</script>

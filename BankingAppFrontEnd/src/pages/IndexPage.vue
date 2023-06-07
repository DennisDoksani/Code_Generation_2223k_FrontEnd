<template>
  <q-page class="flex flex-center">
    <div class="column">
      <h1 class="flex flex-center">BDRJ Bank</h1>
      <h4 class="flex flex-center">Putting the 'fun' in funds</h4>
      <div class="flex flex-center">
        <LoginForm v-if="!this.userSessionStore.isLoggedIn"></LoginForm>
      </div>
    </div>
  </q-page>
  
</template>

<script>
import { defineComponent } from 'vue'
import LoginForm from 'components/auth/LoginForm.vue'
import { useUserSessionStore } from "stores/userSession";

export default defineComponent({
  name: 'IndexPage',
  data() {
    return {
      isLoggedIn: userSessionStore.isLoggedIn,
    }
  },
  setup() {
    const userSessionStore = useUserSessionStore();
  },
  mounted() {
  },
  components: { LoginForm },
})
</script>

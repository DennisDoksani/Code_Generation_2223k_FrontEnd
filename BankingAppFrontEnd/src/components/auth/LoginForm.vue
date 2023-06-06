<template>
    <q-card class="q-pa-md">
      <q-card-section>
        <q-form @submit="login">
          <q-input
            v-model="email"
            label="Email"
            lazy-rules
            :rules="[val => !!val || 'Please enter your email']"
          />
          <q-input
            v-model="password"
            label="Password"
            lazy-rules
            :rules="[val => !!val || 'Please enter your password']"
            type="password"
          />
          <q-btn type="submit" label="Login" class="q-mt-md" />
        </q-form>
        <RouterLink to="/register" class="q-mt-md">Don't have an account? Register here.</RouterLink>
      </q-card-section>
    </q-card>
</template>

  <script>
  import { useUserSessionStore } from "stores/userSession";
  export default {
    name: 'LoginForm',
    setup() {
      return {
        userSessionStore : useUserSessionStore()
      };
    },
    data () {
      return {
        email: '',
        password: ''
      }
    },
    methods: {
    login() {
      this.userSessionStore.login(this.email, this.password)
      .then(()=> {
        this.$q.notify({
          color: 'positive',
          message: 'Login successful',
          icon: 'check'
        })
        this.$router.push("/overview")

      })
      .catch((error) => {
        this.$q.notify({
          color: 'negative',
          message: error.response.data.message || 'Login failed, try again later',
          icon: 'warning',
          position: 'top'
        })
        console.log(error);
      });
    }
  }
  };
  </script>

  <style>
  .q-card {
    width: 100%
  }
  </style>

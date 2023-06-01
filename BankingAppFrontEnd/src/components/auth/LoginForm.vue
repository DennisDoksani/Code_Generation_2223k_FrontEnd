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
      </q-card-section>
    </q-card>
</template>
  
  <script>
  import { useUserSessionStore } from "stores/user-session";
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
        this.$router.push("/") 
        
      })
      .catch((error) => {
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
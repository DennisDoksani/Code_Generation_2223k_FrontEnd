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
          <q-btn color="primary" type="submit" label="Login" class="q-mt-md" />
        </q-form>
        <RouterLink to="/register" class="q-mt-md" id="registerlink">Don't have an account? Register here.</RouterLink>
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
          icon: 'check',
          position: 'top'
        })
        this.$router.push("/overview")

      })
      .catch((error) => {
        if(error.response){
          this.$q.notify({
          color: 'negative',
          message: error.response.data.message,
          icon: 'warning',
          position: 'top'
          })
        }
        else{
          this.$q.notify({
          color: 'negative',
          message: 'Connection error',
          icon: 'warning',
          position: 'top'
          })
        }
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

  #registerlink{
    text-decoration: none;
    color: white;
  }
  </style>

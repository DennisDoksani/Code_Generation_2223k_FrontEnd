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
  export default {
    name: 'LoginForm',
    data () {
      return {
        email: '',
        password: ''
      }
    }
  }
  </script>
  
  <style>
  .q-card {
    width: 100%
  }
  </style>
<template>
    <q-card class="q-pa-md">
      <q-card-section>
        <q-form @submit="register">
          <q-input
            v-model="firstName"
            label="firstName"
            lazy-rules
            :rules="[val => !!val || 'Please enter your first name']"
          />
          <q-input
            v-model="lastName"
            label="lastName"
            lazy-rules
            :rules="[val => !!val || 'Please enter your last name']"
          />
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
          <q-btn type="submit" label="Register" class="q-mt-md" />
        </q-form>
      </q-card-section>
      
    </q-card>
</template>
  
  <script>
  export default {
    name: 'RegistrationForm',
    data () {
      return {
        bsn: 0,
        firstName: '',
        lastName: '',
        phoneNumber: '',
        dateOfBirth: '',
        email: '',
        password: '',
        passwordConfirmation: '',
      }
    }
  }
  </script>
  
  <style>
  .q-card {
    width: 100%
  }
  </style>
<template>
    <q-card class="q-pa-md">
      <q-card-section>
        <q-form @submit="register">
          <q-input
            v-model="firstName"
            label="First Name"
            lazy-rules
            :rules="[val => !!val || 'Please enter your first name']"
          />
          <q-input
            v-model="lastName"
            label="Last Name"
            lazy-rules
            :rules="[val => !!val || 'Please enter your last name']"
          />
          <q-input
            v-model="email"
            label="Email"
            lazy-rules
            :rules="[
              val => !!val || 'Please enter your email',
              val => /.+@.+\..+/.test(val) || 'E-mail must be valid'
              ]"
            type="email"
          />
          <q-input
            v-model="password"
            label="Password"
            lazy-rules
            :rules="[val => !!val || 'Please enter your password']"
            type="password"
          />
          <q-input
            v-model="passwordConfirmation"
            label="Confirm Password"
            lazy-rules
            :rules="[
              val => !!val || 'Please confirm your password',
              val => val === this.password || 'Confirmation password does not match']"
            type="password"
          />
          <q-input
            v-model="bsn"
            label="BSN"
            lazy-rules
            :rules="[
              val => !!val || 'Please enter your bsn.',
              val => !isNaN(val) || 'BSN must be a number',
              val => (val.length == 8 || val.length == 9) || 'BSN must be 8 or 9 digits',
              ]"
            type="text"
          />
          <q-input
            v-model="phoneNumber"
            label="Phone Number"
            lazy-rules
            :rules="[
              val => !!val || 'Please enter your phone number.',
              val => !isNaN(val) || 'Phone number must be a number',
              val => (val.length >= 10) || 'Phone number must be at least 10 digits',
            ]"
            :hint="`Format: 0612345678`"
            type="tel"
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
        bsn: null,
        firstName: '',
        lastName: '',
        phoneNumber: '',
        dateOfBirth: '',
        email: '',
        password: '',
        passwordConfirmation: '',
      }
    },
    methods: {
    register() {
      this.userSessionStore.login(this.email, this.password)
      .then(()=> {
        this.$router.push("/overview")

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
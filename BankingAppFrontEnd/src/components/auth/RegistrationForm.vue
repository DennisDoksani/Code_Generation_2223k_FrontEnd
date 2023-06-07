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
            :rules="[
              val => !!val || 'Please enter your password',
              val => val.length >= 8 || 'Password must be at least 8 characters long',
              val => /[A-Z]/.test(val) || 'Password must contain at least one uppercase letter',
            ]"
            type="password"
          />
          <q-input
            v-model="confirmationPassword"
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
            v-model="dateOfBirth"
            label="Date of Birth"
            lazy-rules
            :rules="[
              val => !!val || 'Please enter your date of birth',
              val => (new Date(val) < new Date()) || 'Date of birth must be in the past',
              ]"
            type="date"
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
  import axios from '/axios-basis.js';
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
        confirmationPassword: '',
        password: '',
      }
    },
    methods: {
    register() {
      axios.post('/users', {
        bsn: this.bsn,
        firstName: this.firstName,
        lastName: this.lastName,
        phoneNumber: this.phoneNumber,
        dateOfBirth: this.dateOfBirth,
        email: this.email,
        password: this.password,
      })
      .then(()=> {
        this.$q.notify({
          message: 'Registration successful',
          color: 'positive',
          icon: 'check',
          position: 'top'
        })
        wait(1000);
        this.$router.push("/")
      })
      .catch((error) => {
        console.log(error);
        this.$q.notify({
          message: error.response.data.message || 'Registration failed, try again later',
          color: 'negative',
          icon: 'warning',
          position: 'top'
        })
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
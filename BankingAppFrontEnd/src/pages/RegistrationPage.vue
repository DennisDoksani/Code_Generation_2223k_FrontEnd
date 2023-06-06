<template>
    <div class="q-pa-md">
      <h1>Register</h1>
      <div class="q-pa-sm">
        <RegistrationForm></RegistrationForm>>
      </div>
    </div>
  </template>
  
  <script>
  import RegistrationForm from "components/auth/RegistrationForm.vue";
  export default {
    name: "RegistrationPage",
    components: { RegistrationForm }
  
  };
  </script>
  
  <style scoped>
  
  </style>
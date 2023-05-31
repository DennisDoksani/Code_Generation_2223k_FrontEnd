<template>
    <div class="q-pa-md">
      <h1>Login</h1>
      <div class="q-pa-sm">
        <LoginForm></LoginForm>
      </div>
    </div>
  </template>
  
  
  <script>
  import LoginForm from "components/auth/LoginForm.vue";
  export default{
    name: "LoginPage",
    components: { LoginForm },
  
  };
  </script>
  
  <style scoped>
  
  </style>
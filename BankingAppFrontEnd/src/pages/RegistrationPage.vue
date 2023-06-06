<template>
  <q-page class="flex flex-center ">
    <div class="q-pa-sm">
      <h1>Register</h1>
      <div class="q-pa-sm">
        <RegistrationForm></RegistrationForm>
      </div>
    </div>
  </q-page>
</template>

<script>
import RegistrationForm from "components/auth/RegistrationForm.vue";
export default {
  name: "RegistrationPage",
  components: { RegistrationForm }
};
</script>

<style scoped>
  .q-page {
    width: 100%;
  }
</style>
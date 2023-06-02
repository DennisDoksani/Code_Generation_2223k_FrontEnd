<template>
    <div class="q-pa-md">
      <h1>Register</h1>
      <div class="q-pa-sm">
        <AccountsOverviewTable ></AccountsOverviewTable>
      </div>
    </div>
  </template>
  
  
  <script>
  import AccountsOverviewTable from "components/accounts/AccountsOverviewTable.vue";
  export default {
    name: "AccountsIndex",
    components: { AccountsOverviewTable },
  
  };
  </script>
  
  <style scoped>
  
  </style>
<template>
    <div class="q-pa-md">
      <h1>Users Overview</h1>
      <div v-if="!isAuthorised">
        <h4>Please Login in order to view this Page</h4>
      </div>
      <div v-else>
        <div v-if="!isForbidden">
          <div class="q-pa-sm">
            <div class="q-pb-md">
              <q-btn
                color="primary"
                label="Create New Account"
                @click="$router.push('/accounts/createNewAccount')"
                class="float-right"
              ></q-btn>
            </div>
            <div class="q-pt-sm">
              <UsersOverviewTable class="q-pt-sm"
                @unAuthorised="unAuthorised"
                @forbidden="forbidden"
                @loading="loading=$event"
              ></UsersOverviewTable>
            </div>
          </div>
        </div>
        <div v-else>
          <h4>You dont have enough permission to view this page</h4>
        </div>
      </div>
      <div v-if="loading" class="loading-container">
        <q-spinner-gears size="50px"></q-spinner-gears>
      </div>
    </div>
  </template>
  
  
  <script>
import UsersOverviewTable from 'components/users/UsersOverviewTable.vue';
  
  export default {
    name: 'UsersIndex',
    components: { UsersOverviewTable },
    data() {
      return {
        isAuthorised: true,
        isForbidden: false,
        loading: false,
      };
    },
    methods: {
      unAuthorised() {
        this.isAuthorised = false;
      },
      forbidden() {
        this.isForbidden = true;
      },
    },
  
  };
  </script>
  
  <style scoped>
  .loading-container {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh; /* Adjust the height as needed */
  }
  </style>
  
<template>
  <q-page class="flex flex-center">
    <div class="q-pa-md" v-if="userSessionStore.isLoggedIn" >
      <div class="row">
        <div class="q-gutter-y-md" style="width: 700px;" >
          <AccountsTabPanels class="q-ml-lg-lg" ></AccountsTabPanels>
        </div>
      </div>
      <h2>Place for Transactions</h2>
      <!--<TransactionTable></TransactionTable>-->
    </div>
    <div v-else>
      <h2 >Not logged in</h2>
      <q-btn
        color="primary"
        label="Login"
        @click="this.$router.push('/')"/>
    </div>
  </q-page>
</template>

<script>
import AccountsTabPanels from 'components/HomePage/AccountsTabPanels.vue';
import {useUserSessionStore} from 'stores/userSession';
//import TransactionTable from 'src/components/transactions/TransactionTabPanels.vue';

export default {
  name: 'LoggedUserOverViewPage',
  setup() {
    return {
      userSessionStore: useUserSessionStore(),
    };
  },
  components: {
    AccountsTabPanels,
    //TransactionTable,
  },
  data() {
    return {};
  },
  methods: {},
};
</script>

<style scoped></style>

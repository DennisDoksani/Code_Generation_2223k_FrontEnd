<template>
  <q-page class="flex flex-center">
    <div class="q-pa-md" v-if="userSessionStore.isLoggedIn">
      <div class="row">
        <div class="q-gutter-y-md" style="width: 700px;">
          <AccountsTabPanels class="q-ml-lg-lg"></AccountsTabPanels>
        </div>
      </div>
      <h3>Transactions Overview </h3>
      <TransactionTabPanels class="q-ml-lg-lg"></TransactionTabPanels>
    </div>
    <div v-else>
      <h2>Not logged in</h2>
      <q-btn color="primary" label="Login" @click="this.$router.push('/')" />
    </div>
  </q-page>
</template>

<script>
import AccountsTabPanels from 'components/HomePage/AccountsTabPanels.vue';
import { useUserSessionStore } from 'stores/userSession';
import TransactionTabPanels from 'components/transactions/TransactionTabPanels.vue';

export default {
  name: 'LoggedUserOverViewPage',
  setup() {
    return {
      userSessionStore: useUserSessionStore(),
    };
  },
  components: {
    AccountsTabPanels,
    TransactionTabPanels,
  },
  data() {
    return {};
  },
  methods: {},
};
</script>

<style scoped></style>

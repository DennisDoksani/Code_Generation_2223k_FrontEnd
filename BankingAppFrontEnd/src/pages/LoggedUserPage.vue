<template>
  <q-page class="flex flex-center">
    <div class="q-pa-md">
      <h1>Welcome Bijay</h1>
      <div class="row">
        <div class="q-gutter-y-md" style="width: 700px; margin-left: 400px;">
          <AccountsTabPanels class="q-ml-lg-lg"></AccountsTabPanels>
        </div>
      </div>
      <h2>Place for Transactions</h2>
      <!--<TransactionTable></TransactionTable>-->
    </div>
  </q-page>
</template>

<script>
import AccountsTabPanels from 'components/HomePage/AccountsTabPanels.vue';
//import TransactionTable from 'src/components/transactions/TransactionTabPanels.vue';

export default {
  name: 'LoggedUserOverViewPage',
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

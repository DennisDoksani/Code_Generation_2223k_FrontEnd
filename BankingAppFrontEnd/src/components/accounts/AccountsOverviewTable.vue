<template>
  <q-table
    :rows="accounts"
    row-key="iban"
    :rows-per-page-options="[5, 10, 15]"
    v-model:pagination="pagination"
    :columns="columns"
  >

    <template v-slot:top-right>
      <q-select v-model="accountType" :options="accountTypes" label="Account Type"></q-select>
    </template>

    <template v-slot:body-cell-action="props">
      <q-btn
        :color="props.row.account.isActive ? 'negative' : 'positive'"
        @click="toggleAccountStatus(props.row)"
        :label="props.row.account.isActive ? 'Disable' : 'Enable'"
      ></q-btn>
    </template>
  </q-table>
</template>

<script>

import axios from "/axios-auth.js";

export default {
  name: "AccountsOverviewTable",
  data() {
    return {
      accounts: [],
      pagination: {
        page: 1,
        rowsPerPage: 5
      },
      columns: [
        { name: "iban", required: true, label: "IBAN", align: "left", field: "iban" },
        {
          name: "accountHolder",
          required: true,
          label: "Account Holder",
          align: "left",
          field: "accountHolder"
        },
        { name: "isActive", required: true, label: "Active", align: "left", field: "isActive" },
        {
          name: "accountType",
          required: true,
          label: "Account Type",
          align: "left",
          field: "accountType"
        },
        {
          name: "accountHolder.transactionLimit",
          required: true,
          label: "Transaction Limit",
          align: "left",
          field: "accountHolder.transactionLimit"
        },
        {
          name: "accountBalance",
          required: true,
          label: "Account Balance",
          align: "left",
          field: "accountBalance"
        },
        {
          name: "accountHolder.dayLimit",
          required: true,
          label: "Day Limit",
          align: "left",
          field: "accountHolder.dayLimit"
        },

      ],
      accountType: "Savings",
      accountTypes: ["Savings", "Current"]
    };
  },
  mounted() {
    this.fetchAccounts();
  },
  methods: {
    toggleAccountStatus(row) {
      console.log(row);
    },
    onButtonClick(row) {
      // TODO: Implement button click logic for each row
    },
    fetchAccounts() {
      axios.get("/accounts")
        .then(response => {
          this.accounts = response.data;
          console.log(this.accounts);

      });
    }

  }
};


</script>

<style scoped>

</style>

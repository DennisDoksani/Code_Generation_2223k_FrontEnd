<template>
  <q-table
    :rows="accounts"
    row-key="iban"
    :rows-per-page-options="[5, 10, 15]"
    v-model:pagination="pagination"
    :columns="columns"
  >
    <template v-slot:top-left>
      <q-select v-model="accountType" :options="accountTypes" label="Account Type"></q-select>
    </template>

    <template v-slot:body-cell-action="props">

      <q-btn
        :color="props.row.isActive ? 'negative' : 'positive'"
        :label="props.row.isActive ? 'Disable' : 'Enable'"
        @click="toggleAccountStatus(props.row)"
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
        rowsPerPage: 50
      },
      columns: [
        { name: "iban", required: true, label: "IBAN", align: "left", field: "iban" },
        {
          name: "name",
          required: true,
          label: "Account Holder",
          align: "left",
          field: row=>row.accountHolder.firstName+" "+row.accountHolder.lastName
        },
        { name: "isActive", required: true, label: "Active",
          align: "left", field: row => row.isActive ? 'Yes' : 'No'
        },
        {
          name: "accountType",
          required: true,
          label: "Account Type",
          align: "left",
          field: "accountType"
        },
        {
          name: "transactionLimit",
          required: true,
          label: "Transaction Limit",
          align: "left",
          field: row => row.accountHolder.transactionLimit.toFixed(2)
        },
        {
          name: "accountBalance",
          required: true,
          label: "Account Balance",
          align: "left",
          field: row => row.accountBalance.toFixed(2)
        },
        {
          name: "dayLimit",
          required: true,
          label: "Day Limit",
          align: "left",
          field: row => row.accountHolder.dayLimit.toFixed(2)
        },
        { name: "action", required: true, label: "Action", align: "left", field: "action" }
      ],
      accountType: "",
      accountTypes: ["Savings", "Current"]
    };
  },
  mounted() {
    this.fetchAccounts();
  },
  methods:{
    toggleAccountStatus(row) {
      console.log(row);
    },
    fetchAccounts() {
      axios.get("/accounts")
        .then(response => {
          this.accounts = response.data;
        });
    }
  }
};
</script>

<style scoped>

</style>

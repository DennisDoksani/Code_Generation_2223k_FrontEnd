<template>
  <div class="q-pa-md">
    <q-markup-table
    >
      <div >
        <q-input
          v-model="search"
          label="Search"
        ></q-input>
        <q-select
          label="Select"
          options:accountTypes="accountTypes"
          :multiple="false"
          v-model="accountType"
        ></q-select>
        <q-btn
          color="primary"
          label="Filter"
          @click="filterAccounts()"
        ></q-btn>
      </div>
      <thead>
      <tr>
        <th class="text-left">IBAN</th>
        <th class="text-right">Full Name</th>
        <th class="text-right">Active</th>
        <th class="text-right">Account Type</th>
        <th class="text-right">Transaction Limit</th>
        <th class="text-right">Account Balance</th>
        <th class="text-right">Day Limit</th>
        <th class="text-right">Action</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="account in accounts" v-bind:key="account.iban">
        <td class="text-left">{{ account.iban }}</td>
        <td class="text-right">{{ account.accountHolder.firstName }} {{ account.accountHolder.lastName }}</td>
        <td class="text-right">{{ account.isActive ? "Yes" : "No" }}</td>
        <td class="text-right">{{ account.accountType }}</td>
        <td class="text-right">{{ account.accountHolder.transactionLimit.toFixed(2) }}</td>
        <td class="text-right">{{ account.accountBalance.toFixed(2) }}</td>
        <td class="text-right">{{ account.accountHolder.dayLimit.toFixed(2) }}</td>
        <td class="text-right">
          <q-btn
            :color="account.isActive ? 'negative' : 'positive'"
            :label="account.isActive ? 'Disable' : 'Enable'"
            @click="toggleAccountStatus(account)"
          ></q-btn>
        </td>
      </tr>
      </tbody>
    </q-markup-table>

  </div>

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
        rowsPerPage: 10
      },
      accountType: "",
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
    fetchAccounts() {
      const limit = this.pagination.rowsPerPage;
      const offset = (this.pagination.page - 1) * limit;

      axios.get("/accounts", {
        params: {
          limit: limit,
          offset: offset
        }
      })
        .then(response => {
          this.accounts = response.data;
        });
    },
    filterAccounts() {
      this.fetchAccounts();
    }
  }
};
</script>

<style scoped>

</style>

<template>
  <div class="q-pa-md">
    <div style="display: flex; align-items: center;">
      <div style="flex: 1;">
        <q-input v-model="search" label="Search By IBAN" dense class="search-input"
                 @update:model-value="searchBoxTextChanged"
                 lazy-rules
                 :rules="[val => val.length<19 || 'Iban cannot be more than 18 characters']"
        />
      </div>
      <div>
        <q-select borderless v-model="accountType" :options="accountTypes" label="Sort Accounts"
                  class="sorting-select"
                  @update:model-value="sortAccounts"></q-select>
      </div>
    </div>
    <q-markup-table
    >
      <thead>
      <tr>
        <th class="text-left">IBAN</th>
        <th class="text-right">Full Name</th>
        <th class="text-right">Active</th>
        <th class="text-right">Account Type</th>
        <th class="text-right">Transaction Limit</th>
        <th class="text-right">Account Balance</th>
        <th class="text-right">Day Limit</th>
        <th class="q-pa-r-md">Action</th>
      </tr>
      </thead>
      <tbody>
      <template v-if="filteredAccounts.length === 0">
        <tr>
          <td colspan="5" class="text-center">No Accounts with Bank at the moment</td>
        </tr>
      </template>
      <template v-else-if="searchingAccountNotfound">
        <tr>
          <td colspan="5" class="text-center">No Account Found with Iban
            {{ this.search }}
          </td>
        </tr>
      </template>
      <template v-else>
        <tr v-for="account in filteredAccounts" v-bind:key="account.iban">
          <TableRow :account="account"
                    @UpdatedStatusSuccessFully="accountUpdatedSuccessFully"></TableRow>
        </tr>
      </template>
      </tbody>
    </q-markup-table>
    <!-- Pagination controls -->
    <div class="pagination-controls float-right q-pa-sm">
      <q-btn @click="previousPage" :disable="this.pagination.page === 1"
             label="Previous"></q-btn>
      <q-btn @click="nextPage" :disable="filteredAccounts.length!==this.pagination.rowsPerPage"
             label="Next"></q-btn>
    </div>
  </div>
</template>

<script>
import axios from "/axios-basis.js";
import TableRow from 'components/accounts/TableRow.vue';
import {AccountTypes} from 'app/ConstantsContainer';

export default {
  name: 'AccountsOverviewTable',
  components: {
    TableRow,
  },
  data() {
    return {
      accounts: [],
      pagination: {
        page: 1,
        rowsPerPage: 10,
      },
      accountType: '',
      accountTypes: AccountTypes,
      search: '',
      currentUrl: '',
      defaultAccountUrl: '/accounts',
      defaultAccountSortingUrl: '?accountType=',
      searchingAccountNotfound: false,
    };
  },
  mounted() {
    this.currentUrl = this.defaultAccountUrl;
    this.fetchAccounts();
  },
  computed: {
    filteredAccounts() {
      if (!Array.isArray(this.accounts)) {
        return [this.accounts]; // Convert the variable to a single-element array
      }
      return this.accounts; // Return the variable as it is, as it's already an array
    },
  },
  methods: {
    accountUpdatedSuccessFully() {
      this.fetchAccounts();
    },
    fetchAccounts() {
      const limit = this.pagination.rowsPerPage;
      const offset = (this.pagination.page - 1) * limit;
      this.$emit('loading', true);

      axios.get(this.currentUrl, {
        params: {
          limit: limit,
          offset: offset,
        },
      }).then(response => {
        this.accounts = response.data;
        this.searchingAccountNotfound = false;
        this.$emit('loading', false);
      }).catch(error => {
        error.response.status === 404 ? this.searchingAccountNotfound = true :
          this.searchingAccountNotfound = false;
        if (error.response.status === 401)
          this.$emit('unAuthorised');
        if (error.response.status === 403)
          this.$emit('forbidden');
        this.$emit('loading', false);
      });
    },
    searchBoxTextChanged() {
      if (this.search.length >= 18) {
        console.log(this.search);
        this.currentUrl = this.defaultAccountUrl + '/' + this.search;
      } else
        this.currentUrl = this.defaultAccountUrl;
      this.fetchAccounts();
    },
    sortAccounts() {
      this.pagination.page = 1;
      this.currentUrl = this.defaultAccountUrl + this.defaultAccountSortingUrl + this.accountType;
      this.fetchAccounts();
    },
    previousPage() {
      this.pagination.page--;
      this.fetchAccounts();
    },
    nextPage() {
      this.pagination.page++;
      this.fetchAccounts();
    },
  },
};
</script>

<style>
.search-input {
  max-width: 700px; /* Adjust the value as per your preference */
}

.sorting-select {
  min-width: 400px; /* Adjust the value as per your preference */
}
</style>


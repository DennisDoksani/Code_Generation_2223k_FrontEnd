<template>
    <div class="q-pa-md">
      <div style="display: flex; align-items: center;">
        <div style="flex: 1;">
          <q-input v-model="search" label="Search By ID" dense class="search-input"
                   @update:model-value="searchBoxTextChanged"
                   lazy-rules
                   :rules="[val => val.length<19 || 'ID cannot be more than 65 characters']"
          />
        </div>
        <div>
          <q-select borderless v-model="userType" :options="userTypes" label="Sort Users"
                    class="sorting-select"
                    @update:model-value="sortUsers"></q-select>
        </div>
      </div>
      <q-markup-table
      >
        <thead>
        <tr>
          <th class="text-left">ID</th>
          <th class="text-right">First Name</th>
          <th class="text-right">Last Name</th>
          <th class="text-right">Birth Date</th>
          <th class="text-right">Phone Number</th>
          <th class="text-right">Email</th>
          <th class="text-right">Active</th>
          <th class="text-right">Day Limit</th>
          <th class="text-right">Transaction Limit</th>
        </tr>
        </thead>
        <tbody>
        <template v-if="filteredUsers.length === 0">
          <tr>
            <td colspan="5" class="text-center">No Users with Bank Accounts at the moment</td>
          </tr>
        </template>
        <template v-else-if="searchingUserNotfound">
          <tr>
            <td colspan="5" class="text-center">No Users Found with ID
              {{ this.search }}
            </td>
          </tr>
        </template>
        <template v-else>
          <tr v-for="user in filteredUsers" v-bind:key="user.id">
                      <!--Do I keep the UpdatedStatusSuccessFully??? line 48-->
            <TableRow :user="user"
                      @UpdatedStatusSuccessFully="userUpdatedSuccessFully"></TableRow>
          </tr>
        </template>
        </tbody>
      </q-markup-table>
      <!-- Pagination controls -->
      <div class="pagination-controls float-right q-pa-sm">
        <q-btn @click="previousPage" :disable="this.pagination.page === 1"
               label="Previous"></q-btn>
        <q-btn @click="nextPage" :disable="filteredUsers.length!==this.pagination.rowsPerPage"
               label="Next"></q-btn>
      </div>
    </div>
  </template>

<script>
// import axios from '/axios-auth.js';
import TableRow from 'components/users/TableRow.vue';
import {UserTypes} from 'app/ConstantsContainer';

export default {
  name: 'UsersOverviewTable',
  components: {
    TableRow,
  },
  data() {
    return {
      users: [],
      pagination: {
        page: 1,
        rowsPerPage: 10,
      },
      userType: '',
      userTypes: UserTypes,
      search: '',
      currentUrl: '',
      defaultUserUrl: '/users',
      defaultUserSortingUrl: '?userType=',
      searchingUserNotfound: false,
    };
  },
  mounted() {
    this.currentUrl = this.defaultUserUrl;
    this.fetchUsers();
  },
  computed: {
    filteredUsers() {
      if (!Array.isArray(this.users)) {
        return [this.users]; // Convert the variable to a single-element array
      }
      return this.users; // Return the variable as it is, as it's already an array
    },
  },
  methods: {
    userUpdatedSuccessFully() {
      this.fetchUsers();
    },
    fetchUsers() {
      const limit = this.pagination.rowsPerPage;
      const offset = (this.pagination.page - 1) * limit;
      this.$emit('loading', true);

      axios.get(this.currentUrl, {
        params: {
          limit: limit,
          offset: offset,
        },
      }).then(response => {
        this.users = response.data;
        this.searchingUserNotfound = false;
        this.$emit('loading', false);
      }).catch(error => {
        error.response.status === 404 ? this.searchingUserNotfound = true :
          this.searchingUserNotfound = false;
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
        this.currentUrl = this.defaultUserUrl + '/' + this.search;
      } else
        this.currentUrl = this.defaultUserUrl;
      this.fetchUsers();
    },
    sortUsers() {
      this.pagination.page = 1;
      this.currentUrl = this.defaultUserUrl + this.defaultUserSortingUrl + this.userType;
      this.fetchUsers();
    },
    previousPage() {
      this.pagination.page--;
      this.fetchUsers();
    },
    nextPage() {
      this.pagination.page++;
      this.fetchUsers();
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

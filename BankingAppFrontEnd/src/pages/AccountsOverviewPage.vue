<template>
  <div class="q-pa-md">
    <h1>Accounts Overview</h1>
    <div class="q-pa-sm">
      <AccountsOverviewTable
        @unAuthorised="unAuthorised"
        @forbidden="forbidden"
      ></AccountsOverviewTable>
    </div>
  </div>
</template>


<script>
import AccountsOverviewTable from "components/accounts/AccountsOverviewTable.vue";
export default {
  name: "AccountsIndex",
  components: { AccountsOverviewTable },
  data() {
    return {
      isAuthorised: true,
      isForbidden: false,
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

</style>

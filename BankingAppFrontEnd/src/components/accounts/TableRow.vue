<template>
  <tr>
    <td>{{ account.iban}}</td>
    <td>{{ account.accountHolder.firstName}}</td>
<!--//TODO: Later on -->
    <td>{{ account.isActive }}</td>
    <td>{{ account.accountType }}</td>
    <td>{{ account.accountHolder.transactionLimit.toFixed(2) }}</td>
    <td>{{account.accountBalance}}</td>
    <td>{{account.accountHolder.dayLimit}}</td>
    <td>
      <button v-if="account.isActive" class="btn btn-danger" >
       Disable
      </button>
      <button v-else class="btn btn-success" >
        Enable
      </button>
    </td>
  </tr>
</template>

<script>
export default {
  name: "TableRow",
  props: {
    account: Object
  }
};
</script>

<style scoped>

</style>

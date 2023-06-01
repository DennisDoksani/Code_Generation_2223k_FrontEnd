<template>
  <td class="text-left">{{ account.iban }}</td>
  <td class="text-right">{{ account.accountHolder.firstName }} {{ account.accountHolder.lastName }}</td>
  <td class="text-right">{{ account.isActive ? 'Yes' : 'No' }}</td>
  <td class="text-right">{{ account.accountType }}</td>
  <td class="text-right">{{ account.accountHolder.transactionLimit.toFixed(2) }}</td>
  <td class="text-right">{{ account.accountBalance.toFixed(2) }}</td>
  <td class="text-right">{{ account.accountHolder.dayLimit.toFixed(2) }}</td>
  <td class="text-right">
    <q-btn
      :color="account.isActive ? 'negative' : 'positive'"
      :label="account.isActive ? 'Deactivate' : 'Activate'"
      @click="updateStatus(account.isActive, account.iban)"
      class="q-ma-md"
    ></q-btn>

    <q-btn
      color="primary"
      label="Edit"
      @click="updateAccountDetails(account.iban)"
      class="q-ma-md"
    ></q-btn>

  </td>
</template>

<script>
import axios from '/axios-auth.js';

export default {
  name: 'TableRow',
  props: {
    account: {
      type: Object,
      required: true,
    },
  },
  methods: {
    updateStatus(isActive, iban) {
      this.$q.dialog({
        title: 'Account ' + (isActive ? 'Deactivation' : 'Activation'),
        message: 'Are you sure you want ' + (isActive ? 'deactivate' : 'activate') + ' this account ?',
        cancel: true,
        persistent: true,
      }).onOk(() => {
        this.sendUpdateRequest(isActive, iban);
      });
    },
    updateAccountDetails(iban) {
      // this.$router.push({name: 'AccountDetails', params: {iban: iban}});
    },
    sendUpdateRequest(isActive, iban) {
      axios.post('/accounts/accountStatus/' + iban, {
        isActive: !isActive,
      }).then(() => {
        this.$q.notify({
          color: isActive ? 'negative' : 'positive',
          message: 'Account status ' +(isActive ? 'deactivated' : 'activated')+ ' successfully',
        });
        this.$emit('UpdatedStatusSuccessFully');
      }).catch((error) => {
        this.$q.notify({
          color: 'negative',
          message: error.data.message, //Todo: verify
        });
      });
    },
  },
};
</script>

<style scoped>

</style>

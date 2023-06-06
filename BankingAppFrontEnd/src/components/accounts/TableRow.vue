<template>
  <td class="text-left">{{ account.iban }}</td>
  <td class="text-right">{{ account.accountHolder.firstName }} {{ account.accountHolder.lastName }}</td>
  <td class="text-right">{{ account.active ? 'Yes' : 'No' }}</td>
  <td class="text-right">{{ account.accountType }}</td>
  <td class="text-right">€ {{ account.absoluteLimit.toFixed(2) }}</td>
  <td class="text-right">€ {{ account.accountHolder.transactionLimit.toFixed(2) }}</td>
  <td class="text-right">€ {{ account.accountBalance.toFixed(2) }}</td>
  <td class="text-right">€ {{ account.accountHolder.dayLimit.toFixed(2) }}</td>
  <td class="text-right">
    <q-btn
      :color="account.active ? 'negative' : 'positive'"
      :label="account.active ? 'Deactivate' : 'Activate'"
      @click="updateStatus(account.active, account.iban)"
      class="q-ma-md"
    ></q-btn>

    <q-btn
      color="primary"
      label="Edit"
      @click="updateAccountDetails(account.iban)"
      class="q-ma-md"
    ></q-btn>

  </td>
  <div v-if="dialogVisible">
    <UpdatingAccountDetails :selectedIban="selectedIban"
                            @closeDialogue="onDialogueClose"
                            @updatedAccountSuccessfully="onUpdatedSuccessFully"
                            v-if="selectedIban.length !==0">
    </UpdatingAccountDetails>
  </div>
</template>

<script>
import axios from '/axios-basis.js';
import UpdatingAccountDetails from 'components/accounts/UpdatingAccountDetails.vue';

export default {
  name: 'TableRow',
  components: {
    UpdatingAccountDetails,
  },
  data() {
    return {
      dialogVisible: false,
      selectedIban: '',
    };
  },
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
      this.dialogVisible = true;
      this.selectedIban = iban;
    },
    sendUpdateRequest(isActive, iban) {
      axios.post('/accounts/accountStatus/' + iban, {
        isActive: !isActive,
      }).then(() => {
        this.$q.notify({
          color: isActive ? 'negative' : 'positive',
          message: 'Account status ' + (isActive ? 'deactivated' : 'activated') + ' successfully',
        });
        this.$emit('UpdatedStatusSuccessFully');
      }).catch((error) => {
        this.$q.notify({
          color: 'negative',
          message: error.data.message, //Todo: verify
        });
      });
    },
    onUpdatedSuccessFully(){
      this.onDialogueClose();
      this.$emit('UpdatedStatusSuccessFully');
    },
    onDialogueClose() {
      this.dialogVisible = false;
      this.selectedIban = '';
    },
  },
};
</script>

<style scoped>

</style>

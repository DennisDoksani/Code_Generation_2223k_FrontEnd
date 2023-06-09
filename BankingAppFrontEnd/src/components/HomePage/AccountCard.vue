<template>
  <div class="">
    <q-card>
      <q-card-section class="q-pa-md d-flex flex-column align-center">
        <div class="row q-col-gutter-md">
          <div class="col-6 q-pt-lg-xl q-pb-lg-xl">
            <div class="text-h5 q-pt-lg-xl" style="font-size: 25px;">{{ account.iban }}</div>
          </div>
          <div class="col-6 q-pt-lg-xs">
            <div class="text-h4 text-right text-bold q-pt-lg">€{{ account.accountBalance.toFixed(2) }}</div>
          </div>
        </div>
        <div class="row q-col-gutter-md q-pt-xs">
          <div class="col-4">
            <div class="text-subtitle">Created on:</div>
            <div class="text-bold"> {{ account.creationDate }}</div>
          </div>
          <div class="col-4">
            <div class="text-subtitle">Absolute Limit:</div>
            <div class="text-bold">€{{ account.absoluteLimit.toFixed(2) }}</div>
          </div>
          <div class="col-4">
            <q-btn v-if="account.accountType == 'CURRENT'" label="ATM" color="secondary" class="q-mt-sm" @click="openAtm(account.iban)"/>
            <q-btn label="Transfer" color="amber-10" class="q-mt-sm" @click="this.$router.push('/transfer/' + account.iban)"/>
          </div>
          
        </div>
      </q-card-section>
      <div v-if="dialogVisible">
        <AtmPanel :selectedIban="selectedIban"
                            @closeDialogue="onDialogueClose"
                  @UpdateAccountBalance="UpdateAccountBalance"
                            v-if="selectedIban.length !==0">
        </AtmPanel>
  </div>
    </q-card>
  </div>
</template>

<script>
import AtmPanel from 'components/AtmPanel.vue';
export default {
  name: 'AccountCard',
  components: {
    AtmPanel
  },
  data() {
    return {
      dialogVisible: false,
      selectedIban: ''
    };
  },
  props: {
    account: {
      type: Object,
      required: true,
    },
  },
  methods: {
    openAtm(iban) {
      this.selectedIban = iban;
      this.dialogVisible = true;
    },
    onDialogueClose() {
      this.dialogVisible = false;
    },
    UpdateAccountBalance() {
      this.$emit('UpdateAccountBalance');
    },

  },
};
</script>

<style lang="scss" scoped></style>

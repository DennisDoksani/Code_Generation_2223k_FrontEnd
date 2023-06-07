<template>
  <q-dialog v-model="isVisible" no-backdrop-dismiss>
    <q-card class="q-pa-md">
      <q-card-section class="q-pa-md">
        <h4>ATM</h4>
        <h6>Selected account: {{ selectedIban }}</h6>
        <q-form>
          <q-input
            v-model="amount"
            label="Amount"
            lazy-rules
            :rules="[val => !!val || 'Please enter an amount',
            val => val > 0 || 'Amount must be greater than 0']"
            type = "number"
          />
          <q-btn label="Withdraw" color="secondary" class="q-ma-md" @click="withdraw()"/>
          <q-btn label="Deposit" color="amber" class="q-ma-md" @click="deposit()"/>
          <q-btn label="Cancel" color="grey" class="q-ma-md " @click="closeDialog()"/>
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
  import axios from '/axios-basis.js';
  export default {
    name: 'AtmPanel',
    props: {
      selectedIban: {
        type: String,
        required: true
      }
    },
    data () {
      return {
        amount: 0,
        isVisible: true
      }
    },
    methods: {
      closeDialog() {
        this.isVisible = false,
        this.$emit('closeDialogue');
      },

      deposit() {
        axios.post('/transactions/atm/deposit', {
          accountTo: this.selectedIban,
          amount: this.amount
        })
        .then(()=> {
          this.$q.notify({
            color: 'positive',
            message: 'Successfully deposited ' + this.amount + ' to account ' + this.selectedIban,
            icon: 'check',
            position: 'top'
          })
          this.$emit('UpdateAccountBalance' )
          this.$emit('closeDialogue')
        })
        .catch((error) => {
          this.$q.notify({
            color: 'negative',
            message: error.response.data.message || 'Deposit failed, try again later',
            icon: 'warning',
            position: 'top'
          })
          console.log(error.response);
        });
      },

      withdraw() {
          axios.post('/transactions/atm/withdraw', {
          accountFrom: this.selectedIban,
          amount: this.amount
        })
        .then(()=> {
          this.$q.notify({
            color: 'positive',
            message: 'Successfully withdrawn ' + this.amount + ' from account ' + this.selectedIban,
            icon: 'check',
            position: 'top'
          })
          this.$emit('UpdateAccountBalance')
          this.$emit('closeDialogue')
        })
        .catch((error) => {
          this.$q.notify({
            color: 'negative',
            message: error.response.data.message || 'Withdrawal failed, try again later',
            icon: 'warning',
            position: 'top'
          })
          console.log(error.response);
        });
      }
    }
  }
</script>

<style>
.q-card {
width: 100%
}
</style>

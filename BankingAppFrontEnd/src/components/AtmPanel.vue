<template>
    <q-card class="q-pa-md">
      <q-card-section>
        <q-form>
          <q-input
            v-model="amount"
            label="Amount"
            lazy-rules
            :rules="[val => !!val || 'Please enter an amount',
            val => val > 0 || 'Amount must be greater than 0']"
            type = "number"
          />
          <q-btn label="Withdraw" color="secondary" class="q-mt-md"/>
          <q-btn label="Deposit" color="red" class="q-mt-md"/>
        </q-form>
      </q-card-section>
    </q-card>
</template>

<script>
  import axios from '/axios-basis.js';
  export default {
    name: 'AtmPanel',
    props: {
      iban: {
        type: String,
        required: true
      }
    },
    data () {
      return {
        amount: 0,
      }
    },
    methods: {
    deposit() {
      axios.post('/atm/deposit', {
        accountFrom: this.iban,
        amount: this.amount
      })
      .then(()=> {
        this.$q.notify({
          color: 'positive',
          message: 'Successfully deposited' + this.amount + 'to account ' + this.iban,
          icon: 'check',
          position: 'top'
        })
      })
      .catch((error) => {
        this.$q.notify({
          color: 'negative',
          message: error.response.data.message || 'Deposit failed, try again later',
          icon: 'warning',
          position: 'top'
        })
        console.log(error);
      });
    },
    withdraw() {
        axios.post('/atm/withdraw', {
        accountTo: this.iban,
        amount: this.amount
      })
      .then(()=> {
        this.$q.notify({
          color: 'positive',
          message: 'Successfully withdrawn' + this.amount + 'from account ' + this.iban,
          icon: 'check',
          position: 'top'
        })
      })
      .catch((error) => {
        this.$q.notify({
          color: 'negative',
          message: error.response.data.message || 'Withdrawal failed, try again later',
          icon: 'warning',
          position: 'top'
        })
        console.log(error);
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
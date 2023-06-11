<template>
    <table>
        <tr>
            <th>Amount</th>
            <th>Account from</th>
            <th>Account to</th>
            <th>Date of transaction</th>
            <th>Time of transaction</th>
        </tr>
        <tr v-for="transaction in transactions" :key="transaction.transactionID">
            <td>€ {{ transaction.amount }}</td>
            <td>{{ transaction.accountFrom.iban }}</td>
            <td>{{ transaction.accountTo.iban }}</td>
            <td>{{ transaction.date }}</td>
            <td>{{ transaction.time.slice(0,5) }}</td>
        </tr>
    </table>
</template>

<script>
import axios from '/axios-basis.js';

export default {
    name: 'AccountsTransactionTable',
    data() {
        return {
            transactions: []
        }
    }, props: {
        iban: String
    },
    mounted() {
        this.getTransactionsForAccount()
    }, methods: {
        getTransactionsForAccount() {
            return new Promise((resolve, reject) => {
                axios.get('/transactions/account/' + this.iban)
                    .then((response) => {
                        this.transactions = response.data;
                        resolve();
                    }).catch((error) => {
                        if (error.response) {
                            this.$q.notify({
                                color: 'negative',
                                message: error.response.data.message,
                                icon: 'warning',
                                position: 'top'
                            })
                        }
                        else {
                            this.$q.notify({
                                color: 'negative',
                                message: 'Connection error',
                                icon: 'warning',
                                position: 'top'
                            })
                        }
                        console.log(error);
                        reject();
                    });
            })
        }
    }
}
</script>

<style></style>
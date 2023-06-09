<template>
    <table>
        <tr>
            <th>Amount</th>
            <th>Account from</th>
            <th>Account to</th>
        </tr>
        <tr v-for="transaction in transactions" :key="transaction.transactionID">
            <td>{{ transaction.amount }}</td>
            <td>{{ transaction.accountFrom }}</td>
            <td>{{ transaction.accountTo }}</td>
        </tr>

    </table>
</template>

<script>
import axios from '/axios-basis.js'

export default {
    name: 'TransactionTable',
    data() {
        return {
            transactions: [],
        }
    }, methods: {
        getTransactions() {
            return new Promise((resolve, reject) =>
                axios.get('/transactions')
                    .then((response) => {
                        this.transactions = response.data;
                        resolve();
                    }).catch((error) => {
                        console.log(error);
                        reject;
                    })
            )
        }
    }, mounted() {
        this.getTransactions()
    }

}
</script>

<style></style>
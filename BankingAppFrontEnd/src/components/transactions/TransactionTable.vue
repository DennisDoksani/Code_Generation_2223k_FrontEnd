<template>
    <button>Filter results</button>
    <q-form @submit="getTransactions">

    </q-form>
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
            <td>{{ transaction.timestamp }}</td>
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
            ibanTo: "NL01INHO0000000003",
            ibanFrom: null,
            amountMin: null,
            amountMax: null,
            dateBefore: null,
            dateAfter: null,
        }
    }, methods: {
        getTransactions() {
            return new Promise((resolve, reject) => {
                axios.get('/transactions?ibanTo=' + this.ibanTo)
                    .then((response) => {
                        this.transactions = response.data;
                        resolve();
                    }).catch((error) => {
                        console.log(error);
                        reject;
                    })
            })
        },
    }, mounted() {
        this.getTransactions()
    }

}
</script>

<style></style>
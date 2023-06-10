<template>
    <button type="button" @click="showFilters">Filter results</button>
    <q-form @submit="getTransactions" style="display: none" id="filter-window">
        <q-input v-model="ibanTo" label="Account to" lazy-rules :rules="['Enter IBAN of the receiving account']" />
        <q-input v-model="ibanFrom" label="Account from" lazy-rules
            :rules="['Enter IBAN of the account that transfered the money']" />
        <q-input v-model="amountMin" label="Minimum amount" lazy-rules
            :rules="['Enter the minimum amount of money transfered']" />
        <q-input v-model="amountMax" label="Maximum amount" lazy-rules
            :rules="['Enter the maximum amount of meney transfered']" />
        <q-input v-model="dateAfter" label="Made after" lazy-rules :rules="['Enter the date the transaction was made after',
            val => new Date(val) <= new Date() || 'Date can not be in the future']" type="date" />
        <q-input v-model="dateBefore" label="Made before" lazy-rules :rules="['Enter the date the transaction was made before',
            val => new Date(val) <= new Date() || 'Date can not be in the future']" type="date" />

        <q-btn type="submit" label="Filter" class="q-mt-md" />
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
            ibanTo: null,
            ibanFrom: null,
            amountMin: null,
            amountMax: null,
            dateBefore: null,
            dateAfter: null,
            requestString: '/transactions?'
        }
    }, methods: {
        getTransactions() {
            this.buildRequestString();

            return new Promise((resolve, reject) => {
                axios.get(this.requestString)
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
        }, buildRequestString() {
            this.requestString = '/transactions?';

            if (this.ibanTo != null && this.ibanTo != '')
                this.requestString += ('ibanTo=' + this.ibanTo)
            if (this.ibanFrom != null && this.ibanFrom != '')
                this.requestString += ('ibanFrom=' + this.ibanFrom)
            if (this.amountMin != null && this.amountMin != '')
                this.requestString += ('amountMin=' + this.amountMin)
            if (this.amountMax != null && this.amountMax != '')
                this.requestString += ('amountMax=' + this.amountMax)
            if (this.dateAfter != null)
                this.requestString += ('dateAfter=' + this.dateAfter)
            if (this.dateBefore != null)
                this.requestString += ('dateBefore=' + this.dateBefore)

            console.log(this.requestString);
        }, showFilters() {
            const filterWindow = document.getElementById('filter-window');
            filterWindow.style = 'display: block';
        }
    }, mounted() {
        this.getTransactions()
    }

}
</script>

<style></style>
<template>
    <h1>Transactions</h1>
    <TransactionTableVue></TransactionTableVue>
</template>

<script>
import TransactionTableVue from 'src/components/transactions/TransactionTable.vue';

export default {
    name: 'TransactionOverviewPage',
    components: {
        TransactionTableVue,
    }
}
</script>

<style></style>
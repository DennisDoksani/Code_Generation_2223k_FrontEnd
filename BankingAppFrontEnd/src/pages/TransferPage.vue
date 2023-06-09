<template>
    <div class="q-pa-md">
        <h1>Transfer</h1>

        <TransferCard :iban="iban"></TransferCard>

    </div>
</template>

<script>

import TransferCard from 'components/transactions/TransferCard.vue'

export default {
    name: 'TransferPage',
    components: {
        TransferCard
    },
    props: {
        iban: {
            type: String,
            required: true,
        }
    }
}
</script>

<style></style>
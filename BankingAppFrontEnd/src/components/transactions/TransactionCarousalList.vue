<template>
    <div>
        <q-carousel v-model="slide" transition-prev="scale" transition-next="scale" swipeable animated control-color="white"
            navigation padding infinite arrows height="220px" class="text-white shadow-1 rounded-borders q-pb-lg-lg">
            <q-carousel-slide v-for="(account, index) in accounts" :key="index" :name="index">
                <div class="q-flex q-items-center q-justify-center">
                    <AccountsTransactionTable :iban="account.iban"></AccountsTransactionTable>
                </div>
            </q-carousel-slide>
        </q-carousel>
    </div>
</template>

<script>
import { ref } from 'vue';
import AccountsTransactionTable from './AccountsTransactionTable.vue';

export default {
    setup() {
        return {
            slide: ref(0),
        };
    },
    name: 'TransactionCarousalList',
    props: {
        accounts: {
            type: Array,
            required: true,
        },
    }, components: {
        AccountsTransactionTable
    },
    data() {
        return {
            selectedAccount: {
                type: Object,
            },
        };
    },
    methods: {
        UpdateAccountBalance() {
            this.$emit('UpdateAccounts');
        },
    },
    mounted() {
        this.selectedAccount = this.accounts[0];
    },
}
</script>

<style scoped>
.q-carousel .q-carousel-slide {
    border: none;
}
</style>
<template>
    <h1>Transactions</h1>

    <q-page class="flex flex-center">
        <div class="q-pa-md" v-if="userSessionStore.isLoggedIn">

            <div class="row">
                <div class="q-gutter-y-md" style="width: 900px;">
                    <TransactionTableVue class="q-ml-lg-lg"></TransactionTableVue>
                </div>
            </div>
        </div>
        <div v-else>
            <h2>Not logged in</h2>
            <q-btn color="primary" label="Login" @click="this.$router.push('/')" />
        </div>
    </q-page>
</template>

<script>
import TransactionTableVue from 'src/components/transactions/TransactionTable.vue';
import { useUserSessionStore } from 'stores/userSession';

export default {
    name: 'TransactionOverviewPage',
    components: {
        TransactionTableVue,
    }, setup() {
        return {
            userSessionStore: useUserSessionStore(),
        };
    },
}
</script>

<style></style>
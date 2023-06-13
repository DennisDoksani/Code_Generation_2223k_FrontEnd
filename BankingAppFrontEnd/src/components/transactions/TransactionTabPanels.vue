<template>
    <div class="q-gutter-y-md" style="width: inherit">
        <q-card>
            <q-separator class="q-pt-lg-xl" style="margin-top: -25px" />
            <q-card-section>
                <q-tabs v-model="activeTab" dense class="text-grey" active-color="primary" indicator-color="primary"
                    align="justify" narrow-indicator>
                    <q-tab name="current" label="Current" />
                    <q-tab name="savings" label="Savings" />
                </q-tabs>
                <q-separator class="q-pt-lg-xl" />
                <q-tab-panels v-model="activeTab" animated>
                    <q-tab-panel name="current">
                        <div class="flex justify-center items-center" v-if="loading">
                            <q-spinner-gears size="150px"></q-spinner-gears>
                        </div>
                        <div v-else-if="currentAccounts.length === 0">
                            <h4>You dont have any Transactions with current Account</h4>
                        </div>
                        <div v-else>
                            <TransactionCarousalList :accounts="currentAccounts" />
                        </div>
                    </q-tab-panel>
                    <q-tab-panel name="savings">
                        <div class="flex justify-center items-center" v-if="loading">
                            <q-spinner-gears size="150px"></q-spinner-gears>
                        </div>
                        <div v-else-if="savingsAccounts.length !== 0">
                            <TransactionCarousalList :accounts="savingsAccounts" />
                        </div>
                        <div v-else>
                            <h4>You dont have any Transactions with current Account</h4>
                        </div>
                    </q-tab-panel>
                </q-tab-panels>
            </q-card-section>
        </q-card>
    </div>
</template>

<script>
import { AccountTypes } from 'app/ConstantsContainer';
import axios from '/axios-basis.js';
import { useUserSessionStore } from 'stores/userSession.js';
import TransactionCarousalList from './TransactionCarousalList.vue';

export default {
    name: 'transactionTabPanels',
    setup() {
        return {
            userSessionStore: useUserSessionStore(),
        };
    },
    components: {
        TransactionCarousalList,
    },
    methods: {
        UpdateAccountBalance() {
            this.fetchAccountsOfUser();
        },
        fetchAccountsOfUser() {
            return new Promise((resolve, reject) => {
                axios.get('/accounts/user/' + this.userSessionStore.getEmail,
                ).then((response) => {
                    this.accounts = response.data.accounts;
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
                }).finally(() => {
                    // Simulate loading for 2.5 seconds
                    setTimeout(() => {
                        this.loading = false;
                    }, 2500);
                });
            });
        },
    },
    data() {
        return {
            activeTab: 'current',
            AccountTypes: AccountTypes,
            accounts: null,
            accountHolderName: '',
            loggedUserEmail: 'employeecustomer@seed.com',
            transactedToday: '',
            totalBalanceWithAllAccounts: 0,
            loading: true,
            dayLimitOfUser: 0,
            loggedUserTransactionLimit: 0,
        };
    },
    mounted() {
        this.fetchAccountsOfUser();
    },
    computed: {
        savingsAccounts() {
            return this.accounts.filter((account) => {
                return account.accountType.toLowerCase() === 'savings';
            });
        },
        currentAccounts() {
            return this.accountsArray.filter((account) => {
                return account.accountType.toLowerCase() === 'current';
            });
        },
        accountsArray() {
            if (Array.isArray(this.accounts)) {
                return this.accounts;
            }
            return [this.accounts];
        },
    }
}
</script>

<style></style>

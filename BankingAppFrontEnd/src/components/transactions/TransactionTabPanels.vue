<template>
    <div class="q-gutter-y-md" style="width: inherit">
        <q-card>
            <q-card-section class="q-pa-md d-flex justify-between" style="min-height:160px; max-height: 300px">
                <div v-if="loading" class="flex justify-center items-center">
                    <q-spinner-gears size="90px"></q-spinner-gears>
                </div>
                <div class="row" v-else-if="accountHolderName.length !== 0">
                    <div class="col-6 text-left" style="margin-top: -40px">
                        <h4>{{ accountHolderName }}</h4>
                        <h5 class="text-subtitle" style="margin-top: -20px;">
                            Total Balance: <strong>€{{ totalBalanceWithAllAccounts.toFixed(2) }} </strong>
                        </h5>
                        <h6 class="text-subtitle1" style="margin-top: -40px;">
                            You have € {{ dayLimitLeft.toFixed(2) }} left for today</h6>
                        <h6 class="text-subtitle1" style="margin-top: -40px;">
                            Your transaction limit is € {{ loggedUserTransactionLimit.toFixed(2) }}
                        </h6>
                    </div>
                    <div class="col-6 text-right">
                        <q-knob show-value class="text-white q-ma-md" v-model="dayLimitLeftPercentage" size="100px"
                            :thickness="0.2" color="orange" center-color="grey-8" track-color="transparent" readonly>
                            {{ dayLimitLeftPercentage }}%
                        </q-knob>
                    </div>
                </div>
                <div v-else class="flex justify-center items-center">
                    <q-spinner-gears size="90px"></q-spinner-gears>
                </div>

            </q-card-section>

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
                            <h4>You dont have any current accounts</h4>
                        </div>
                        <div v-else>
                            <AccountCarousalList :accounts="currentAccounts" />
                        </div>
                    </q-tab-panel>
                    <q-tab-panel name="savings">
                        <div class="flex justify-center items-center" v-if="loading">
                            <q-spinner-gears size="150px"></q-spinner-gears>
                        </div>
                        <div v-else-if="savingsAccounts.length !== 0">
                            <AccountCarousalList :accounts="savingsAccounts" />
                        </div>
                        <div v-else>
                            <h4>You dont have any savings accounts</h4>
                        </div>
                    </q-tab-panel>
                </q-tab-panels>
            </q-card-section>
        </q-card>
    </div>
</template>

<script>
export default {
    name: 'transactionTabPanels',
    props: {

    }
}
</script>

<style></style>
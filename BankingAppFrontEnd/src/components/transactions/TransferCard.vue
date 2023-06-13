<template>
    <q-card class="" style="width:50%">

        <q-card-section class="q-pa-md">
            <q-form @submit="transfer">
                <h6> {{ this.iban }} </h6>
                <q-input v-model="amount" label="Amount" lazy-rules
                    :rules="[val => !!val || 'Enter the amount you want to transfer']" />
                <q-input v-model="accountTo" label="Receiver" lazy-rules
                    :rules="[val => !!val || 'Enter the account you want to transfer to']" />
                <br>
                <q-btn type="submit" color="green" label="Confirm transfer" class="q-mt-md" />
            </q-form>
        </q-card-section>
        <q-card-section class="q-pa-md">
                <q-select
                    style="min-width: 250px;"
                    label="Search account by customer name" 
                    v-model="selectedOption"
                    use-input 
                    clearable 
                    :options="options"
                    option-label="label"
                    option-value="iban"
                    option-key="iban"
                    @filter="searchAccounts"
                    @update:model-value="updateAccountField"
                >
                </q-select>
        </q-card-section>
            
            
        
        
    </q-card>
</template>

<script>

import axios from '/axios-basis.js';

export default {
    name: 'TransferCard',
    props: {
        iban: {
            type: String,
            required: true,
        }

    },
    data() {
        return {
            accountFrom: this.iban,
            accountTo: "",
            amount: 0.00,
            options: [],
            selectedOption: null,
        }
    },
    methods: {
        transfer() {
            axios
                .post("/transactions", {
                    amount: this.amount,
                    accountTo: this.accountTo,
                    accountFrom: this.accountFrom
                })
                .then((res) => {
                    this.$q.notify({
                        message: 'Transfer successful',
                        color: 'positive',
                        icon: 'check',
                        position: 'top'
                    })

                    this.$router.push("/overview");
                })
                .catch((error) => {
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
                });
        },
        searchAccounts(val, update) {
            console.log(val)
            if (!val) {
                this.options.value = []
                return
            }

            axios
                .get("/accounts/searchByCustomerName", {
                    params: {
                        customerName: val,
                        limit: 5
                    }
                })
                .then((response) => {
                    console.log(response.data);
                    const searchedAccounts = response.data;
                    for (const element of searchedAccounts) {
                        element.label = element.accountHolderName + " - " + element.iban;
                    }

                    update(() => {this.options = searchedAccounts})
                })
                .catch((error) => {
                    if (!error.response) {
                        this.$q.notify({
                            color: 'negative',
                            message: 'Connection error',
                            icon: 'warning',
                            position: 'top'
                        })
                    }
                    else{
                        console.log(error.response);
                    }
                });
        },
        updateAccountField() {
            if (this.selectedOption == null) {
                return;
            }
            console.log(this.selectedOption);
            this.accountTo = this.selectedOption.iban;
        }
    }
}
</script>
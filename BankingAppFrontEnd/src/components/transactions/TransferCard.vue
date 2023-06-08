<template>
    <div class="">
        <q-card>
            <q-card-section class="q-pa-md d-flex flex-column align-center">
                <q-form @submit="Transfer">
                    <div> {{ this.iban }} </div>
                    <q-input v-model="amount" label="Amount" />
                    <q-input v-model="accountTo" label="Receiver" lazy-rules
                        :rules="[val => !!val || 'Enter the account you want to transfer to']" />


                    <q-btn type="submit" label="Confirm transfer" class="q-mt-md" />
                </q-form>

            </q-card-section>
        </q-card>
    </div>
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

        }
    },
    methods: {
        Transfer() {
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
                .catch((error) => console.log(error));
        }
    }

}
</script>

<style></style>
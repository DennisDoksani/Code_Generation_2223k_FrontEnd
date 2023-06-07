<template>
    <div class="">
        <q-card>
            <q-card-section class="q-pa-md d-flex flex-column align-center">
                <q-form @submit="Transfer">
                    <div> {{ this.iban }} </div>
                    <q-input v-model="transaction.amount" label="Amount" />
                    <q-input v-model="transaction.accountTo" label="Receiver" lazy-rules
                        :rules="[val => !!val || 'Enter the account you want to transfer to']" />


                    <q-btn type="submit" label="Confirm transfer" class="q-mt-md" />
                </q-form>

            </q-card-section>
        </q-card>
    </div>
</template>

<script>

import axios from 'axios';

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
            transaction: {
                accountFrom: "NL01INHO0000000002",
                accountTo: "",
                amount: 0.00,
            },


        }
    },
    methods: {
        Transfer() {
            axios
                .post("http://localhost/transactions", this.transaction)
                .then((res) => {
                    console.log(res.data);
                    this.$refs.form.reset();
                    this.$router.push("/overview");
                })
                .catch((error) => console.log(error));
        }
    }

}
</script>

<style></style>
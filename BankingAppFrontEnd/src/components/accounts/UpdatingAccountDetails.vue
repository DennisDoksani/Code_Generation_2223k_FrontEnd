<template>
  <div>
    <q-dialog v-model="isVisible" no-backdrop-dismiss>
      <q-card class="q-pa-md">
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">Updating Account Details</div>
          <q-space />
          <q-btn icon="close" flat round dense @click="dialogCloseClicked" />
        </q-card-section>
        <q-separator />
        <q-form @submit="updateAccountClicked">
          <q-card-section>
            <div class="q-gutter-md q-pa-md" style="max-width: 900px">
              <div class="row q-col-gutter-md q-mb-md ">
                <div class="col-6">
                  <q-input outlined v-model="selectedAccount.iban" readonly label="IBAN" size="big" />
                </div>
                <div class="col-6">
                  <q-input outlined v-model="selectedAccount.accountType" label="Account Type" readonly />
                </div>
              </div>
              <div class="row q-col-gutter-md q-mb-md">
                <div class="col-6">
                  <q-input outlined v-model="selectedAccount.accountHolder.firstName"
                           label="First Name"
                           lazy-rules
                           :rules="[val => !!val || 'First name cannot be empty']"
                  />
                </div>
                <div class="col-6">
                  <q-input outlined v-model="selectedAccount.accountHolder.lastName"
                           label="Last Name"
                           lazy-rules
                           :rules="[val => !!val || 'Last name cannot be empty']"
                  />
                </div>
              </div>
              <div class="row q-col-gutter-md q-mb-md">
                <div class="col-6">
                  <q-input outlined v-model.number="selectedAccount.accountHolder.dayLimit"
                           type="number"
                           label="Day Limit" lazy-rules
                           :rules="[val => val>=0 || 'Day limit cannot be Negative',
                         val => val !=='' || 'Day limit cannot be empty']"
                  />
                </div>
                <div class="col-6">
                  <q-input outlined v-model.number="selectedAccount.accountHolder.transactionLimit"
                           type="number"
                           label="Transaction Limit"
                           lazy-rules
                           :rules="[val => val>=0 || 'Transaction limit cannot be Negative'
                         ,val => !!val || 'Transaction limit cannot be empty']"
                  />
                </div>
              </div>
              <div class="row q-col-gutter-md q-mb-md">
                <div class="col-6">
                  <q-input outlined
                           v-model.number="selectedAccount.absoluteLimit"
                           label="Absolute Limit"
                           lazy-rules
                           :rules="[val=>val !=='' || 'Absolute limit cannot be empty']"
                  />
                </div>
                <div class="col-6">
                  <q-toggle outlined v-model="selectedAccount.isActive" label="Account Status" />
                </div>
              </div>
              <div class="row q-col-gutter-md q-mb-md">
                <div class="col-6">
                  <q-input outlined v-model="selectedAccount.accountBalance" readonly label="Account Balance" />
                </div>
              </div>
            </div>
          </q-card-section>
          <q-card-actions align="right">
            <q-btn color="primary" label="Cancel" @click="cancelUpdating" />
            <q-btn color="primary" type="submit">
              <q-spinner v-if="showProgressBar" size="20px" color="white" />
              <div v-else>
                Update
              </div>
            </q-btn>
          </q-card-actions>
        </q-form>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import axios from '/axios-basis.js';
//import {AccountStatus} from 'app/ConstantsContainer';

export default {
  name: 'UpdatingAccountDetails',
  components: {},
  data() {
    return {
      isVisible: true,
      showProgressBar: false,
      selectedAccount: {
        iban: '',
        firstName: '',
        lastName: '',
        accountType: '',
        accountBalance: '',
        isActive: {
          type: Boolean,
        },
        absoluteLimit: '',
        accountHolder: {
          userId: '',
          firstName: '',
          lastName: '',
          dayLimit: '',
          transactionLimit: '',
        },
      },
    };
  },
  props: {
    selectedIban: {
      type: String,
      required: true,
    },
  },
  methods: {
    dialogCloseClicked() {
      this.$emit('closeDialogue');
    },
    fetchSelectedAccount() {
      axios.get('/accounts/' + this.selectedIban).then(response => {
        this.selectedAccount = response.data;
        this.selectedAccount.isActive = response.data.active;
      }).catch(error => {
        console.log(error);
      });
    },
    updateAccountClicked() {
      this.showProgressBar = true;
      setTimeout(() => {
        this.sendPutRequest();
      }, 2000);
    },
    sendPutRequest() {
      axios.put('/accounts/' + this.selectedIban, this.selectedAccount)
      .then(() => {
        this.$q.notify({
          color: 'positive',
          message: 'Account create successfully',
          icon: 'check',
        });
        this.selectedAccount = null;
        this.$emit('updatedAccountSuccessfully');
      }).catch(error => {
        if (error.response.status === 404) {
          this.$q.notify({
            color: 'negative',
            message: error.response.data.message,
            icon: 'report_problem',
          });
        }
        if (error.response.status === 400) {
          this.$q.notify({
            color: 'Warning',
            message: error.response.data.message,
            icon: 'report_problem',
          });
        }
      });
      this.showProgressBar = false;
    },
    cancelUpdating() {
      this.selectedAccount = null;
      this.$emit('closeDialogue');
    },
  },
  mounted() {
    this.fetchSelectedAccount();
  },
};
</script>

<style scoped>
.q-input {
  width: 200px; /* Adjust the desired height */

}

</style>

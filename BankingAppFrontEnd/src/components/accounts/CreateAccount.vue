<template>
  <div>
    <q-dialog v-model="isVisible" no-backdrop-dismiss>
      <q-card class="q-pa-md">
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">Create an Account For {{ accountHolderFirstName }}</div>
          <q-space />
          <q-btn icon="close" flat round dense @click="dialogCloseClicked" />
        </q-card-section>
        <q-separator />
        <q-form @submit="createNewAccountClicked">
          <q-card-section>
            <div class="q-gutter-md q-pa-md" style="max-width: 900px">
              <div class="row q-col-gutter-md q-mb-md">
                <div class="col-6">
                  <q-input outlined
                           label="First Name"
                           v-model="accountHolderFirstName"
                           readonly
                  />
                </div>
                <div class="col-6">
                  <q-input outlined
                           label="Last Name"
                           v-model="accountHolderLastName"
                           readonly
                  />
                </div>
              </div>
              <div class="row q-col-gutter-md q-mb-md ">
                <div class="col-6">
                  <q-select outlined v-model="accountType"
                            :options="accountTypes"
                            label="Account Type"
                            lazy-rules
                            :rules="[val => !!val || 'Account type cannot be empty']"
                  />
                </div>
                <div class="col-6">
                  <q-input outlined v-model.number="dayLimit"
                           type="number"
                           label="Day Limit" lazy-rules
                           :rules="[val => val>= 0 || 'Day limit cannot be Negative',
                         val => val !=='' || 'Day limit cannot be empty']"
                  />
                </div>
              </div>
              <div class="row q-col-gutter-md q-mb-sm">
                <div class="col-6">
                  <q-input outlined v-model.number="transactionLimit"
                           type="number"
                           label="Transaction Limit"
                           min="0"
                           lazy-rules
                           :rules="[val => val>=0 || 'Transaction limit cannot be Negative',
                         val => val !=='' || 'Transaction limit cannot be empty']"
                           step="any"
                  />
                </div>
              </div>
              <div class="row q-col-gutter-md q-mb-md q-ml-xs">
                <q-banner dense rounded class="text-white  col" style="background-color: #dc3545"
                          v-if="errorMessage.length!==0">
                  {{ errorMessage }}
                </q-banner>
              </div>
            </div>
          </q-card-section>
          <q-card-actions align="right">
            <q-btn color="primary" label="Cancel" />
            <q-btn color="primary" type="submit">
              <q-spinner v-if="showProgressBar" size="20px" color="white" />
              <div v-else>
                Create
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
import {AccountTypes} from 'app/ConstantsContainer';
import {useUserSessionStore} from 'stores/userSession';

export default {
  name: 'CreateAccount',
  setup() {
    const userSessionStore = useUserSessionStore();
    return {
      userSessionStore,
    };
  },
  data() {
    return {
      errorMessage: '',
      isVisible: true,
      showProgressBar: false,
      userId: this.userSessionStore.getId, //TODO: for now
      accountType: null,
      accountTypes: AccountTypes,
      dayLimit: null,
      transactionLimit: null,
      accountHolderFirstName: null,
      accountHolderLastName: null,
    };
  },
  methods: {
    dialogCloseClicked() {
      this.isVisible = false;
      this.$emit('closeDialogue');
    },
    getUserById() {
      axios.get('/users/' + this.userId).then(response => {
        this.transactionLimit = response.data.transactionLimit;
        this.dayLimit = response.data.dayLimit;
        this.accountHolderFirstName = response.data.firstName;
        this.accountHolderLastName = response.data.lastName;
      }).catch(error => {
        console.log(error);
      });
    },
    createNewAccountClicked() {
      this.showProgressBar = true;
      setTimeout(() => {
        this.sendPostRequest();
      }, 2000);
    },
    sendPostRequest() {
      axios.post('/accounts', {
        accountHolderId: this.userId,
        accountType: this.accountType,
        dayLimit: this.dayLimit,
        transactionLimit: this.transactionLimit,
      }).then(() => {
        this.showProgressBar = false;
        this.$q.notify({
          color: 'positive',
          message: 'Account Created successfully',
          icon: 'check',
        });
        this.errorMessage = '';
        this.$emit('accountCreatedSuccessfully');
      }).catch(error => {
        this.showProgressBar = false;
        this.errorMessage = error.response.data.message;
      });
    },
  },
  mounted() {
    this.getUserById();
  },
};
</script>

<style scoped>

</style>

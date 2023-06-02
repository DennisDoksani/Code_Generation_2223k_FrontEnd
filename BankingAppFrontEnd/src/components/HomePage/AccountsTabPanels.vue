<template>
  <div class="q-gutter-y-md" style="max-width: 600px">
    <q-card>
      <q-tabs
        v-model="activeTab"
        dense
        class="text-grey"
        active-color="primary"
        indicator-color="primary"
        align="justify"
        narrow-indicator
      >
        <q-tab name="current" label="Current" />
        <q-tab name="savings" label="Savings" />
      </q-tabs>
        <q-tab-panels v-model="activeTab" animated>
          <q-tab-panel name="current">
            <AccountCarousalList  :accounts="currentAccounts" />
          </q-tab-panel>
          <q-tab-panel name="savings">
<!--            <AccountCarousalList-->
<!--              :accounts="savingsAccounts"-->
<!--            ></AccountCarousalList>-->
          </q-tab-panel>
        </q-tab-panels>
    </q-card>
  </div>
</template>

<script>
import {AccountTypes} from 'app/ConstantsContainer';
import AccountCarousalList from 'components/HomePage/AccountCarousalList.vue';
import axios from '/axios-basis.js';

export default {
  name: 'AccountsTabPanels',
  components: {
    AccountCarousalList,
  },
  methods: {
     async fetchAccountsOfUser() {
      axios.get('/accounts/user/'+this.loggedUser)
      .then((response) => {
        this.accounts = response.data;
        console.log(this.accounts);
      });
    },
  },
  data() {
    return {
      activeTab: 'current',
      AccountTypes: AccountTypes,
      accounts: null,
      loggedUser: 'josh@mf.com'
    };
  },
  mounted() {
    //this.fetchAccountsOfUser();
    const object1 = {
      iban: "NL49INHO0645589894",
      accountBalance: 0,
      absoluteLimit: 0,
      creationDate: "2023-06-02",
      isActive: true,
      accountType: "CURRENT",
      accountHolder: {
        userId: 1,
        dayLimit: 0,
        transactionLimit: 0,
        firstName: "Joshua",
        lastName: "Mf"
      }
    };
    const object2 = {
      iban: "NL49INHO0645589894",
      accountBalance: 0,
      absoluteLimit: 0,
      creationDate: "2023-06-02",
      isActive: true,
      accountType: "CURRENT",
      accountHolder: {
        userId: 1,
        dayLimit: 0,
        transactionLimit: 0,
        firstName: "John",
        lastName: "Doe"
      }
    };
    this.accounts = [object1, object2];
  },
  computed:{
    savings(){
      return this.accounts.filter((account) => {
        return account.accountType.toLowerCase() === 'savings';
      });
    },
    currentAccounts(){
      return this.accountsArray.filter((account) => {
        return account.accountType.toLowerCase() === 'current';
      });
    },
    accountsArray(){
      if(Array.isArray(this.accounts)){
        return this.accounts;
      }
      return [this.accounts];
    }
  }

};
</script>

<style scoped>

</style>

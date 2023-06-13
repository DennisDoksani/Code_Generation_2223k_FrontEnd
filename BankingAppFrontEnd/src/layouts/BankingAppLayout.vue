<template>
  <q-layout >
    <q-header elevated class="bg-green">
      <q-toolbar>
        <q-avatar size="80px">
          <q-icon name="account_balance" class="account_balance" />
        </q-avatar>
        <q-toolbar-title class="q-pt-lg" style="margin-left: -20px">
          BDRJ Bank
          <div class="text-subtitle1 " style="margin-top: -10px">Putting the 'fun' in funds</div>
        </q-toolbar-title>
        <q-btn v-if="userSessionStore.isLoggedIn" flat round dense icon="account_circle" label="Logout" size="20px"
               class="q-mt-lg" @click="logout" />
      </q-toolbar>
      <q-tabs v-model="activeTab" class="nav-tabs" align="center" dense active-color="bg-grey-8" indicator-color="bg-grey-8">
        <q-tab name="overview" label="Overview" @click="setActiveTab('overview')" />
        <q-tab name="accounts" label="Accounts" @click="setActiveTab('accounts')" />
        <q-tab name="users" label="Users" @click="setActiveTab('users')" />
        <q-tab name="transactions" label="Transactions" @click="setActiveTab('transactions')" />
      </q-tabs>
    </q-header>
    <div class="content-wrap">
      <q-page-container>
        <router-view class="q-mb-xl"/>
        <q-footer  class="bg-grey-8 text-white footer-flex q-pt-lg q-mt-auto">
          <q-toolbar class="toolbar-center">
            <div class="footer-content">
              <q-list inline dense separator class="q-mt-sm">
                <q-item clickable v-ripple @click="setActiveTab('overview')"><q-item-section>Overview</q-item-section></q-item>
                <q-item clickable v-ripple @click="setActiveTab('accounts')"><q-item-section>Accounts</q-item-section></q-item>
                <q-item clickable v-ripple @click="setActiveTab('users')"><q-item-section>Users</q-item-section></q-item>
                <q-item clickable v-ripple @click="setActiveTab('transactions')"><q-item-section>Transactions</q-item-section></q-item>
              </q-list>
              <div class="text-h6">© 2023 BDRJ Bank</div>
              <div class="text-caption">Contact: info@bdrjbank.com | +31 6810000000</div>
            </div>
          </q-toolbar>
        </q-footer>
      </q-page-container>
    </div>
  </q-layout>
</template>


<script>
import { defineComponent } from 'vue'
import { useUserSessionStore } from "stores/userSession";

export default defineComponent({
  name: 'MainLayout',
  data() {
    return {
      activeTab: '',  // Default active tab
      tabRoutes: {
        overview: '/overview',
        accounts: '/accounts',
        users: '/users',
        transactions: '/transactions'
      }
    };
  },
  methods: {
    setActiveTab(tab) {
      this.activeTab = tab;
      this.$router.push(this.tabRoutes[tab]); // Navigate to the corresponding route
    },
    logout() {
      this.$router.push({ path: '/' });
      this.userSessionStore.logout();
    }
  },
  setup() {
    return {
      userSessionStore: useUserSessionStore(),
    }
  }
})
</script>



<style scoped>
.nav-tabs {
  display: flex;
  justify-content: center;
  align-items: center;
}

.active {
  background: #c0c0c0;
  /* Change this to your preferred active tab color */
}

.bg-grey-8 {
  background-color: #333333;
}

.text-h6 {
  font-size: 1.25rem;
}

.text-caption {
  font-size: 0.875rem;
}

.q-list {
  display: flex;
  justify-content: center;
}

.footer-flex {
  display: flex;
  justify-content: center;
}

.toolbar-center {
  display: flex;
  justify-content: center;
  width: 100%;
}

.footer-content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.nav-tabs {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  overflow-y: auto;
}

.q-footer {
  height: 100px;
  overflow-y: auto;
}
</style>

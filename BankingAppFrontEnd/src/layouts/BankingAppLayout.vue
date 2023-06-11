<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="bg-green">
      <q-toolbar>
        <q-avatar size="80px">
          <q-icon name="account_balance" class="account_balance" />
        </q-avatar>
        <q-toolbar-title class="q-pt-lg" style="margin-left: -20px">
          BDRJ Bank
          <div class="text-subtitle1 " style="margin-top: -10px">Putting the 'fun' in funds</div>
        </q-toolbar-title>
        <q-btn v-if="userSessionStore.isLoggedIn" flat round dense icon="account_circle" label="Logout" size="20px" class="q-mt-lg" @click="logout" />
      </q-toolbar>
      <div class="nav-tabs" >
        <q-btn flat :class="{ active: activeTab === 'overview' }" label="overview" @click="setActiveTab('overview')" />
        <q-btn flat :class="{ active: activeTab === 'accounts' }" label="Accounts" @click="setActiveTab('accounts')" />
        <q-btn flat :class="{ active: activeTab === 'users' }" label="users" @click="setActiveTab('users')" />
      </div>
    </q-header>
    <div class="content-wrap">
      <q-page-container>
        <router-view />
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
    };
  },
  methods: {
    setActiveTab(tab) {
      this.activeTab = tab;
      this.$router.push(tab); // Change route to the selected tab
    },
    logout(){
      this.$router.push({ path: '/' });
      this.userSessionStore.logout();
    }
  },
  setup() {
    return{
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
  background: #c0c0c0; /* Change this to your preferred active tab color */
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

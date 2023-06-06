<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="bg-green">
      <q-toolbar>
        <q-avatar size="80px">
          <q-icon name="account_balance" class="account_balance" />
        </q-avatar>
        <q-toolbar-title class="q-pt-lg" style="margin-left: -20px">
          BDRJ Bank
          <div class="text-subtitle1 " style="margin-top: -10px">Putting Fun in Funds since 2023</div>
        </q-toolbar-title>
        <q-btn flat round dense icon="account_circle" size="30px" class="q-mt-lg" />
      </q-toolbar>
      <div class="nav-tabs" >
        <q-btn flat :class="{ active: activeTab === 'overview' }" label="overview" @click="setActiveTab('overview')" />
        <q-btn flat :class="{ active: activeTab === 'accounts' }" label="Accounts" @click="setActiveTab('accounts')" />
        <q-btn flat :class="{ active: activeTab === 'users' }" label="users" @click="setActiveTab('users')" />
      </div>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
    <h1>Footer mf</h1>
  </q-layout>
</template>

<script>
import {defineComponent} from 'vue';

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
    }
  }
});
</script>

<style scoped>
.active {
  background: #c0c0c0; /* Change this to your preferred active tab color */
}
</style>

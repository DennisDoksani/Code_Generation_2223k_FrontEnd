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
    <div class="content-wrap">
      <q-page-container>
        <router-view />
      </q-page-container>
      <q-footer elevated class="bg-grey-8 text-white footer-flex">
        <q-toolbar class="toolbar-center">
          <div class="footer-content">
            <q-list inline dense separator class="q-mt-md">
              <router-link to="/overview"><q-item clickable v-ripple><q-item-section>Overview</q-item-section></q-item></router-link>
              <router-link to="/accounts"><q-item clickable v-ripple><q-item-section>Accounts</q-item-section></q-item></router-link>
              <router-link to="/users"><q-item clickable v-ripple><q-item-section>Users</q-item-section></q-item></router-link>
            </q-list>
            <div class="text-h6">© 2023 BDRJ Bank</div>
            <div class="text-caption">Contact: info@bdrjbank.com | +1 800 123 4567</div>
          </div>
        </q-toolbar>
      </q-footer>
    </div>
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

</style>

<template>
  <q-tabs
    v-model="activeTab"
    dense
    class="text-grey"
    active-color="primary"
    indicator-color="primary"
    align="justify"
    narrow-indicator
  >
    <q-tab v-for="(type, index) in AccountTypes" :key="index" :label="type" />
  </q-tabs>
</template>

<script>
import {AccountTypes} from 'app/ConstantsContainer';

export default {
  name: 'AccountsTabPanels',
  methods: {},
  data() {
    return {
      activeTab: 0,
      AccountTypes: AccountTypes,
    };
  },

};
</script>

<style scoped>

</style>

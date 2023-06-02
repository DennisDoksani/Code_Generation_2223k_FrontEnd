<template>
  <div class="q-pa-md">
    <h1>Welcome Bijay</h1>
    <div class="q-gutter-y-md" style="max-width: 650px">
        <AccountsTabPanels></AccountsTabPanels>
    </div>
    <h2> Place for Transcations</h2>

  </div>
</template>

<script>
import AccountsTabPanels from 'components/HomePage/AccountsTabPanels.vue';


export default {
  name: 'LoggedUserOverViewPage',
  components: {
    AccountsTabPanels,

  },
  data() {
    return {};
  },
  methods: {},
};
</script>

<style scoped>

</style>

<template>
  <div class="q-pa-md">
    <h1>Welcome Bijay</h1>
    <div class="q-gutter-y-md" style="max-width: 600px">
        <AccountsTabPanels></AccountsTabPanels>
    </div>
  </div>
</template>

<script>
import {ref} from 'vue';
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

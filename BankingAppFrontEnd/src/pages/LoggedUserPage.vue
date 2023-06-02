<template>
  <div class="q-pa-md">
    <h1>Welcome Bijay</h1>
    <div class="q-gutter-y-md" style="max-width: 600px">
      <q-card>
        <q-tabs
          v-model="tab"
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
        <q-separator />
        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="current">
            <AccountCarousalList></AccountCarousalList>
            <q-spinner-gears size="250px"></q-spinner-gears>
          </q-tab-panel>
          <q-tab-panel name="savings">
            <div class="text-h6">Alarms</div>
            This is the alarms tab
          </q-tab-panel>
        </q-tab-panels>
      </q-card>

    </div>
  </div>
</template>

<script>
import {ref} from 'vue';
import AccountTabPanel from 'components/HomePage/AccountCarousalList.vue';

export default {
  setup() {
    return {
      tab: ref('current'),
    };
  },
  name: 'LoggedUserOverViewPage',
  components: {
    AccountCarousalList,
  },
  data() {
    return {};
  },
  methods: {},
};
</script>

<style scoped>

</style>

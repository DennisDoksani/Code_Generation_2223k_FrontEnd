<template>
  <div>
    <q-card>
      <q-card-section class="q-pa-md d-flex flex-column align-center">
        <div class="row q-col-gutter-md">
          <div class="col-6 q-pt-lg-xl q-pb-lg-xl">
            <div class="text-h5 q-pt-lg-xl" style="font-size: 25px;">{{ account.iban }}</div>
          </div>
          <div class="col-6 q-pt-lg-xs">
            <div class="text-h4 text-right text-bold q-pt-lg">€{{ account.accountBalance.toFixed(2) }}</div>
          </div>
        </div>
        <div class="row q-col-gutter-md q-pt-xs">
          <div class="col-6">
            <div class="text-subtitle">Transaction Limit:</div>
            <div>20</div>
          </div>
          <div class="col-6">
            <div class="text-subtitle">Absolute Limit:</div>
            <div>€{{ account.absoluteLimit.toFixed(2) }}</div>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
export default {
  name: 'AccountCard',
  components: {},
  data() {
    return {};
  },
  props: {
    account: {
      type: Object,
      required: true,
    },
  },
  methods: {},
};
</script>

<style lang="scss" scoped>

</style>

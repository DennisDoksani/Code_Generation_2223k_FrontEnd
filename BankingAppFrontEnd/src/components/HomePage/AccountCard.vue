<template>
  <div class="">
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
          <div class="col-4">
            <div class="text-subtitle">Created on:</div>
            <div class="text-bold"> {{ account.creationDate }}</div>
          </div>
          <div class="col-4">
            <div class="text-subtitle">Absolute Limit:</div>
            <div class="text-bold">€{{ account.absoluteLimit.toFixed(2) }}</div>
          </div>
          <button type="button" class="btn btn-primary mt-3 col-4"
            @click="this.$router.push('/transfer/' + account.iban);">
            Transfer
          </button>
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
  mounted() {
    console.log(this.account);
  }
};
</script>

<style lang="scss" scoped></style>

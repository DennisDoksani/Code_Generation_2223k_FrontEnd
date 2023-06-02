<template>
  <div>
    <q-carousel
      v-model="slide"
      transition-prev="scale"
      transition-next="scale"
      swipeable
      animated
      control-color="white"
      navigation
      padding
      infinite
      arrows
      height="300px"
      class=" text-white shadow-1 rounded-borders"
    >
      <q-carousel-slide
        v-for="account in accounts"
        :key="account.iban"
      >
        <AccountCard :account="account"></AccountCard>
      </q-carousel-slide>
    </q-carousel>
  </div>
</template>

<script>
import {ref} from 'vue';
import AccountCard from './AccountCard.vue';

export default {
  setup () {
    return {
      slide: ref('style'),
    }
  },
  name: 'AccountCarousalList',
  props: {
    accounts: {
      type: Array,
      required: true,
    },
  },
  components: {
    AccountCard,
  },
  data() {
    return {

    };
  },
  methods: {

  },
};
</script>

<style scoped>

</style>

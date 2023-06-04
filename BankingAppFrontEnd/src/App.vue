<template>
  <router-view />
</template>

<script>
import {defineComponent} from 'vue';
import {useUserSessionStore} from 'stores/userSession';

export default defineComponent({
  name: 'App',
  setup() {
    return {
      userSessionStore: useUserSessionStore(),
    };
  },
  mounted() {
    this.userSessionStore.localLogin();
  },
});
</script>

<template>
  <td class="text-left">{{ user.id }}</td>
  <td class="text-right">{{ user.bsn }}</td>
  <td class="text-right">{{ user.firstName }}</td>
  <td class="text-right">{{ user.lastName }}</td>
  <td class="text-right">{{ user.isActive ? 'Yes' : 'No' }}</td>
  <td class="text-right">€ {{ user.transactionLimit.toFixed(2) }}</td>
  <td class="text-right">€ {{ user.dayLimit.toFixed(2) }}</td>
  <td class="text-right">{{ user.dateOfBirth }}</td>
  <td class="text-right">{{ user.phoneNumber }}</td>
  <td class="text-right">{{ user.email }}</td>
  <td class="text-center">
    <q-btn color="negative" label="Delete" @click="deleteUser(user.id)" class="q-ma-md"></q-btn>
    <q-btn color="primary" label="Edit" @click="updateUserDetails(user.id)" class="q-ma-md"></q-btn>
  </td>
  <div v-if="dialogVisible">
    <UpdatingUserDetails :selectedID="selectedID" @closeDialogue="onDialogueClose"
      @updatedUserSuccessfully="onUpdatedSuccessFully" v-if="selectedID.length !== 0">
    </UpdatingUserDetails>
  </div>
</template>

<script>
import axios from '/axios-basis.js';
import UpdatingUserDetails from 'components/users/UpdatingUserDetails.vue';

export default {
  name: 'TableRow',
  components: {
    UpdatingUserDetails,
  },
  data() {
    return {
      dialogVisible: false,
      selectedID: '',
    };
  },
  props: {
    user: {
      type: Object,
      required: true,
    },
  },
  methods: {
    deleteUser(id) {
      this.$q.dialog({
        title: 'Confirm User Deletion',
        message: 'Are you sure you want to delete this user account?',
        cancel: true,
        persistent: true,
      }).onOk(() => {
        axios.delete('/users/' + id)
          .then(() => {
            this.$q.notify({
              color: 'positive',
              message: 'User deleted successfully',
            });
            this.$emit('userDeleted', id);
          }).catch((error) => {
            this.$q.notify({
              color: 'negative',
              message: error.data.message, //Todo: verify
            });
          });
      });
    },

    updateUserDetails(id) {
      this.dialogVisible = true;
      this.selectedID = id;
    },

    onUpdatedSuccessFully() {
      this.onDialogueClose();
      this.$emit('UpdatedStatusSuccessFully');
    },

    onDialogueClose() {
      this.dialogVisible = false;
      this.selectedID = '';
    },
  },
};
</script>

<style scoped></style>

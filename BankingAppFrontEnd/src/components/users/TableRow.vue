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
    <q-btn color="primary" label="Accounts" @click="openCreatingAccountDetails(user.id)" class="q-ma-md"></q-btn>
  </td>
  <div v-if="dialogVisible">
    <UpdatingUserDetails :selectedID="selectedID" @closeDialogue="onDialogueClose"
      @updatedUserSuccessfully="onUpdatedSuccessFully" @userUpdated="$emit('userUpdated')" v-if="selectedID.length !== 0">
    </UpdatingUserDetails>
  </div>
  <div v-if="createAccountDialogue">
    <createAccount :selectedID="selectedID" @closeDialogue="onDialogueClose"
      @accountCreatedSuccessfully="onUpdatedSuccessFully" />
  </div>
  <div>

  </div>
</template>

<script>
import axios from '/axios-basis.js';
import UpdatingUserDetails from 'components/users/UpdatingUserDetails.vue';
import createAccount from 'components/users/CreateAccount.vue';
import CreateAccount from 'components/users/CreateAccount.vue';

export default {
  name: 'TableRow',
  computed: {
    createAccount() {
      return createAccount;
    },
  },
  components: {
    CreateAccount,
    UpdatingUserDetails,
  },
  data() {
    return {
      dialogVisible: false,
      selectedID: '',
      createAccountDialogue: false,
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
        axios.delete('/users/' + id).then(() => {
          this.$q.notify({
            color: 'positive',
            message: 'User deleted successfully',
          });
          this.$emit('userDeleted', id);
        }).catch((error) => {
          this.$q.notify({
            color: 'negative',
            message: 'User has active bank accounts and cannot be deleted.',
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
      this.createAccountDialogue = false;
      this.selectedID = '';
    },
    openCreatingAccountDetails(id) {
      this.createAccountDialogue = true;
      this.selectedID = id;
    },

  },
};
</script>

<style scoped></style>

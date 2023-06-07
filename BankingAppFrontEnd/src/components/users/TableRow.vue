<template>
    <td class="text-left">{{ user.id }}</td>
    <td class="text-right">{{ user.firstName }}</td>
    <td class="text-right">{{ user.lastName }}</td>
    <td class="text-right">{{ user.isActive ? 'Yes' : 'No' }}</td>
    <td class="text-right">€ {{ user.transactionLimit.toFixed(2) }}</td>
    <td class="text-right">€ {{ user.dayLimit.toFixed(2) }}</td>
    <td class="text-right">{{ user.dateOfBirth }}</td>
    <td class="text-right">{{ user.phoneNumber }}</td>
    <td class="text-right">{{ user.email }}</td>
    <td class="text-center">
      <q-btn
        :color="user.isActive ? 'negative' : 'positive'"
        :label="user.isActive ? 'Delete' : 'Activate'"
        @click="updateStatus(user.isActive, user.id)"
        class="q-ma-md"
      ></q-btn>
  
      <q-btn
        color="primary"
        label="Edit"
        @click="updateUserDetails(user.id)"
        class="q-ma-md"
      ></q-btn>
  
    </td>
    <div v-if="dialogVisible">
      <UpdatingUserDetails :selectedID="selectedID"
                              @closeDialogue="onDialogueClose"
                              @updatedUserSuccessfully="onUpdatedSuccessFully"
                              v-if="selectedID.length !==0">
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
      updateStatus(isActive, id) {
        this.$q.dialog({
          title: 'User ' + (isActive ? 'Deactivation' : 'Activation'),
          message: 'Are you sure you want to ' + (isActive ? 'delete' : 'activate') + ' this account ?',
          cancel: true,
          persistent: true,
        }).onOk(() => {
          this.sendUpdateRequest(isActive, iban);
        });
      },
      updateUserDetails(id) {
        this.dialogVisible = true;
        this.selectedID = id;
      },
      sendUpdateRequest(isActive, id) {
        axios.post('/users/userStatus/' + id, {
          isActive: !isActive,
        }).then(() => {
          this.$q.notify({
            color: isActive ? 'negative' : 'positive',
            message: 'User status ' + (isActive ? 'deactivated' : 'activated') + ' successfully',
          });
          this.$emit('UpdatedStatusSuccessFully');
        }).catch((error) => {
          this.$q.notify({
            color: 'negative',
            message: error.data.message, //Todo: verify
          });
        });
      },
      onUpdatedSuccessFully(){
        this.onDialogueClose();
        this.$emit('UpdatedStatusSuccessFully');
      },
      onDialogueClose() {
        this.dialogVisible = false;
        this.selectedIban = '';
      },
    },
  };
  </script>
  
  <style scoped>
  
  </style>
  
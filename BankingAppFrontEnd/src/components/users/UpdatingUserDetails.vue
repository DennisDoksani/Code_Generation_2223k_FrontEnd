<template>
  <div>
    <q-dialog v-model="isVisible" no-backdrop-dismiss>
      <q-card class="q-pa-md">
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">Updating User Details</div>
          <q-space />
          <q-btn icon="close" flat round dense @click="dialogCloseClicked" />
        </q-card-section>
        <q-separator />
        <q-form @submit="updateUserClicked">
          <q-card-section>
            <div class="q-gutter-md q-pa-md" style="max-width: 900px">
              <div class="row q-col-gutter-md q-mb-md ">
                <div class="col-6">
                  <q-input outlined v-model="selectedUser.id" readonly label="ID" size="big" />
                </div>
                <div class="col-6">
                  <q-input outlined v-model="selectedUser.isActive" label="Account Status" />
                </div>
              </div>
              <div class="row q-col-gutter-md q-mb-md">
                <div class="col-6">
                  <q-input outlined v-model="selectedUser.userHolder.userId" label="User ID" lazy-rules
                    :rules="[val => !!val || 'User ID cannot be empty']" />
                </div>
                <div class="col-6">
                  <q-input outlined v-model="selectedUser.userHolder.firstName" label="First Name" lazy-rules
                    :rules="[val => !!val || 'First name cannot be empty']" />
                </div>
                <div class="col-6">
                  <q-input outlined v-model="selectedUser.userHolder.lastName" label="Last Name" lazy-rules
                    :rules="[val => !!val || 'Last name cannot be empty']" />
                </div>
              </div>
              <div class="row q-col-gutter-md q-mb-md">
                <div class="col-6">
                  <q-input outlined v-model.number="selectedUser.userHolder.dayLimit" type="number" label="Day Limit"
                    lazy-rules :rules="[val => val >= 0 || 'Day limit cannot be Negative',
                    val => val !== '' || 'Day limit cannot be empty']" />
                </div>
                <div class="col-6">
                  <q-input outlined v-model.number="selectedUser.userHolder.transactionLimit" type="number"
                    label="Transaction Limit" lazy-rules :rules="[val => val >= 0 || 'Transaction limit cannot be Negative'
                      , val => !!val || 'Transaction limit cannot be empty']" />
                </div>
              </div>
              <div class="row q-col-gutter-md q-mb-md">
                <div class="col-6">
                  <q-toggle outlined v-model="selectedUser.id" label="ID" />
                </div>
              </div>
              <div class="row q-col-gutter-md q-mb-md">
                <div class="col-6">
                  <q-input outlined v-model="selectedUser.dateOfBirth" readonly label="Date of Birth" />
                </div>
              </div>
              <div class="row q-col-gutter-md q-mb-md">
                <div class="col-6">
                  <q-input outlined v-model="selectedUser.email" readonly label="Email Address" />
                </div>
              </div>
              <div class="row q-col-gutter-md q-mb-md">
                <div class="col-6">
                  <q-input outlined v-model="selectedUser.phoneNumber" readonly label="Phone Number" />
                </div>
              </div>
            </div>
          </q-card-section>
          <q-card-actions align="right">
            <q-btn color="primary" label="Cancel" @click="cancelUpdating" />
            <q-btn color="primary" type="submit">
              <q-spinner v-if="showProgressBar" size="20px" color="white" />
              <div v-else>
                Update
              </div>
            </q-btn>
          </q-card-actions>
        </q-form>
      </q-card>
    </q-dialog>
  </div>
</template>
  
<script>
import axios from '/axios-basis.js';

export default {
  name: 'UpdatingUserDetails',
  components: {},
  data() {
    return {
      isVisible: true,
      showProgressBar: false,
      selectedUser: {
        id: '',
        isActive: false,
        userHolder: {
          userId: '',
          firstName: '',
          lastName: '',
          dayLimit: 0,
          transactionLimit: 0,
        },
      },
    };
  },
  props: {
    selectedID: {
      required: true,
    },
  },
  methods: {
    dialogCloseClicked() {
      this.$emit('closeDialogue');
    },
    fetchSelectedUser() {
      axios.get('/users/' + this.selectedID).then(response => {
        // Ensure that both the user and userHolder objects are defined before assigning values
        if (response.data && response.data.userHolder) {
          this.selectedUser = {
            id: response.data.id || '',
            isActive: response.data.isActive || false,
            userHolder: {
              userId: response.data.userHolder.userId || '',
              firstName: response.data.userHolder.firstName || '',
              lastName: response.data.userHolder.lastName || '',
              dayLimit: response.data.userHolder.dayLimit || 0,
              transactionLimit: response.data.userHolder.transactionLimit || 0,
            },
          };
        } else {
          console.error('Invalid user data received', response.data);
        }
      }).catch(error => {
        console.log(error);
      });
    },
    updateUserClicked() {
      this.showProgressBar = true;
      setTimeout(() => {
        this.sendPutRequest();
      }, 2000);
    },
    sendPutRequest() {
      axios.put('/users/' + this.selectedID, this.selectedUser)
        .then(() => {
          this.$q.notify({
            color: 'positive',
            message: 'User updated successfully',
            icon: 'check',
          });
          this.selectedUser = null;
          this.$emit('updatedUserSuccessfully');
        }).catch(error => {
          // Handle your errors here
        });
      this.showProgressBar = false;
    },
    cancelUpdating() {
      this.selectedUser = null;
      this.$emit('closeDialogue');
    },
  },
  mounted() {
    this.fetchSelectedUser();
  },
};
</script>
  
<style scoped>
.q-input {
  width: 200px;
  /* Adjust the desired height */

}
</style>
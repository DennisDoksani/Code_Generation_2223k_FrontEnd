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
                  <q-input outlined v-model="selectedUser.userHolder.userId" readonly label="ID" size="big" />
                </div>
                <div class="col-6">
                  <q-input outlined v-model="selectedUser.userHolder.firstName" label="First Name" lazy-rules
                    :rules="[val => !!val || 'First name cannot be empty']" />
                </div>
              </div>
              <div class="row q-col-gutter-md q-mb-md">
                <div class="col-6">
                  <q-input outlined v-model="selectedUser.userHolder.userId" label="User ID" lazy-rules
                    :rules="[val => !!val || 'User ID cannot be empty']" />
                </div>
                <div class="col-6">
                  <q-input outlined v-model="selectedUser.userHolder.lastName" label="Last Name" lazy-rules
                    :rules="[val => !!val || 'Last name cannot be empty']" />
                </div>
                <div class="col-6">
                  <q-input outlined v-model="selectedUser.userHolder.bsn" label="BSN" lazy-rules
                    :rules="[val => !!val || 'BSN cannot be empty']" />
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
                  <q-toggle outlined v-model="selectedUser.isActive" label="Account Status" />
                </div>
              </div>
              <div class="row q-col-gutter-md q-mb-md">
                <div class="col-6">
                  <q-input outlined v-model="selectedUser.userHolder.dateOfBirth" lazy-rules label="Date of Birth" />
                </div>
              </div>
              <div class="row q-col-gutter-md q-mb-md">
                <div class="col-6">
                  <q-input outlined v-model="selectedUser.userHolder.email" lazy-rules label="Email Address"
                    :rules="emailRules" />
                </div>
              </div>
              <div class="row q-col-gutter-md q-mb-md">
                <div class="col-6">
                  <q-input outlined v-model="selectedUser.userHolder.phoneNumber" lazy-rules label="Phone Number"
                    :rules="phoneRules" />
                </div>
              </div>
            </div>
          </q-card-section>
          <q-card-actions align="right">
            <q-btn color="primary" label="Cancel" @click="cancelUpdating" />
            <q-btn :disable="!isValid" color="primary" type="submit">
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
      isValid: true,
      emailRules: [val => !!val || 'Field is required', val => /.+@.+\..+/.test(val) || 'Invalid email'],
      phoneRules: [val => !!val || 'Field is required', val => /^(?:\+\d{1,3}[- ]?)?\d{10}$/.test(val) || 'Invalid phone number'],
      selectedUser: {
        userHolder: {
          userId: '',
          firstName: '',
          lastName: '',
          bsn: '',
          dayLimit: 0,
          transactionLimit: 0,
          dateOfBirth: '',
          email: '',
          phoneNumber: '',
        },
        isActive: false,
      },
    };
  },
  watch: {
    'selectedUser.userHolder.email': function() {
      this.checkFormValidity();
    },
    'selectedUser.userHolder.phoneNumber': function() {
      this.checkFormValidity();
    }
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
      axios.get('/users/' + this.selectedID)
        .then(response => {
          if (response.data) {
            this.selectedUser.userHolder = {
              userId: response.data.id || '',
              firstName: response.data.firstName || '',
              lastName: response.data.lastName || '',
              bsn: response.data.bsn || '',
              dayLimit: response.data.dayLimit || 0,
              transactionLimit: response.data.transactionLimit || 0,
              dateOfBirth: response.data.dateOfBirth || '',
              email: response.data.email || '',
              phoneNumber: response.data.phoneNumber || '',
            };
            this.selectedUser.isActive = response.data.isActive || false;
          } else {
            console.error('Invalid user data received', response.data);
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    updateUserClicked() {
      this.showProgressBar = true;
      setTimeout(() => {
        // Instead of sending the entire 'selectedUser' object, we'll create a new object that matches the structure of the UserDTO class
        const userUpdate = {
          id: this.selectedUser.userHolder.userId,
          firstName: this.selectedUser.userHolder.firstName,
          lastName: this.selectedUser.userHolder.lastName,
          bsn: this.selectedUser.userHolder.bsn,
          dayLimit: this.selectedUser.userHolder.dayLimit,
          transactionLimit: this.selectedUser.userHolder.transactionLimit,
          dateOfBirth: this.selectedUser.userHolder.dateOfBirth,
          isActive: this.selectedUser.isActive,
          email: this.selectedUser.userHolder.email,
          phoneNumber: this.selectedUser.userHolder.phoneNumber,
        };
        axios.put('/users/' + this.selectedID, userUpdate)
          .then(response => {
            if (response.status === 200) {
              this.$q.notify({
                type: 'positive',
                message: 'User Updated Successfully',
              });
              this.dialogCloseClicked();
            } else {
              console.error('Failed to update user', response);
              this.$q.notify({
                type: 'negative',
                message: 'Failed to update user',
              });
            }
            this.showProgressBar = false;
          })
          .catch(error => {
            console.error('Failed to update user', error);
            this.$q.notify({
              type: 'negative',
              message: 'Failed to update user',
            });
            this.showProgressBar = false;
          });
      }, 1000);
    },
    checkFormValidity() {
      // Check if email and phone number follow the rules
      this.isValid = this.emailRules[0](this.selectedUser.userHolder.email) === true &&
        this.emailRules[1](this.selectedUser.userHolder.email) === true &&
        this.phoneRules[0](this.selectedUser.userHolder.phoneNumber) === true &&
        this.phoneRules[1](this.selectedUser.userHolder.phoneNumber) === true;
    },
    cancelUpdating() {
      this.dialogCloseClicked();
    },
  },
  created() {
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

//Pinia store for user session
import {defineStore} from 'pinia';
//Axios for API calls
import axios from '../../axios-basis';

export const useUserSessionStore = defineStore('userSession', {
  state: () => ({
    jwt: '',
    id: 0,
    email: '',
    name: '',
  }),
  persist: true,
  getters: {
    isLoggedIn: (state) => state.jwt !== '',
    getUserFullName: (state) => state.name,
    getId: (state) => state.id,
    getEmail: (state) => state.email,
  },
  actions: {
    login(email, password) {
      console.log('Logging in...');
      return new Promise((resolve, reject) => {
        axios.post('auth/login', {
          email: email,
          password: password,
        })
        .then(response => {
          this.jwt = response.data.jwt;
          this.id = response.data.id;
          this.email = response.data.email;
          this.name = response.data.name;

          sessionStorage['jwt'] = this.jwt;
          sessionStorage['id'] = this.id;
          sessionStorage['email'] = this.email;
          sessionStorage['name'] = this.name;

          axios.defaults.headers.common['Authorization'] = 'Bearer ' +
            this.jwt;

          console.log(response);
          resolve();
        })
        .catch(error => {
          reject(error);
        });
      });
    },
    localLogin() {
      if (sessionStorage['jwt'] !== undefined) {
        this.jwt = sessionStorage['jwt'];
        this.id = sessionStorage['id'];
        this.firstName = sessionStorage['firstName'];
        this.lastName = sessionStorage['lastName'];

        axios.defaults.headers.common['Authorization'] = 'Bearer ' +
          sessionStorage['jwt'];
        console.log('Logged in automatically');
      }
    },
    logout() {
      this.jwt = '';
      this.id = 0;
      sessionStorage.removeItem('jwt');
      axios.defaults.headers.common['Authorization'] = '';
    },
  },
});

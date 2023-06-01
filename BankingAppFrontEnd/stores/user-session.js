//This pinia store is used to store the user session state

import { defineStore } from 'pinia';
import axios from '../axios-manageliving';

export const useUserSessionStore = defineStore('usersession', {
    state: () => ({
        jwt: '',
        id: 0,
        email: '',
        firstName: '',
        lastName: '',
        userType: '',
    }),
    getters: {
        isLoggedIn: (state) => state.jwt !== '' ,
        getUserFullName: (state) => state.firstName + ' ' + state.lastName,
        getId: (state) => state.id,
        
        
        //Had a dynamic way to get userType, but it wouldn't work for some reason, so I have to store it in the state to make the navigation able to filter the tabs. Uncomment block to see that it works (displayed in console)
        
        /*getUserType(){
            var usertype = "visitor";
            if(this.getId != 0){
                axios.get('users/usertype/' +  this.getId)
                .then((response) => {
                usertype = response.data;
                console.log(response);
                console.log("Usertype fetched with getter: " + usertype);
                return "Admin";
                })
                .catch(error => {
                console.log(error);
                return usertype;
                });
            }    
            
            return usertype;
        }
        */
        getStoredUserType: (state) => state.userType,
    },
    actions: {
        login(email, password) {
            return new Promise((resolve, reject) => {
                axios.post('users/login', {
                    email: email,
                    password: password
                })
                .then(response => {
                    this.jwt = response.data.jwt;
                    this.id = response.data.id;
                    this.firstName = response.data.firstName;
                    this.lastName = response.data.lastName;
                    this.userType = response.data.userType;

                    sessionStorage["jwt"] = this.jwt;
                    sessionStorage["id"] = this.id;
                    sessionStorage["firstName"] = this.firstName;
                    sessionStorage["lastName"] = this.lastName;
                    sessionStorage["userType"] = this.userType;

                    axios.defaults.headers.common['Authorization'] = this.jwt;
                    console.log(response);
                    resolve();
                })
                .catch(error => {
                    console.log(error);
                    reject(error.response.data.errorMessage);
                });
            });  
        },
        localLogin() {
            if (sessionStorage["jwt"] !== undefined) {
                this.jwt = sessionStorage["jwt"];
                this.id = sessionStorage["id"];
                this.firstName = sessionStorage["firstName"];
                this.lastName = sessionStorage["lastName"];

                axios.defaults.headers.common['Authorization'] = this.jwt;
                console.log("Logged in automatically");
            }
        },
        logout(){
            this.jwt = '';
            this.id = 0;
            this.email = '';
            this.firstName = '';
            this.lastName = '';
            sessionStorage.removeItem("jwt");
            axios.defaults.headers.common['Authorization'] = '';
        }
    }
});
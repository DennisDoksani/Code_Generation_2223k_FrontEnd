<<<<<<< Updated upstream
import BankingAppLayout from 'layouts/BankingAppLayout.vue'
import IndexPage from 'pages/IndexPage.vue'
import AccountsOverviewPage from 'pages/AccountsOverviewPage.vue'
import RegistrationPage from 'pages/RegistrationPage.vue'
import LoggedUserPage from 'pages/LoggedUserPage.vue'

const routes = [
  {
    path: '/',
    component: () => BankingAppLayout,
    children: [
      { path: '', component: () => IndexPage },
      { path: '/accounts',component: () => AccountsOverviewPage },
      { path: '/register',component: () => RegistrationPage },
      { path: '/overview',component: () => LoggedUserPage },
      { path: '/newaccount',component: () => import('components/accounts/CreateAccount.vue') },
      { path: '/users', component: () => import('pages/UsersOverviewPage.vue')},
    ]
  },

  // Always leave this last one for 404
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
=======
const routes = [{
        path: '/',
        component: () =>
            import ('layouts/BankingAppLayout.vue'),
        children: [{
                path: '',
                component: () =>
                    import ('pages/IndexPage.vue')
            },
            {
                path: '/accounts',
                component: () =>
                    import ('pages/AccountsOverviewPage.vue')
            },
            {
                path: '/overview',
                component: () =>
                    import ('pages/LoggedUserPage.vue')
            },
            {
                path: '/transfer/:iban',
                component: () =>
                    import ('pages/TransferPage.vue'),
            },
        ]
    },

    // Always leave this as last one for 404
    {
        path: '/:catchAll(.*)*',
        component: () =>
            import ('pages/ErrorNotFound.vue')
    }
>>>>>>> Stashed changes
]

export default routes